import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateTicket } from "@/features/ticket/actions/update-ticket";
import { Ticket } from "@prisma/client";

type TicketUpdateFormProps = {
    ticket: Ticket;
}

const TicketUpdateForm = ({ticket}: TicketUpdateFormProps) => {

    return (
        <form action={updateTicket} className="flex flex-col gap-y-2">
            <Input name="id" type="hidden" defaultValue={ticket.id} />

            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={ticket.title}/>

            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={ticket.content}/>

             <Button type="submit">Create</Button>
        </form>
    )
}

export { TicketUpdateForm };