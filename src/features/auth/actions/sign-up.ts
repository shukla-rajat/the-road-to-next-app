
"use server";

import { cookies } from "next/headers";
import { hash } from '@node-rs/argon2';
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { lucia } from '@/lib/lucia';
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";

const signUpSchema = z.object ({
    username: z
        .string()
        .min(1)
        .max(191)
        .refine((value) => !value.includes(" "), "Username cannot contain spaces"),
    email: z.string().min(1, { message: "Is required"}).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
})
.superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword ) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"]
        });
    }
});

export const signUp = async (_actionState: ActionState, formData: FormData) => {
    try {
        const { username, email, password } = signUpSchema.parse(
            Object.fromEntries(formData)
        );

        const passwordHash = await hash(password);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash, 
            }
        });

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    catch (error) {
        return fromErrorToActionState(error, formData);
    }

    redirect(ticketsPath());
    
}