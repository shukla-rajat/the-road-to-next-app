import { useEffect } from "react";
import { ActionState } from "../utils/to-action-state";

type UseActionFeedbackOptions = {
    onSuccess?: () => void;
    onError?: () => void;
};

const useActionFeedback = (
    actionState: ActionState, 
    options: UseActionFeedbackOptions
) => {
    useEffect(() => {
        if(actionState.status === "SUCCESS") {
          //console.log(actionState.message);
          if(options.onSuccess) {
            options.onSuccess();
          }
        }
    
        if(actionState.message === "ERROR") {
          //console.log(actionState.message);
          if(options.onError) {
            options.onError();
          }
        }
    },[actionState, options]);
}

export { useActionFeedback };