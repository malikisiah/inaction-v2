import ClientPage from "./ClientPage";
import type { PartialBlock } from "@blocknote/core";
import ErrorPage from "~/components/ErrorPage";
import { db } from "~/server/db";
export default async function Home({
  params,
}: {
  params: { documentId: string };
}) {
  const data = await db.play.findUnique({
    where: {
      id: params.documentId,
    },
  });

  if (data) {
    const initialContent = data.content as PartialBlock[];
    return (
      <ClientPage
        initialContent={initialContent}
        documentId={params.documentId}
      />
    );
  } else {
    return <ErrorPage />;
  }
}