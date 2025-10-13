Extension translation API
=========================

This document describes the lightweight translation/detection endpoints used by the browser extension.

Endpoints
---------
- POST /api/extension/detect
  - Body: { text: string }
  - Response: { success: true, result: { language: string, confidence?: number } } on success
  - Errors: 400 for bad input, 401 for unauthenticated, 502 for provider failures

- POST /api/extension/translate
  - Body: { text: string, target: string, source?: string }
  - Response: { success: true, result: { translatedText: string, detectedSource?: string | null } }
  - If `source` is omitted the endpoint will attempt language detection first.

Providers and environment variables
----------------------------------
- Default provider: Google Translate REST API
  - Set TRANSLATION_PROVIDER=google (or leave unset)
  - GOOGLE_API_KEY required

- Deepseek provider: custom service
  - Set TRANSLATION_PROVIDER=deepseek
  - DEEPSEEK_URL (base URL, e.g. https://api.deepseek.example) required
  - DEEPSEEK_API_KEY optional (sent as Bearer token)

Notes
-----
- Both endpoints reuse the project's `auth()` helper to ensure the calling user is authenticated before proxying provider requests.
- The translation library uses timeouts and defensive parsing to avoid crashing the server when external providers return unexpected payloads.

Testing locally
---------------
1. Set the needed env vars in `.env.local` (example: GOOGLE_API_KEY=...)
2. Start the Next.js dev server: `pnpm dev` or `npm run dev`
3. Call the endpoint from the extension or with curl/postman as the authenticated user.
