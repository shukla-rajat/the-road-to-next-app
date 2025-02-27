import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createTicket } from "@/features/ticket/actions/create-ticket";
import { Ticket } from "@prisma/client";

type TicketUpdateFormProps = {
    ticket: Ticket;
}

const TicketUpdateForm = ({ticket}: TicketUpdateFormProps) => {

    return (
        <form action={createTicket} className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={ticket.title}/>

            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={ticket.content}/>

             <Button type="submit">Create</Button>
        </form>
    )
}

export { TicketUpdateForm };