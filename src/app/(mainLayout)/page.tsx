import { trpc } from "~/trpc/server";
import ClientPage from "./ClientPage";

export default async function Page() {
  const plays = await trpc.play.getAll();

  return <ClientPage plays={plays} />;
}
