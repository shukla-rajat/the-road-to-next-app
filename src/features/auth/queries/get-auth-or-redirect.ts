import { redirect } from "next/navigation";

import { getAuth } from "@/features/auth/queries/get-auth";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";
import { emailVerificationPath, onBoardingPath, signInPath } from "@/paths";

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
};

export const getAuthOrRedirect = async (options?: GetAuthOrRedirectOptions) => {
  const { checkEmailVerified = true, checkOrganization = true } = options ?? {};
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  if (checkEmailVerified) {
    redirect(emailVerificationPath());
  }

  if(checkOrganization) {
    const organizations = await getOrganizationsByUser();

    if (!organizations.length) {
      redirect(onBoardingPath());
    }
  }

  return auth;
};
