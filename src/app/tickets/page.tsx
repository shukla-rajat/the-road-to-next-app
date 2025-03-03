import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets Page" description="Your home place for tickets" />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
