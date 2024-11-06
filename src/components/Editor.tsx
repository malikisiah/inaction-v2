"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import type { PartialBlock } from "@blocknote/core";

// Our <Editor> component we can reuse later
export default function Editor({
  initialData,
  onChange,
}: {
  initialData: PartialBlock[];
  onChange: () => void;
}) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({ initialContent: initialData });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      theme={"light"}
      onBlur={() => console.log(editor.document)}
      editor={editor}
    />
  );
}
