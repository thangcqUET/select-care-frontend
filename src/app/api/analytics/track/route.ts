import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// GA4 Measurement Protocol endpoint
const GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

// Environment-based GA4 configuration
// Store API secrets securely in environment variables
const GA4_CONFIG = {
  development: {
    measurementId: process.env.GA4_DEV_MEASUREMENT_ID || '',
    apiSecret: process.env.GA4_DEV_API_SECRET || '',
  },
  production: {
    measurementId: process.env.GA4_PROD_MEASUREMENT_ID || '',
    apiSecret: process.env.GA4_PROD_API_SECRET || '',
  },
};

/**
 * Verify JWT token from extension
 */
function verifyToken(token: string): { email: string; type: string } | null {
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET!) as any;
    if (decoded.type !== 'extension') {
      return null;
    }
    return { email: decoded.email, type: decoded.type };
  } catch (error) {
    console.error('[Analytics] Token verification failed:', error);
    return null;
  }
}

/**
 * Determine environment based on request origin or header
 */
function getEnvironment(request: NextRequest): 'development' | 'production' {
  const origin = request.headers.get('origin') || '';
  const isDev = origin.includes('localhost') || 
                origin.includes('127.0.0.1') ||
                request.headers.get('x-environment') === 'development';
  
  return isDev ? 'development' : 'production';
}

/**
 * POST /api/analytics/track
 * 
 * Secure server-side proxy for GA4 Measurement Protocol
 * This keeps API secrets safe on the server
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate the request
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // 2. Parse and validate the request
    const { event, params } = await request.json();
    
    if (!event || typeof event !== 'string') {
      return NextResponse.json(
        { error: 'Invalid event name' },
        { status: 400 }
      );
    }

    if (!params || typeof params !== 'object') {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    // 3. Get environment-specific GA4 configuration
    const environment = getEnvironment(request);
    const config = GA4_CONFIG[environment];

    if (!config.measurementId || !config.apiSecret) {
      console.error(`[Analytics] Missing GA4 configuration for ${environment}`);
      return NextResponse.json(
        { error: 'Analytics configuration error' },
        { status: 500 }
      );
    }

    // 4. Build GA4 Measurement Protocol payload
    const payload = {
      client_id: params.client_id,
      user_id: user.email, // Associate events with authenticated user
      timestamp_micros: params.timestamp_micros || Date.now() * 1000,
      events: [
        {
          name: event,
          params: {
            ...params,
            user_email: user.email, // Add authenticated user context
            environment: environment,
          },
        },
      ],
    };

    // 5. Forward to GA4 with API secret (kept secure on server)
    const ga4Response = await fetch(
      `${GA4_ENDPOINT}?measurement_id=${config.measurementId}&api_secret=${config.apiSecret}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!ga4Response.ok) {
      console.error('[Analytics] GA4 API error:', ga4Response.status, ga4Response.statusText);
      return NextResponse.json(
        { error: 'Failed to track event' },
        { status: 500 }
      );
    }

    // 6. Log for debugging (dev only)
    if (environment === 'development') {
      console.log('[Analytics] Tracked event:', {
        event,
        user: user.email,
        environment,
        params: Object.keys(params),
      });
    }

    return NextResponse.json({ 
      success: true,
      environment,
    });

  } catch (error) {
    console.error('[Analytics] Track API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
