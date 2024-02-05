import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

const EmailTemplate = ({ firstname, lastname, email, message }) => (
  <Tailwind>
    <Html>
      <Head>
        <Heading className="  text-pink-700">
          {firstname} {lastname} has sent you a message !
        </Heading>
        <p> Contact : {email}</p>
      </Head>
      <Container>
        <Heading>Message :</Heading>
        <Text>{message}</Text>
      </Container>
    </Html>
  </Tailwind>
);

export default EmailTemplate;
