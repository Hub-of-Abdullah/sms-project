// import NextAuth, { type DefaultSession } from "next-auth";
// import { UserRole } from "@prisma/client";

// export type ExtendedUser = DefaultSession["user"] & {
//     role: UserRole;
// }


// declare module "next-auth" {
//     interface Session {
//         user: ExtendedUser;
//     }
// }

import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            role: string | undefined | null
        } & DefaultSession["user"]
    }
}