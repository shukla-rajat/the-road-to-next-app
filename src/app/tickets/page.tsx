import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner";
import { CardCompact } from "@/components/card-compact";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets Page" description="Your home place for tickets" />
      <CardCompact title="Create Ticket" 
        description="A new ticket will be created" 
        className="w-full max-w-[420px] self-center" 
        content={<TicketCreateForm />} 
      />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
