import EmailTemplate from "@/app/_components/emailTemplate";
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

// Send email
export const POST = async (request) => {
  try {
    console.log("Received a POST request");

    const body = await request.json();

    const { firstname, message } = body;

    resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["my_email_adress"],
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
      react: EmailTemplate({ firstname, message }),
    });

    console.log("Email send result:", data);

    return NextResponse.json({ message: "email successfull sent!" });
  } catch (error) {
    console.log("error", error);
    NextResponse.json({ error });
  }
};
