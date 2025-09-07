import { NextRequest, NextResponse } from "next/server";

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      ...headers,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    
    if (email === 'test@effectivesoft.com' && password === 'password123') {
      return NextResponse.json({
        token: 'fake-jwt-token-12345',
        user: {
          id: 1,
          email,
          name: 'Test User',
        },
      }, {
        headers: {
          ...headers,
        },
      });
    }

    return NextResponse.json(
      {
        error: 'Invalid email or password',
      },
      { 
        status: 401,
        headers: {
          ...headers,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Invalid request body',
      },
      { 
        status: 400,
        headers: {
          ...headers,
        },
      }
    );
  }
}
