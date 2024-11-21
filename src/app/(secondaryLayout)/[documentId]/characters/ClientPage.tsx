"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { Character } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import CreateCharacterModal from "~/components/CreateCharacterModal";
import { trpc } from "~/trpc/react";

export default function ClientPage({
  characters,
  documentId,
}: {
  characters: Character[];
  documentId: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, refetch } = trpc.character.getAll.useQuery(
    { playId: documentId },
    { initialData: characters },
  );
  return (
    <div>
      <main className="py-10 lg:pl-72">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div>
            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
              <div className="mx-auto max-w-2xl">
                <h2 className="text-34l text-balance font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Your Cast
                </h2>
                <p className="mt-6 text-lg/8 text-gray-600">
                  These are the characters in the play who can be assigned
                  dialogue lines. You can also upload a photo along with a short
                  description for some flair!
                </p>
              </div>
              <div className="my-5">
                <button onClick={() => setOpen(true)}>
                  <PlusIcon className="size-8 text-accent" />
                </button>
              </div>
              <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              >
                {data.map((character) => (
                  <li key={character.name}>
                    <Image
                      width={500}
                      height={500}
                      alt=""
                      src={character.image}
                      className="mx-auto size-56 rounded-full"
                    />
                    <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">
                      {character.name}
                    </h3>
                    <p className="text-sm/6 text-gray-600">
                      {character.description}
                    </p>
                  </li>
                ))}
                {loading ? (
                  <li>
                    <div className="skeleton mx-auto size-56 rounded-full"></div>
                    <h3 className="skeleton mx-auto mt-6 w-fit text-transparent">
                      Longer Skeleton
                    </h3>
                    <p className="skeleton mx-auto mt-1 w-fit text-xs text-transparent">
                      Skeleton
                    </p>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <CreateCharacterModal
        open={open}
        setOpen={setOpen}
        setLoading={setLoading}
        refetch={refetch}
        playId={documentId}
      />
    </div>
  );
}
