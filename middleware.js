import { NextResponse } from 'next/server';
import { auth } from './app/lib/auth';

export async function middleware(request) {
  // Vérifier si la route nécessite une authentification
  if (request.nextUrl.pathname.startsWith('/test/profile')) {
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/test/login', request.url));
    }

    try {
      // Vérifier si le token a besoin d'être rafraîchi
      if (auth.needsRefresh(accessToken)) {
        const response = await fetch('https://kambily.ddns.net/accounts/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken })
        });

        if (response.ok) {
          const data = await response.json();
          const response = NextResponse.next();
          
          response.cookies.set('access_token', data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 1 jour
          });

          return response;
        }
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/test/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/test/profile/:path*']
}; 