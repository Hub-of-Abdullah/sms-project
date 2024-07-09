import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUseId } from "@/data/two-factor-confirmation";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            if (user.id) {
                await db.user.update({
                    where: { id: user.id },
                    data: { emailVerified: new Date() }
                });
            }
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;

            if (!user.id) return false;

            const existingUser = await getUserById(user.id);

            if (!existingUser?.emailVerified) return false;
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUseId(existingUser.id);
                if (!twoFactorConfirmation) {
                    return false;
                }
                //Delete two factor confirmation for next sign in

                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true;
        },

        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const userId = token.sub as string;
            const existingUser = await getUserById(userId);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});




// import NextAuth from "next-auth"
// import { UserRole } from "@prisma/client";
// import { PrismaAdapter } from "@auth/prisma-adapter"

// import { db } from "@/lib/db";
// import authConfig from "@/auth.config";
// import { getUserById } from "@/data/user";

// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut,
// } = NextAuth({
//     pages: {
//         signIn: "/auth/login",
//         error: "/auth/error",
//     },
//     events: {
//         async linkAccount({ user }) {
//             await db.user.update({
//                 where: { id: user.id },
//                 data: { emailVerified: new Date() }
//             })
//         }
//     },
//     callbacks: {

//         // async signIn({ user }) {
//         //     const existingUser = await getUserById(user.id as string);
//         //     if (!existingUser || !existingUser.emailVerified) {
//         //         return false;
//         //     }

//         //     return true;
//         // },

//         async signIn({ user, account }) {
//             if (account?.provider != "credentials") return true;

//             const existingUser = await getUserById(user.id);

//             // Prevent sign in without verificaion.
//             if (!existingUser?.emailVerified) return false;

//             // TODO add 2FA Check

//             return true;
//         },

//         async session({ token, session }) {
//             // console.log({ sessionToken: token, });
//             if (token.sub && session.user) {
//                 session.user.id = token.sub;
//             }
//             if (token.role && session.user) {
//                 session.user.role = token.role as UserRole;
//             }
//             return session
//         },

//         async jwt({ token }) {
//             if (!token.sub) return token;
//             const existingUser = await getUserById(token.sub);
//             // console.log({ existingUser: existingUser });
//             if (!existingUser) return token;
//             token.role = existingUser.role;

//             return token;
//         }
//     },
//     adapter: PrismaAdapter(db),
//     session: { strategy: "jwt" },
//     ...authConfig,
// });



