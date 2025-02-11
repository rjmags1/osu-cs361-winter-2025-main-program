import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { _User } from "@/app/lib/definitions";

async function getUser(username: string): Promise<_User | undefined> {
    const user = { username: "Test user", password: "testpassword" };
    return user;
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
                    //const passwordsMatch = await bcrypt.compare(
                    //password,
                    //user.password
                    //);
                    const passwordsMatch = user.password === password;
                    console.log(
                        `\n\n\n\n${password}\n${user.password}\n${passwordsMatch}\n\n\n`
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
});
