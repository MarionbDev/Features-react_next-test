import EmailTemplate from "@/emails/emailTemplate";
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

// Send email
export const POST = async (request) => {
  try {
    console.log("Received a POST request");

    const body = await request.json();

    const { firstname, lastname, email, message } = body;

    console.log("body server", body);

    resend.emails.send({
      from: "marionbaston.fr <onboarding@resend.dev>",

      to: process.env.TO_EMAIL,
      subject: "Message utilisateur",
      react: EmailTemplate({ firstname, lastname, email, message }),
    });

    // console.log("Email send result:", emailResult);

    return NextResponse.json({ message: "email successfull sent!" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
