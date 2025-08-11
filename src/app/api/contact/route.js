import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const { name, email, phone, service, message } = await request.json();

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${process.env.GMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Inquiry from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Service: ${service}
                Message: ${message}
                    `,
        });

        return Response.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ success: false }, { status: 500 });
    }
}
