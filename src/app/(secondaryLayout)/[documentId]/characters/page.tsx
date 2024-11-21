import ClientPage from "./ClientPage";
import { trpc } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: { documentId: string };
}) {
  const characters = await trpc.character.getAll({ playId: params.documentId });
  return <ClientPage documentId={params.documentId} characters={characters} />;
}
