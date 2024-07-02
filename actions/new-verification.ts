"use server"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerificaition = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
        return { error: "Token does not exit!" };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Tocken has expired !" };
    }
    const exitingUser = await getUserByEmail(existingToken.email);
    if (!exitingUser) {
        return { error: "User dose not exist!" };
    }

    await db.user.update({
        where: { id: exitingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    await db.verificationToken.delete({
        where: { id: existingToken.id },

    });
    return { success: "Email verified" };
}