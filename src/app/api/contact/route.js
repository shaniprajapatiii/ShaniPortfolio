import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const createTransporter = () => {
  const service = process.env.MAILER_SERVICE;
  const host = process.env.MAILER_HOST;
  const port = Number(process.env.MAILER_PORT ?? 587);
  const secure = process.env.MAILER_SECURE === "true";
  const user = process.env.MAILER_USER;
  const pass = process.env.MAILER_PASS;

  if (!user || !pass) {
    throw new Error("Mailer credentials are not configured.");
  }

  if (service) {
    return nodemailer.createTransport({
      service,
      auth: { user, pass },
    });
  }

  if (!host) {
    throw new Error("Mailer host is not configured.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
};

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.MAILER_FROM || process.env.MAILER_USER,
      to: process.env.MAILER_TO,
      subject: `Portfolio message from ${name}: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to send contact message.",
      },
      { status: 500 },
    );
  }
}
