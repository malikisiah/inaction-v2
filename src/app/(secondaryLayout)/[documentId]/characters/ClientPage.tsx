"use client";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { Character } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

import { trpc } from "~/trpc/react";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  CloseButton,
} from "@headlessui/react";
import { UsersIcon } from "@heroicons/react/20/solid";

export default function ClientPage({
  characters,
  documentId,
}: {
  characters: Character[];
  documentId: string;
}) {
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const { data, refetch } = trpc.character.getAll.useQuery(
    { playId: documentId },
    { initialData: characters },
  );
  const createCharacter = trpc.character.create.useMutation({
    onSuccess: async () => {
      setLoading(false);
      await refetch();
    },
  });

  const updateCharacter = trpc.character.update.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
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
                <button
                  onClick={() => {
                    setLoading(true);
                    createCharacter.mutate({ playId: documentId });
                  }}
                >
                  <PlusIcon className="size-8 text-accent" />
                </button>
              </div>
              <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              >
                {data.map((character) => (
                  <li key={character.name}>
                    {character.image ? (
                      <Image
                        width={500}
                        height={500}
                        alt=""
                        src={character.image}
                        className="mx-auto size-56 rounded-full"
                      />
                    ) : (
                      <span className="relative mx-auto flex size-56 items-center justify-center rounded-full bg-gray-200">
                        <Popover as="div" className="relative">
                          <PopoverButton className="inline-flex size-11 items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                            <ArrowUpOnSquareIcon />
                          </PopoverButton>

                          <PopoverPanel
                            transition
                            className="absolute left-1/2 z-10 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Upload Image
                              </label>
                              <div className="mt-2 flex rounded-md shadow-sm">
                                <div className="relative flex grow items-stretch focus-within:z-10">
                                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <UsersIcon
                                      aria-hidden="true"
                                      className="size-5 text-gray-400"
                                    />
                                  </div>
                                  <input
                                    onChange={(e) =>
                                      setImageURL(e.target.value)
                                    }
                                    placeholder="Image URL"
                                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                  />
                                </div>
                                <CloseButton
                                  onClick={() =>
                                    updateCharacter.mutate({
                                      characterId: character.id,
                                      field: "image",
                                      value: imageURL,
                                    })
                                  }
                                  type="button"
                                  className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-secondary px-3 py-2 text-sm font-semibold"
                                >
                                  Upload
                                </CloseButton>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      </span>
                    )}

                    <textarea
                      onBlur={(e) =>
                        updateCharacter.mutate({
                          characterId: character.id,
                          field: "name",
                          value: e.target.value,
                        })
                      }
                      rows={1}
                      className="focus mt-6 resize-none border-none bg-transparent text-center text-base/7 font-semibold tracking-tight text-gray-900 outline-none focus:ring-0"
                    >
                      {character.name}
                    </textarea>
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
    </div>
  );
}
