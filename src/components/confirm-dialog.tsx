
import { ActionState } from "./form/utils/to-action-state";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { cloneElement, useState } from "react";

type UseConfirmDialogProps = {
    title?: string;
    description?: string;
    action: (payload: FormData) => void;
    trigger: React.ReactElement;
}

const useConfirmDialog = ({ 
    title = "Are you absolutely sure ?", 
    description = "This action cannot be undone. Make sure you understand the consequences. ", 
    action, 
    trigger }: UseConfirmDialogProps) => {
     const [isOpen, setIsOpen] = useState(false);   

    const dialogTrigger = cloneElement(trigger, { 
        onClick: () => setIsOpen((state) => !state),
    })
    const dialog = (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <form action={action}>
                            <Button type="submit">Confirm</Button>
                        </form>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    return [ dialogTrigger, dialog ];
}

export { useConfirmDialog }