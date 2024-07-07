import nodemailer from 'nodemailer';

export const sendMail = async (from: string, to: string, subject: string, htmlContent: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        return { message: "Success!", status: 200 };
    } catch (error) {
        console.error('Error sending email:', error);
        return { message: "Failed!", error: error instanceof Error ? error.message : String(error), status: 500 };
    }
}


// import nodemailer from 'nodemailer';

// export const sendMail = async (from: string, to: string, subject: string, htmlContent: string) => {

//     try {
//         let transporter = nodemailer.createTransport({
//             name: process.env.SMTP_HOST,
//             host: process.env.SMTP_HOST,
//             port: Number(process.env.SMTP_PORT),
//             secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for other ports
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }

//         });

//         const mailOptions = {
//             from: from,
//             to: to,
//             subject: subject,
//             html: htmlContent
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ', info.response);
//         return { message: "Success!", status: 200 };
//     } catch (error) {
//         console.error('Error sending email:', error);
//         return { message: "Failed!", error: error instanceof Error ? error.message : String(error), status: 500 };
//     }
// }
