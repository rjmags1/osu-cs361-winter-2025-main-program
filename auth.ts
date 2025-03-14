import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { _User } from "@/app/lib/definitions";
import ConnectionPool from "./db";

async function getUser(email: string): Promise<_User | undefined> {
    try {
        const result = await ConnectionPool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        return !!result?.rows?.length ? result.rows[0] : undefined;
    } catch (error) {
        console.error(error);
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(8),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    if (password === user.password) {
                        return user;
                    }
                }

                return null;
            },
        }),
    ],
});
