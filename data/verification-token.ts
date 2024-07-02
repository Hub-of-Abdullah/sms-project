import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const vrificationToken = await db.verificationToken.findUnique({
            where: { token }
        })
        return vrificationToken;
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const vrificationToken = await db.verificationToken.findFirst({
            where: { email }
        })
        return vrificationToken;
    } catch (error) {
        return null;
    }
}