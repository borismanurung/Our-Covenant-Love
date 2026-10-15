import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, internal Next.js requests, public images, audio, and APIs
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/audio') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. Check if pathname already starts with a valid locale
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (firstSegment && isValidLocale(firstSegment)) {
    // If accessing admin routes (except login), check session cookie
    if (pathname.includes('/admin') && !pathname.includes('/admin/login')) {
      const sessionCookie = request.cookies.get('ocl_session');
      if (!sessionCookie?.value) {
        const loginUrl = new URL(`/${firstSegment}/admin/login`, request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    return NextResponse.next();
  }

  // 3. Otherwise redirect to default locale
  const targetLocale = defaultLocale;
  const newPathname = `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  return NextResponse.redirect(new URL(newPathname, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|audio).*)'],
};
