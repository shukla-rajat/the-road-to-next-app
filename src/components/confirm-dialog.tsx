
import { SubmitButton } from "./form/submit-button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "./ui/alert-dialog";
import { cloneElement, useState, useActionState } from "react";
import { Form } from "@/components/form/form";
import { ActionState, EMPTY_ACTION_STATE } from "./form/utils/to-action-state";

type UseConfirmDialogProps = {
    title?: string;
    description?: string;
    action: () => Promise<ActionState>;
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

    const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

    const handleSuccess = () => {
        setIsOpen(false);
    };

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
                        <Form action={formAction} actionState={actionState} onSuccess={handleSuccess}>
                            <SubmitButton label="Confirm" />
                        </Form>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    return [dialogTrigger, dialog];
}

export { useConfirmDialog }