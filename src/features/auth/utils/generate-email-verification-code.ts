import { prisma } from "@/lib/prisma";
import { generateRandomCode } from "@/utils/crypto";

const EMAIL_VERIFICATION_TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 24;

export const generateEmailVerificationCode = async (
  userId: string,
  email: string,
) => {
  // Delete existing verification tokens for the user
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  // Generate a new verification code
  const code = generateRandomCode();

  // Create the new verification token
  await prisma.emailVerificationToken.create({
    data: {
      code,
      userId,
      email,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_LIFETIME_MS),
    },
  });

  // Return the generated code
  return code;
};
