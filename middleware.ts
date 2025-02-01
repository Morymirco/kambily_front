import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // Vérifier si on vient de la page register
    const referer = request.headers.get('referer');
    const isFromRegister = referer?.includes('/register');

    // Si on essaie d'accéder à /register/confirmation
    if (request.nextUrl.pathname === '/register/confirmation') {
        // Si on ne vient pas de la page register, rediriger vers /register
        if (!isFromRegister) {
            return NextResponse.redirect(new URL('/register', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/register/confirmation'
} 