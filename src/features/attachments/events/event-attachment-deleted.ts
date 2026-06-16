import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import { s3 } from "@/lib/aws";
import { inngest } from "@/lib/inngest";

import { generateS3Key } from "../utils/generateS3Key";

export type AttachmentDeleteEventArgs = {
  data: {
    organizationId: string;
    ticketId: string;
    fileName: string;
    attachmentId: string;
  };
};

export const attachmentDeletedEvent = inngest.createFunction(
  { id: "attachment-deleted", triggers: [{ event: "app/attachment.deleted" }] },
  async ({ event }) => {
    const { organizationId, ticketId, fileName, attachmentId } = event.data;

    try {

      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            ticketId,
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