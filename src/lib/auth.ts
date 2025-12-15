import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    console.log("Authorize called with:", credentials?.email);

                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    // 1. Fetch User
                    const user = await db.user.findUnique({
                        where: { email: credentials.email }
                    });

                    console.log("User found:", user ? "YES" : "NO");

                    if (!user || !user.password) {
                        return null;
                    }

                    // 2. Verify Password
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    console.log("Password valid:", isValid);

                    if (!isValid) {
                        return null;
                    }

                    // 3. Return User (filtered safe object)
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Authorize Error:", error);
                    throw error;
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
        error: "/login" // redirect error back to login for now
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as unknown as { role: string }).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as { role?: string }).role = token.role as string;
            }
            return session;
        }
    },
    secret: "super-secret-dev-key-12345",
    session: {
        strategy: "jwt",
    }
};
