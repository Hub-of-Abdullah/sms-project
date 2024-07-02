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
