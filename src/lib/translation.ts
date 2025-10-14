/* eslint-disable @typescript-eslint/no-explicit-any */
// Lightweight translation provider wrapper used by API routes.
// Supports two providers via environment variables:
// - Google Translate (default) using GOOGLE_API_KEY and the REST v2 endpoints
// - Deepseek using DEEPSEEK_URL and DEEPSEEK_API_KEY
// Assumptions: Deepseek exposes /detect and /translate JSON endpoints that accept
// { text } and { text, target, source? } respectively and return { language, confidence } / { translatedText }.

const DEFAULT_TIMEOUT = 8000;

function timeoutFetch(url: string, init?: RequestInit, ms = DEFAULT_TIMEOUT) {
  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    fetch(url, init)
      .then(res => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch(err => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export type DetectResult = { language: string; confidence?: number } | null;
export type TranslateResult = { translatedText: string; detectedSource?: string | null; partOfSpeech?: string | null } | null;

const provider = (process.env.TRANSLATION_PROVIDER || 'google').toLowerCase();

async function detectWithGoogle(text: string, context?: string): Promise<DetectResult> {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new Error('Missing GOOGLE_API_KEY');

  const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${encodeURIComponent(key)}`;
  // include context as an additional q if provided
  const q = context ? [context, text] : text;
  const body = JSON.stringify({ q });
  const res = await timeoutFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  if (!res.ok) throw new Error(`Google detect failed: ${res.status}`);
  const json = await res.json();
  // expected shape: { data: { detections: [[{language, confidence}, ...]] } }
  try {
    const parsed = json as unknown;
    if (typeof parsed === 'object' && parsed !== null) {
      const data = (parsed as Record<string, unknown>)['data'];
      if (typeof data === 'object' && data !== null) {
        const detections = (data as Record<string, unknown>)['detections'];
        if (Array.isArray(detections) && Array.isArray(detections[0]) && detections[0][0]) {
          const det = detections[0][0] as Record<string, unknown>;
          const language = det['language'];
          const confidence = det['confidence'];
          if (typeof language === 'string') {
            return { language, confidence: typeof confidence === 'number' ? confidence : undefined };
          }
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

async function translateWithGoogle(text: string, target: string, source?: string, context?: string): Promise<TranslateResult> {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new Error('Missing GOOGLE_API_KEY');

  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}`;
  // Google accepts multiple `q` values; include context as an additional prompt if provided
  const payload: Record<string, unknown> = { q: [text], target, format: 'text' };
  if (context) (payload.q as string[]).unshift(context);
  if (source) payload.source = source;

  const res = await timeoutFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(`Google translate failed: ${res.status}`);
  const json: unknown = await res.json();
  // expected shape: { data: { translations: [{ translatedText, detectedSourceLanguage? }] } }
  try {
    const parsed = json as unknown;
    if (typeof parsed === 'object' && parsed !== null) {
      const data = (parsed as Record<string, unknown>)['data'];
      if (typeof data === 'object' && data !== null) {
        const translations = (data as Record<string, unknown>)['translations'];
        if (Array.isArray(translations) && translations[0] && typeof translations[0] === 'object') {
          const tr = translations[0] as Record<string, unknown>;
          const translatedText = tr['translatedText'];
          const detectedSourceLanguage = tr['detectedSourceLanguage'];
          if (typeof translatedText === 'string') {
            return { translatedText, detectedSource: typeof detectedSourceLanguage === 'string' ? detectedSourceLanguage : null, partOfSpeech: null };
          }
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

async function detectWithDeepseek(text: string, context?: string): Promise<DetectResult> {
  const base = process.env.DEEPSEEK_URL;
  const key = process.env.DEEPSEEK_API_KEY;
  if (!base) throw new Error('Missing DEEPSEEK_URL');
  const url = `${base.replace(/\/$/, '')}/completions`;
  // Build chat-style payload expected by the Deepseek chat model
  const userContent = context
    ? `Detect the language of the following text (use context to help): Context: ${context}\nText:\n${text}`
    : `Detect the language of the following text and respond only with JSON. use ISO 639-1 language code (2 characters):\n${text}`;

  const payload: Record<string, unknown> = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: 'You are a helpful assistant. When asked to detect language, respond ONLY with a JSON object with keys "language" and "confidence" (a number between 0 and 1). Do not include any other text.' },
      { role: 'user', content: userContent }
    ],
    stream: false
  };

  const res = await timeoutFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(key ? { Authorization: `Bearer ${key}` } : {}) }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(`Deepseek detect failed: ${res.status}`);
  const json: unknown = await res.json();
  // expected: model returns a textual content containing the JSON object.
  try {
    const content = (json as any)?.choices?.[0]?.message?.content || (json as any)?.choices?.[0]?.text || (json as any)?.output || (json as any)?.data?.[0]?.text;
    if (typeof content === 'string') {
      const cleaned = content.trim().replace(/^```[a-z]*\n?|\n?```$/gi, '').trim();
      // attempt to locate JSON substring
      let parsedObj: unknown = null;
      try {
        parsedObj = JSON.parse(cleaned);
      } catch {
        // try to extract first {...} block
        const m = cleaned.match(/\{[\s\S]*\}/);
        if (m) {
          try { parsedObj = JSON.parse(m[0]); } catch { parsedObj = null; }
        }
      }

      if (parsedObj && typeof parsedObj === 'object') {
        const obj = parsedObj as Record<string, unknown>;
        const language = obj['language'];
        const confidence = obj['confidence'];
        if (typeof language === 'string') {
          return { language, confidence: typeof confidence === 'number' ? confidence : undefined };
        }
      }
    }
  } catch {
    // fall through to null
  }
  return null;
}

async function translateWithDeepseek(text: string, target: string, source?: string, context?: string): Promise<TranslateResult> {
  const base = process.env.DEEPSEEK_URL;
  const key = process.env.DEEPSEEK_API_KEY;
  if (!base) throw new Error('Missing DEEPSEEK_URL');

  const url = `${base.replace(/\/$/, '')}/completions`;
  // Build a chat-style payload instructing the model to output only JSON
//   const systemMsg = `You are a wise translator. When asked to translate text, respond ONLY with a JSON object that contains at least the key \"translatedText\". If you can detect the source language, include \"detectedSource\" (ISO code).  If it is idiom, phrase, maintain the original meaning and context. Do not include any additional commentary.`;
//   const systemMsg = `
//     You are a professional translator specializing in idioms and contextual translation. When asked to translate text, follow these rules:
//     1. ALWAYS analyze if the text contains idioms, phrases, or cultural expressions
//     2. For idioms/phrases: translate the MEANING, not literal words
//     3. For contextual text: consider the full context provided
//     4. Maintain natural flow in the target language
//     5. Respond ONLY with a JSON object containing:
//     - "translatedText": the accurate translation
//     - "detectedSource": ISO language code (if detectable)
//     Do not include any additional commentary or explanations outside the JSON.
//   `
//   const systemMsg = `You are a professional translator specializing in idioms and contextual translation. For idioms: translate the MEANING, not literal words. Output ONLY JSON: {"translatedText": "translation", "detectedSource": "iso_code"}`
  const systemMsg = `You are a professional translator. For idioms: translate the MEANING, not literal words. Output ONLY JSON: {"translatedText": "translation", "detectedSource": "iso_code", partOfSpeech: "verb or noun or adjective or ... select one base on the context"}`
  const userMsgBase = source
    ? `Translate the following text from language ${source} into ${target}:`
    : `Translate the following text into ${target}. If you can detect the source language, include it as \"detectedSource\":`;
  const userMsg = context ? `${userMsgBase} Context: ${context}\nText: ${text}` : `${userMsgBase} ${text}`;

  const payload: Record<string, unknown> = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: systemMsg },
      { role: 'user', content: userMsg }
    ],
    stream: false
  };

  const res = await timeoutFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(key ? { Authorization: `Bearer ${key}` } : {}) }, body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(`Deepseek translate failed: ${res.status}`);
  const json: unknown = await res.json();
  try {
    const content = (json as any)?.choices?.[0]?.message?.content || (json as any)?.choices?.[0]?.text || (json as any)?.output || (json as any)?.data?.[0]?.text;
    if (typeof content === 'string') {
      const cleaned = content.trim().replace(/^```[a-z]*\n?|\n?```$/gi, '').trim();
      let parsedObj: unknown = null;
      try {
        parsedObj = JSON.parse(cleaned);
      } catch {
        const m = cleaned.match(/\{[\s\S]*\}/);
        if (m) {
          try { parsedObj = JSON.parse(m[0]); } catch { parsedObj = null; }
        }
      }

      if (parsedObj && typeof parsedObj === 'object') {
        const obj = parsedObj as Record<string, unknown>;
        const translatedText = obj['translatedText'];
        const detectedSource = obj['detectedSource'];
                if (typeof translatedText === 'string') {
                  const partOfSpeech = obj['partOfSpeech'];
                  return {
                    translatedText,
                    detectedSource: typeof detectedSource === 'string' ? detectedSource : null,
                    partOfSpeech: typeof partOfSpeech === 'string' ? partOfSpeech : null,
                  };
                }
      }
    }
  } catch {
    // fall through
  }
  return null;
}

export async function detectLanguage(text: string, context?: string): Promise<DetectResult> {
  if (!text) return null;
  try {
    if (provider === 'deepseek') return await detectWithDeepseek(text, context);
    return await detectWithGoogle(text, context);
  } catch (err) {
    console.warn('detectLanguage error', err);
    return null;
  }
}

export async function translateText(text: string, target: string, source?: string, context?: string): Promise<TranslateResult> {
  if (!text) return null;
  try {
    if (provider === 'deepseek') return await translateWithDeepseek(text, target, source, context);
    return await translateWithGoogle(text, target, source, context);
  } catch (err) {
    console.warn('translateText error', err);
    return null;
  }
}

const api = { detectLanguage, translateText };
export default api;
