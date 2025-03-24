
import { TicketMoreMenu } from "./ticket-more-menu";
import { toCurrencyFromCent } from "@/utils/currency";
import clsx from "clsx";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ticketPath, ticketEditPath } from "@/paths";
import Link from "next/link";
import { TICKET_ICONS } from "../constants";
import { LucideSquareArrowOutUpRight, LucideTrash, LucidePencil, LucideMoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ticket } from "@prisma/client";
import { deleteTicket } from "../actions/delete-ticket";

type TicketItemProps = {
    ticket: Ticket;
    isDetail?: boolean;
};

const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {

    const detailButton = (
        <Button variant="outline" size="icon" asChild>
            <Link prefetch href={ticketPath(ticket.id)}><LucideSquareArrowOutUpRight className="h-4 w-4" /></Link>
        </Button>
    );

    const editButton = (
        <Button variant="outline" size="icon" asChild>
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <LucidePencil className="h-4 w-4" />
            </Link>
        </Button>
    )

    const deleteButton = (
        <form action={deleteTicket.bind(null, ticket.id)}>
            <Button variant="outline" size="icon">
                <LucideTrash className="h-4 w-4" />
            </Button>
        </form>
    )

    const moreMenu = <TicketMoreMenu ticket={ticket} trigger={
        <Button variant="outline" size="icon">
            <LucideMoreVertical className="h-4 w-4" />
        </Button>
        } 
    />

    return (
        <div className={clsx("w-full flex gap-x-1", {
            "max-w-[580px]": isDetail,
            "max-w-[420px]": !isDetail
        })}>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex gap-x-2">
                        <span>{TICKET_ICONS[ticket.status]}</span>
                        <span className="truncate">{ticket.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <span className={clsx("whitespace-break-spaces", {
                        "line-clamp-3": !isDetail,
                    })}>
                        {ticket.content}
                    </span>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
                    <p className="text-sm text-muted-foreground">{toCurrencyFromCent(ticket.bounty)}</p>
                </CardFooter>
            </Card>

            <div className="flex flex-col gap-y-1">
                {isDetail ? (
                    <>
                        {editButton}
                        {deleteButton}
                        {moreMenu}
                    </>
                ) : (
                    <>
                        {detailButton}
                        {editButton}
                    </>
                )}
            </div>
        </div>
    );
}

export { TicketItem };