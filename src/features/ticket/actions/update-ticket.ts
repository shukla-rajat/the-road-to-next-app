"use server";

import {redirect} from "next/navigation";
import {ticketsPath} from "@/paths";
import {revalidatePath} from "next/cache";
import {prisma} from "@/lib/prisma";

export const updateTicket = async(id:string, formData:FormData) => {
    const data = {
        title: formData.get("title"),
        content: formData.get("content"),
    }

    await prisma.ticket.update ({
        where:{
            id,
        },
        data: {
            title: data.title as string,
            content: data.content as string
        }
    })

    revalidatePath(ticketsPath());
    redirect(ticketsPath());
}