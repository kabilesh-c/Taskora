import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Temporary middleware to protect dashboard routes
// Since we're using localStorage for JWTs (as per requirements),
// we can't fully protect routes via SSR middleware without cookies.
// This is a minimal check for the demo scope. The rest will happen client-side.
export function middleware(request: NextRequest) {
  // If we had httpOnly cookies we would check here:
  // const token = request.cookies.get('token');
  
  // For localStorage, we mostly rely on client-side routing protection
  // but we set up the middleware file as requested.
  
  // We can pass through for now. Real protection happens in layout/page client components.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
