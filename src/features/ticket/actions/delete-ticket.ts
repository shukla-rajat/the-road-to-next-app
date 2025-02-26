"use server";
import { revalidatePath } from 'next/cache';
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";

export const deleteTicket = async (id: string) => {
    await prisma.ticket.delete({
        where: {
            id,
        },
    });

    revalidatePath(ticketsPath());
    redirect(ticketsPath());
}