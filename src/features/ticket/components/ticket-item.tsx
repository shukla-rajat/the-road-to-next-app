import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ticketPath } from "@/paths";
import Link from "next/link";
import { TICKET_ICONS } from "../constants";
import { Ticket } from "../types";

type TicketItemProps = {
    ticket: Ticket;
};

const TicketItem = ({ticket}: TicketItemProps) => {
    return (
        <Card className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex gap-x-2">
                <span>{TICKET_ICONS[ticket.status]}</span>
                <span className="truncate">{ticket.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span
                className="line-clamp-3 whitespace-break-spaces"
              >
                {ticket.content}
              </span>
            </CardContent>
            <CardFooter>
              <Link href={ticketPath(ticket.id)} className="text-sm underline">
                View
              </Link>
            </CardFooter>
        </Card>
    );
}

export { TicketItem } ;