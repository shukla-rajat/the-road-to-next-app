"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { membershipsPath, ticketsPath } from "@/paths";

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(191),
});

export const createOrganization = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect({
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  let organization;

  try {
    const data = createOrganizationSchema.parse({
      name: formData.get("name"),
    });

    await prisma.$transaction(async (tx) => {
      organization = await tx.organization.create({
        data: {
          ...data,
          memberships: {
            create: {
              userId: user.id,
              isActive: true,
              membershipRole: "ADMIN",
            },
          },
        },
      });

      await tx.membership.updateMany({
        where: {
          userId: user.id,
          organizationId: {
            not: organization.id,
          },
        },
        data: {
          isActive: false,
        },
      });
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await inngest.send({
    name: "app/organization.created",
    data: {
      organizationId: organization.id,
      byEmail: user.email,
    },
  });

  await setCookieByKey(
    "toast",
    `<a href=${membershipsPath(organization.id)}>Organization</a> created`,
  );
  redirect(ticketsPath());
};
