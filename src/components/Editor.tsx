"use client";
import "@blocknote/core/fonts/inter.css";
import { SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
  type PartialBlock,
} from "@blocknote/core";

import { Act, Scene, Dialogue } from "./BlockItems";
import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { api } from "~/trpc/react";

export default function Editor({
  initialContent,
}: {
  initialContent: PartialBlock[];
}) {
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      act: Act,
      scene: Scene,
      dialogue: Dialogue,
    },
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
    },
    styleSpecs: {
      ...defaultStyleSpecs,
    },
  });

  const editor = useCreateBlockNote({ schema, initialContent: initialContent });
  const save = api.editor.save.useMutation();

  const insertAct = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Act",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "act",
      });
    },

    group: "Elements",
    icon: <DocumentTextIcon className="size-5" />,
    subtext:
      "Organize your play into major acts, each marking a new phase of the story",
  });

  const insertScene = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Scene",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "scene",
      });
    },

    group: "Elements",
    icon: <Square2StackIcon className="size-5" />,
    subtext:
      "Break down acts into individual scenes with settings and key details",
  });

  const insertDialogue = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Dialogue",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "dialogue",
      });
    },

    group: "Elements",
    icon: <ChatBubbleLeftEllipsisIcon className="size-5" />,
    subtext:
      "Add dialogue for selected characters, with options to emphasize key moments",
  });

  return (
    <>
      <BlockNoteView
        onFocus={() => console.log(editor.document)}
        editor={editor}
        slashMenu={false}
        theme={"dark"}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(
              [insertAct(editor), insertScene(editor), insertDialogue(editor)],
              query,
            )
          }
        />
      </BlockNoteView>
      <div className="flex justify-center">
        <button
          onClick={() => save.mutate({ jsonBlocks: editor.document })}
          className="btn rounded-md"
        >
          Save Content
        </button>
      </div>
    </>
  );
}
