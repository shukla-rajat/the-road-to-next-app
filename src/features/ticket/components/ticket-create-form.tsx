import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createTicket } from "@/features/ticket/actions/create-ticket";

const TicketCreateForm = () => {


    return (
        <form action={createTicket} className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" />

            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" />

             <Button type="submit">Create</Button>
        </form>
    )
}

export { TicketCreateForm };