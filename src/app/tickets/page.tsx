import clsx from "clsx";
import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LucideFileText, LucideCircleCheck, LucidePencil } from "lucide-react";
import { Heading } from "@/components/heading";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCircleCheck />,
  IN_PROGRESS: <LucidePencil />,
};
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets Page" description="Your home place for tickets" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="w-full max-w-[420px]"
          >
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
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
