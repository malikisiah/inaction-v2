"use client";

import { Editor } from "~/components/DynamicEditor";
import type { PartialBlock } from "@blocknote/core";
import { LinkIcon } from "@heroicons/react/24/solid";
import {
  EllipsisHorizontalIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import type { Character } from "@prisma/client";

export default function ClientPage({
  initialContent,
  documentId,
  updatedAt,
  characters,
}: {
  initialContent: PartialBlock[];
  documentId: string;
  updatedAt: Date;
  characters: Character[];
}) {
  return (
    <>
      <div className="">
        <div className="ml-72 mr-2 flex items-center justify-end p-3 sm:hidden lg:flex">
          <div className="flex items-center gap-5">
            <p className="text-gray-500">Edited {updatedAt.toDateString()}</p>
            <button className="hover:text-gray-500">
              <LinkIcon className="size-5" />
            </button>

            <button className="hover:text-gray-500">
              <ChatBubbleBottomCenterTextIcon className="size-5" />
            </button>
            <button className="hover:text-gray-500">
              <EllipsisHorizontalIcon className="size-6" />
            </button>
          </div>
        </div>
        <main className="py-10 lg:pl-72">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Editor
              initialContent={initialContent}
              documentId={documentId}
              characters={characters}
            />
          </div>
        </main>
      </div>
    </>
  );
}
