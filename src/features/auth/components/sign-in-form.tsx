
"use client"

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { signIn } from "../actions/sign-in";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";

const SignInForm = () => {
const[actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

    return (
        <Form action={action} actionState={actionState}>
            <Input name="email" placeholder="Email"/>
            <FieldError actionState={actionState} name="email" />

            <Input name="password" placeholder="Password" type="password"/>
            <FieldError actionState={actionState} name="password" />

            <SubmitButton label="Sign In" />
        </Form>
    )
    
};

export { SignInForm };