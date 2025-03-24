
import { Ticket } from "@prisma/client";
import { LucideTrash } from "lucide-react";

import { 
    DropdownMenuTrigger, 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

type TicketMoreMenuProps = {
    ticket: Ticket;
    trigger: React.ReactNode;
}

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
    const deleteButton = (
        <DropdownMenuItem>
            <LucideTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    );
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="right">
                {deleteButton}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { TicketMoreMenu };