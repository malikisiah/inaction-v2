import type { PartialBlock } from "@blocknote/core";
import ClientPage from "./ClientPage";

export default async function Home() {
  const initialContent: PartialBlock[] = [
    {
      type: "paragraph",
      content: "Hello World!",
    },
  ];
  return <ClientPage initialContent={initialContent} />;
}
