import { prisma } from "@/lib/prisma";
import { passwordResetUrl } from "@/paths";
import { generateRandomToken } from "@/utils/crypto";
import { getBaseUrl } from "@/utils/url";

const generatePasswordResetLink = async (userId: string) => {
  const tokenId = generateRandomToken();
  const PASSWORD_RESET_TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 24;

  await prisma.passwordResetToken.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.passwordResetToken.create({
    data: {
      tokenHash: tokenId,
      userId,
      expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_LIFETIME_MS),
    },
  });

  const pageUrl = getBaseUrl() + passwordResetUrl();
  const passwordResetLink = pageUrl + `/${tokenId}`;

  return passwordResetLink;
};

export { generatePasswordResetLink };
