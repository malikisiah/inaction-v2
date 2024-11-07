"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { type PartialBlock } from "@blocknote/core";

import { getDefaultSlashMenuItems } from "@blocknote/core";

export default function Editor({
  onChange,
}: {
  initialData: PartialBlock[];
  onChange: () => void;
}) {
  const editor = useCreateBlockNote();
  getDefaultSlashMenuItems(editor);

  return (
    <BlockNoteView
      slashMenu={false}
      theme={"light"}
      onBlur={onChange}
      editor={editor}
    />
  );
}
