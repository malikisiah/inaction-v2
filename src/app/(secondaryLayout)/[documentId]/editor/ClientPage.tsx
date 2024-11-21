"use client";

import { Editor } from "~/components/DynamicEditor";
import type { PartialBlock } from "@blocknote/core";

export default function ClientPage({
  initialContent,
  documentId,
}: {
  initialContent: PartialBlock[];
  documentId: string;
}) {
  return (
    <>
      <div>
        <main className="py lg:pl-72">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Editor initialContent={initialContent} documentId={documentId} />
          </div>
        </main>
      </div>
    </>
  );
}
