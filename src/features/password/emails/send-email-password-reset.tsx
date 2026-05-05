import EmailPasswordReset from "@/emails/password/email-password-reset";
import { resend } from "@/lib/resend";
export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordResetLink: string,
) => {

  console.log("password reset: ", passwordResetLink);
  return await resend.emails.send({
    from: "[EMAIL_ADDRESS]",
    to: email,
    subject: "Password Reset from TicketBounty",
    react: <EmailPasswordReset toName={username} url={passwordResetLink} />
  })
};
