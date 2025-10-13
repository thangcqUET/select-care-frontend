import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { auth } from '@/app/auth/supabase';

export async function POST(request: NextRequest) {
  try {
    const { state, userEmail } = await request.json();
    console.log('Extension auth request for user:', userEmail);
    // Verify the user is authenticated
    const user = await auth();
    if (!user || user.email !== userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate required fields
    if (!state || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate JWT token for the extension
    const token = jwt.sign(
      {
        email: userEmail,
        type: 'extension',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90), // 90 days
      },
      process.env.AUTH_SECRET!
    );

    console.log('Generated extension token for user:', userEmail);

    return NextResponse.json({ 
      token,
      userEmail,
      expiresIn: 60 * 60 * 24 * 90 // 90 days in seconds
    });
    
  } catch (error) {
    console.error('Extension auth API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
