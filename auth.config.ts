import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname === '/';
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect ke login
      } else if (isLoggedIn) {
        // Kalau sudah login, jangan kasih masuk halaman login/register lagi
        if (nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')) {
          return Response.redirect(new URL('/', nextUrl));
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;