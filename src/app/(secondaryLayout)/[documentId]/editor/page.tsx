import ClientPage from "./ClientPage";
import type { PartialBlock } from "@blocknote/core";
import ErrorPage from "~/components/ErrorPage";
import { db } from "~/server/db";
export default async function Home({
  params,
}: {
  params: { documentId: string };
}) {
  const document = await db.play.findUnique({
    where: {
      id: params.documentId,
    },
  });

  const characters = await db.character.findMany({
    where: {
      playId: params.documentId,
    },
  });

  if (document) {
    const initialContent = document.content as PartialBlock[];
    return (
      <ClientPage
        updatedAt={document.updatedAt}
        initialContent={initialContent}
        documentId={params.documentId}
        characters={characters}
      />
    );
  } else {
    return <ErrorPage />;
  }
}
