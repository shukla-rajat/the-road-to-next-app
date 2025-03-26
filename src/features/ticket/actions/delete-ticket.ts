"use server";
import { setCookieByKey } from '@/actions/cookies';
import { revalidatePath } from 'next/cache';
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { redirect } from "next/navigation";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state"; 

export const deleteTicket = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try{
        await prisma.ticket.delete({
            where: {
                id
            },
        });  
    } catch(error) {
        return fromErrorToActionState(error);
    }
    
    revalidatePath(ticketsPath());
    setCookieByKey("toast", "Ticket deleted");
    redirect(ticketsPath());
}