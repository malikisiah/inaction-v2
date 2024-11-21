"use client";

import { Editor } from "~/components/DynamicEditor";
import type { PartialBlock } from "@blocknote/core";
import { LinkIcon } from "@heroicons/react/24/solid";
import {
  EllipsisHorizontalIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import BreadCrumbs from "~/components/BreadCrumbs";

export default function ClientPage({
  initialContent,
  documentId,
}: {
  initialContent: PartialBlock[];
  documentId: string;
}) {
  return (
    <>
      <div className="">
        <div className="ml-72 flex items-center justify-between p-3 sm:hidden lg:flex">
          <BreadCrumbs />
          <div className="flex items-center gap-3">
            <p>Edited Nov 16</p>
            <LinkIcon className="size-5" />
            <EllipsisHorizontalIcon className="size-6" />
            <ChatBubbleBottomCenterTextIcon className="size-6" />
          </div>
        </div>
        <main className="py-10 lg:pl-72">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Editor initialContent={initialContent} documentId={documentId} />
          </div>
        </main>
      </div>
    </>
  );
}
