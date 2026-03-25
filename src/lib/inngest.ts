import { Inngest } from "inngest";

import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type Events = {
    "app/password.password-reset": PasswordResetEventArgs;
}

export const inngest = new Inngest({
    id: "the-road-to-next",
    schemas: {
    events: {} as Events, // Types are now attached here natively!
  }
});