import * as z from "zod";


export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters requred."
    }),
    name: z.string().min(1, {
        message: "Name is requred."
    })
});




// import * as z from "zod";

// const emailPattern = /^[a-zA-Z0-9._%+-]+@bpl.net$/;

// export const LoginSchema = z.object({
//     email: z.string().email({
//         message: "Invalid email address"
//     }).regex(emailPattern, {
//         message: "Email must end with @bpl.net"
//     }),
//     password: z.string().min(1, {
//         message: "Password is required"
//     })
// });

// export const RegisterSchema = z.object({
//     email: z.string().email({
//         message: "Invalid email address"
//     }).regex(emailPattern, {
//         message: "Email must end with @bpl.net"
//     }),
//     password: z.string().min(6, {
//         message: "Minimum 6 characters required."
//     }),
//     name: z.string().min(1, {
//         message: "Name is required."
//     })
// });
