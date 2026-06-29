import { AttachmentEntity } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const getAttachmentSubject = async (
  entityId: string,
  entity: AttachmentEntity,
) => {

  switch (entity) {
    case "TICKET": {
        return await prisma.ticket.findUnique({
        where: {
          id: entityId,
        },
      });
      break;
    }
    case "COMMENT": {
        return await prisma.comment.findUnique({
        where: {
          id: entityId,
        },
        include: {
          ticket: true,
        },
      });
      break;
    }
    default:
      return null;
  }
};
