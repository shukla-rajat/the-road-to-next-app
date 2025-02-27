import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets Page" description="Your home place for tickets" />
      <Card className="w-full max-w-[420px] self-center">
        <CardHeader>
          <CardTitle>
            Create Ticket
          </CardTitle>
          <CardDescription>
            A new ticket will be created
          </CardDescription>
        </CardHeader>
        <CardContent> <TicketCreateForm/> </CardContent>
      </Card>
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
