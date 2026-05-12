export const ticketsPath = () => "/tickets";
export const ticketPath = (ticketId : string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId : string) => `/tickets/${ticketId}/edit`
export const homePath = () => "/";

export const signUpPath = () => "/sign-up";
export const signInPath = () => "/sign-in";
export const passwordForgotPath = () => "/password-forgot";
export const passwordResetUrl = () => "/password-reset";
export const emailVerificationPath = () => "/email-verification";

export const onBoardingPath = () => "/onboarding";
export const selectActiveOrganizationPath = () => "/onboarding/select-active-organization";

export const organizationsPath = () => "/organization";
export const organizationCreatePath = () => "/organization/create";
export const membershipsPath = (organizationId:string) => `/organization/${organizationId}/memberships`;

export const accountProfilePath = () => "/account/profile";
export const accountPasswordPath = () => "/account/password";