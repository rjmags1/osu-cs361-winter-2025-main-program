import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAtLogin = nextUrl.pathname.startsWith("/login");
            const isAtRegistration =
                nextUrl.pathname.startsWith("/registration");
            const isAtSetup = nextUrl.pathname.startsWith("/setup");
            if (
                (!isLoggedIn && isAtRegistration) ||
                (!isLoggedIn && isAtSetup)
            ) {
                return true;
            } else if (
                (isAtLogin && isLoggedIn) ||
                (isAtRegistration && isLoggedIn) ||
                (isAtSetup && isLoggedIn)
            ) {
                return Response.redirect(new URL("/", nextUrl));
            } else if (!isLoggedIn) {
                return false;
            }

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
