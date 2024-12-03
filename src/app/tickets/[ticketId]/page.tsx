import { initialTickets } from "@/data";

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
    return <h2 className="text-lg"> Ticket Not Found ! </h2>;
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
