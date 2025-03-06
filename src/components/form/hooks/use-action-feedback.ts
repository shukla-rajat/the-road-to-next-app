import { useEffect } from "react";
import { ActionState } from "../utils/to-action-state";

type UseActionFeedbackOptions = {
    onSuccess?: ({ actionState }: { actionState: ActionState }) => void;
    onError?: ({ actionState }: { actionState: ActionState }) => void;
};

const useActionFeedback = (
    actionState: ActionState, 
    options: UseActionFeedbackOptions
) => {
    useEffect(() => {
        if(actionState.status === "SUCCESS") {
            options.onSuccess?.({actionState});
        }
    
        if(actionState.message === "ERROR") {
            options.onError?.({actionState});
        }
    },[actionState, options]);
}

export { useActionFeedback };