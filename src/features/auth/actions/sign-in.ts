
"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { verify } from "@node-rs/argon2";
import { ActionState, fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { z } from "zod";
import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";
import { prisma } from "@/lib/prisma";

const signUpSchema = z.object ({
    email: z.string().min(1, { message: "Is required"}).max(191).email(),
    password: z.string().min(6).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { email, password } = signUpSchema.parse(
            Object.fromEntries(formData)
        );

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if(!user) {
            return toActionState("ERROR", "Incorrect email or password");
        }

        const validPassword = await verify(user.passwordHash, password);

        if(!validPassword) {
            return toActionState("ERROR", "Incorrect email or password");
        }
    }
    catch (error) {
        return fromErrorToActionState(error, formData);
    }

    redirect(ticketsPath());
    
}