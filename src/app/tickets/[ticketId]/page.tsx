import { initialTickets } from "@/data";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";
import Link from "next/link";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => {
    return ticket.id === ticketId;
  });
  if (!ticket) {
    return <Placeholder 
      label="Ticket not found !"
      button={
        <Button asChild variant='outline'>
          <Link href={ticketsPath()}>Go back to Tickets</Link>
        </Button>
      }
    />
  }
  return (
    <div>
      <h2 className="text-lg"> Ticket Page: {ticket.id} </h2>
      <h2 className="text-lg"> Ticket Title: {ticket.title} </h2>
      <h2 className="text-lg"> Ticket Content {ticket.content} </h2>
      <h2 className="text-lg"> Ticket Status: {ticket.status} </h2>
    </div>
  );
};

export default TicketPage;
