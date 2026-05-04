"use server";

import { revalidatePath } from "next/cache";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { organizationPath } from "@/paths";

import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

export const switchOrganization = async (organizationId: string) => {
  const organizations = await getOrganizationsByUser();
  const canSwitch = organizations.some(
    (organization) => organization.id === organizationId
  );

  if(!canSwitch){
    return toActionState("ERROR", "Not a member of this organization");
  }

  const { user } = await getAuthOrRedirect();
  try {
    await prisma.membership.updateMany({
        where: {
            userId: user.id,
            organizationId:{
                not: organizationId,
            }
        },
        data: {
            isActive: false,
        }
    })
    await prisma.membership.update({
      where: {
        organizationId_userId: {
          userId: user.id,
          organizationId,
        },
      },
      data: {
        isActive: true,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(organizationPath());

  return toActionState("SUCCESS", "Active organization has been switched");
};
