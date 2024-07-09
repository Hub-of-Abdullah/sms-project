"use server"
import * as z from "zod";
import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail, } from "@/lib/verificationEmail";
import { generateVerificaionToken, generateTwoFactorToken, } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUseId } from "@/data/two-factor-confirmation";



export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!", success: undefined };
    }

    const { email, password, code } = validatedFields.data;

    const exitingUser = await getUserByEmail(email);

    if (!exitingUser || !exitingUser.email || !exitingUser.password) {
        return { error: "Email does not exist..!" }
    }

    if (!exitingUser.emailVerified) {
        const verificationToken = await generateVerificaionToken(exitingUser.email,);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Confirmation email sent..!" };
    }


    if (exitingUser.isTwoFactorEnabled && exitingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(exitingUser.email);

            if (!twoFactorToken) {
                return { error: "Invalid code" };
            }
            if (twoFactorToken.token !== code) {
                return { error: "Invalid code" };
            }

            const hssExpired = new Date(twoFactorToken.expires) < new Date();

            if (hssExpired) {
                return { error: "Code expired!" };
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id,
                }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUseId(exitingUser.id);
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: exitingUser.id,
                }
            })

        } else {
            const twoFactorToken = await generateTwoFactorToken(exitingUser.email)
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            );

            return { twoFactor: true };
        }


    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
        return { error: undefined, success: "Login successful!" }; // Add success message
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!", success: undefined };
                case "CredentialsSignin":
                    throw error;
                default:
                    return { error: "Something went wrong!", success: undefined };
            }
        }
        throw error;
    }
}



// "use server"
// import * as z from "zod";
// import { LoginSchema } from "@/schemas";
// import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { AuthError } from "next-auth";

// export const login = async (values: z.infer<typeof LoginSchema>) => {
//     const validatedFields = LoginSchema.safeParse(values);

//     if (!validatedFields.success) {
//         return { error: "Invalid fields!" };
//     }

//     const { email, password } = validatedFields.data;
//     try {
//         await signIn("credentials", {
//             email,
//             password,
//             redirectTo: DEFAULT_LOGIN_REDIRECT
//         })
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case "CredentialsSignin":
//                     return { error: "Invalid Credentials!" }
//                 case "CredentialsSignin":
//                     throw error;
//                 default:
//                     return { error: "Something went wrong!" }
//             }
//         }

//     }

// }



