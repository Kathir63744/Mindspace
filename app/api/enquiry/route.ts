import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.email || !body.phone) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Configure the transporter using your Gmail credentials
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send the email
        await transporter.sendMail({
            from: `"Mind Space Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Sends the enquiry to your own inbox
            subject: `New Enquiry from ${body.name}`,
            html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Destination:</strong> ${body.destination || "Not specified"}</p>
        <p><strong>Level:</strong> ${body.level || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message || "No message provided."}</p>
      `,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
}