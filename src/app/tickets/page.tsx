import { useState, useEffect } from "react"; 
import { Heading } from "@/components/heading";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { Ticket } from "@/features/ticket/types";
import { getTickets } from "@/features/ticket/queries/get-tickets";

const TicketsPage = async () => {
  const tickets = await getTickets();
  
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets Page" description="Your home place for tickets" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket}/>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
