"use client";
import "@blocknote/core/fonts/inter.css";
import {
  type DefaultReactSuggestionItem,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { locales } from "@blocknote/core";
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

import { Act, Scene, Dialogue, Title } from "./BlockItems";
import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { trpc } from "~/trpc/react";
import { Mention } from "./Mention";
import type { Character } from "@prisma/client";

export default function Editor({
  initialContent,
  documentId,
  characters,
}: {
  initialContent: PartialBlock[];
  documentId: string;
  characters: Character[];
}) {
  const getMentionMenuItems = (
    editor: typeof schema.BlockNoteEditor,
  ): DefaultReactSuggestionItem[] => {
    const users = characters.map((item) => item.name);

    return users.map((user) => ({
      title: user,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: "mention",
            props: {
              user,
            },
          },
          " ", // add a space after the mention
        ]);
      },
    }));
  };

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      act: Act,
      scene: Scene,
      dialogue: Dialogue,
      title: Title,
    },
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
      mention: Mention,
    },
    styleSpecs: {
      ...defaultStyleSpecs,
    },
  });

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent,
    dictionary: {
      ...locales.en,
      placeholders: {
        ...locales.en.placeholders,

        default: "Write something, or press '/' for commands",
      },
    },
  });

  const update = trpc.play.update.useMutation();

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
        onBlur={() =>
          update.mutate({ jsonBlocks: editor.document, playId: documentId })
        }
        editor={editor}
        slashMenu={false}
        theme={"light"}
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
        <SuggestionMenuController
          triggerCharacter={"@"}
          getItems={async (query) =>
            // Gets the mentions menu items
            filterSuggestionItems(getMentionMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </>
  );
}
