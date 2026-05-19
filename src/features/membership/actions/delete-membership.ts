"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

import { getMemberships } from "../queries/get-memberships";

export const deleteMembership = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  const { user } = await getAuthOrRedirect();

  const memberships = await getMemberships(organizationId);

  //check if its the last  membership

  const isLastMembership = (memberships ?? []).length === 1;

  if (isLastMembership) {
    return toActionState(
      "ERROR",
      "You cannot delete the last membership of an organization",
    );
  }

  // check if membership exists
  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState("ERROR", "Membership not found");
  }

  //check if user is deleting last admin
  const adminMemberships = (memberships ?? []).filter(
    (membership) => membership.membershipRole === "ADMIN",
  );

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberships.length <= 1;

  //check if user is authorized
  const myMembership = (memberships ?? []).find(
    (membership) => membership.userId === user?.id,
  );

  const isMyself = user.id === userId;
  const isAdmin = myMembership?.membershipRole === "ADMIN";

  if (!isAdmin && !isMyself) {
    return toActionState(
      "ERROR",
      "You can only delete memberships as an admin.",
    );
  }

  //Okay - everything checked

  if (removesAdmin && isLastAdmin) {
    return toActionState(
      "ERROR",
      "You cannot delete the last admin of an organization",
    );
  }

  await prisma.membership.delete({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  return toActionState(
    "SUCCESS",
    isMyself
      ? "You left the organization."
      : "The Membership has been deleted.",
  );
};
