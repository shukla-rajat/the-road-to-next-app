import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { AttachmentEntity } from "@prisma/client";

import { s3 } from "@/lib/aws";
import { inngest } from "@/lib/inngest";

import { generateS3Key } from "../utils/generateS3Key";

export type AttachmentDeleteEventArgs = {
  data: {
    organizationId: string;
    entityId: string;
    entity: AttachmentEntity;
    fileName: string;
    attachmentId: string;
  };
};

export const attachmentDeletedEvent = inngest.createFunction(
  { id: "attachment-deleted", triggers: [{ event: "app/attachment.deleted" }] },
  async ({ event }) => {
    const { organizationId, entityId, entity, fileName, attachmentId } = event.data;

    try {

      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            entityId,
            entity,
            fileName,
            attachmentId,
          }),
        })
      );
    } catch (error) {
      console.log(error);
      return { event, body: false };
    }

    return { event, body: true };
  }
);