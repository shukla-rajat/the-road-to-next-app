"use server";

import { z } from "zod";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

import { generatePasswordResetLink  } from "../utils/generate-password-reset-link";
import { verifyPasswordHash } from "../utils/hash-and-verify";


const passwordChangeSchema = z.object({
  password: z.string().min(6).max(191),
});

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { password } = passwordChangeSchema.parse({
        password: formData.get("password"),
    });

    const auth = await getAuthOrRedirect();
    const validPassword = await verifyPasswordHash(auth.user.passwordHash, password);
    if(!validPassword){
        return toActionState("ERROR", "incorrect password");
    }

    const passwordResetLink = await generatePasswordResetLink (auth.user.id);
    console.log(passwordResetLink);  
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "check your email for a reset.");
};
