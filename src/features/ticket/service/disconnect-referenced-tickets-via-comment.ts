import { Comment } from "@prisma/client";

import * as ticketData from "@/features/ticket/data";
import { prisma } from "@/lib/prisma";
import { findTicketIdsFromText } from "@/utils/find-ids-from-text";

export const disconnectReferencedTicketsViaComment = async (
  comment: Comment
) => {
  const ticketIds = findTicketIdsFromText("tickets", comment.content);

  if (!ticketIds.length) return;

  const comments = await prisma.comment.findMany({
    where: {
      ticketId: comment.ticketId,
      id: {
        not: comment.id,
      },
    },
  });

  const allOtherTicketIds = findTicketIdsFromText(
    "tickets",
    comments.map((comment) => comment.content).join(" ")
  );

  const ticketIdsToRemove = ticketIds.filter(
    (ticketId) => !allOtherTicketIds.includes(ticketId)
  );

  await ticketData.disconnectReferencedTickets(
    comment.ticketId,
    ticketIdsToRemove
  );
};