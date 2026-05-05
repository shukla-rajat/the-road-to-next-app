import EmailVerification from "@/emails/auth/email-verification";
import { resend } from "@/lib/resend";
export const sendEmailVerification = async (
  username: string,
  email: string,
  verificationCode: string,
) => {

  console.log("email verification: ", verificationCode);
  const result = await resend.emails.send({
    from: "[EMAIL_ADDRESS]",
    to: email,
    subject: "Email Verification from TicketBounty",
    react: <EmailVerification toName={username} code={verificationCode} />
  })

  return result;
};
