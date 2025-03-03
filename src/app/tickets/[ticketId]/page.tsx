import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";
import Link from "next/link";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticket = await getTicket(params.ticketId);
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
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail/>
    </div>
  );
};

export default TicketPage;
