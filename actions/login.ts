"use server"
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!", success: undefined };
    }

    const { email, password } = validatedFields.data;
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



