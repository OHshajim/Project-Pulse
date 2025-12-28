import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string) => {
    await resend.emails.send({
        from: "Support <onboarding@resend.dev>", // works out of box
        to,
        subject,
        html,
    });
};
