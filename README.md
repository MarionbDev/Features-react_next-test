## AUTHENTICATION WITH SUPABASE_AUTH

Create an application that allows a user to register and log in

## REACT-EMAIL WITH RESEND

Send e-mails from Next.js 14 :
Integrate the RESEND messaging API and test its functionality.

#### Create an API key

#### Create an email template:

```jsx
const EmailTemplate = ({ firstName, message }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <h2>{message}</h2>
  </div>
);

export default EmailTemplate;
```

#### Send Email using React:

```jsx
const EmailTemplate = ({ firstName, message }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <h2>{message}</h2>
  </div>
);

export default EmailTemplate;
```

```jsx
// Send email
import EmailTemplate from "@/app/_components/emailTemplate";
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    console.log("Received a POST request");

    const body = await request.json();

    const { firstname, message } = body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["my_email_adress"],
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
      react: EmailTemplate({ firstname, message }),
    });

    console.log("Email send result:", data);

    return NextResponse.json({ message: "email successfully sent!" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error });
  }
};
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
