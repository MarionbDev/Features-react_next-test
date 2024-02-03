const EmailTemplate = ({ firstName, message }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <h2>{message}</h2>
  </div>
);

export default EmailTemplate;
