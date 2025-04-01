
"use client"

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { signUp } from "../actions/sign-up";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";

const SignUpForm = () => {
const[actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

    return (
        <Form action={action} actionState={actionState}>
            <Input name="username" placeholder="Username"/>
            <FieldError actionState={actionState} name="username"/>

            <Input name="email" placeholder="Email"/>
            <FieldError actionState={actionState} name="email" />

            <Input name="password" placeholder="Password" type="password"/>
            <FieldError actionState={actionState} name="password" />

            <Input name="confirmPassword" placeholder="Confirm Password" type="password"/>
            <FieldError actionState={actionState} name="confirmPassword" />

            <SubmitButton label="Sign Up" />
        </Form>
    )
    
};

export { SignUpForm };