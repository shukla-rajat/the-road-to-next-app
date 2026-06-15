import { CardCompact } from "@/components/card-compact";

import { getAttachments } from "../queries/get-attachment";
import { AttachmentCreateForm } from "./attachment-create-form";
import { AttachmentDeleteButton } from "./attachment-delete-button";
import { AttachmentItem } from "./attachment-item";

type AttachmentsProps = {
  ticketId: string;
  isOwner: boolean;
};

const Attachments = async ({ ticketId, isOwner }: AttachmentsProps) => {
  const attachments = await getAttachments(ticketId);
  return (
    <CardCompact
      title="Attachments"
      description="Attached images or PDFs"
      content={
        <>
          <div>
            {attachments.map((attachment) => (
              <AttachmentItem
                key={attachment.id}
                attachment={attachment}
                buttons={[
                  ...(isOwner
                    ? [<AttachmentDeleteButton key="0" id={attachment.id} />]
                    : []),
                ]}
              />
            ))}
          </div>

          {isOwner && <AttachmentCreateForm ticketId={ticketId} />}
        </>
      }
    />
  );
};

export { Attachments };
