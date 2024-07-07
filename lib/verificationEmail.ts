import { sendMail } from "@/lib/mailService";

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    const from: string = process.env.EMAIL_USER as string;
    const to: string = email;
    const subject: string = 'Confirm your email';
    const mailTemplate: string = `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`;
    await sendMail(from, to, subject, mailTemplate);
}


export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    const from: string = process.env.EMAIL_USER as string;
    const to: string = email;
    const subject: string = 'Reset your password';
    const mailTemplate: string = `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`;
    await sendMail(from, to, subject, mailTemplate);
}