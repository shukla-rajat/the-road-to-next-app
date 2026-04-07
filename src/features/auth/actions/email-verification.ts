"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { createSession } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { generateRandomToken } from "@/utils/crypto";

import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { setSessionCookie } from "../utils/session-cookie";

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const { code } = emailVerificationSchema.parse(
      Object.fromEntries(formData),
    );

    //TODO implement email verification logic
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });
    const emailVerificationToken =
      await prisma.emailVerificationToken.findFirst({
        where: { userId: user.id },
      });

    /*if (!user) {
      return toActionState("ERROR", "Incorrect code", formData);
    }*/
    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};
