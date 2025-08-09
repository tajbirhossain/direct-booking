import { NextResponse } from 'next/server';
import nextI18nextConfig from '../next-i18next.config';

const { locales, defaultLocale } = nextI18nextConfig.i18n;

export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    if (pathname === '/') {
        return NextResponse.redirect(
            new URL(`/${defaultLocale}`, request.url),
            307
        );
    }

    const pathLocale = pathname.split('/')[1];
    if (!locales.includes(pathLocale)) {
        return NextResponse.redirect(
            new URL(`/${defaultLocale}${pathname}`, request.url),
            307
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
