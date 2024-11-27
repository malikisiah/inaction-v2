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

  const [cast, setCast] = useState(data);
  const createCharacter = trpc.character.create.useMutation({
    onSuccess: async () => {
      setLoading(false);

      const { data } = await refetch();
      if (data) {
        setCast(data);
      }
    },
  });

  const updateCharacter = trpc.character.update.useMutation();
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
                {cast.map((character) => (
                  <li key={character.name}>
                    {character.image ? (
                      <div className="relative mx-auto size-56">
                        <Image
                          alt=""
                          fill
                          src={character.image}
                          className="rounded-full"
                        />
                      </div>
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
                                    onChange={(e) => {
                                      setImageURL(e.target.value);
                                    }}
                                    placeholder="Image URL"
                                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                  />
                                </div>
                                <CloseButton
                                  onClick={() => {
                                    setCast((prev) =>
                                      prev.map((item) =>
                                        character.id === item.id
                                          ? { ...item, image: imageURL }
                                          : item,
                                      ),
                                    );

                                    updateCharacter.mutate({
                                      characterId: character.id,
                                      field: "image",
                                      value: imageURL,
                                    });
                                  }}
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

                    <div className="mt-5 flex-col -space-y-5">
                      <textarea
                        onBlur={(e) => {
                          setCast((prev) =>
                            prev.map((item) =>
                              character.id === item.id
                                ? { ...item, name: e.target.value }
                                : item,
                            ),
                          );

                          updateCharacter.mutate({
                            characterId: character.id,
                            field: "name",
                            value: e.target.value,
                          });
                        }}
                        rows={1}
                        className="focus resize-none border-none bg-transparent text-center text-base/7 font-semibold tracking-tight text-gray-900 outline-none focus:ring-0"
                      >
                        {character.name}
                      </textarea>
                      <textarea
                        onBlur={(e) => {
                          setCast((prev) =>
                            prev.map((item) =>
                              character.id === item.id
                                ? { ...item, description: e.target.value }
                                : item,
                            ),
                          );

                          updateCharacter.mutate({
                            characterId: character.id,
                            field: "description",
                            value: e.target.value,
                          });
                        }}
                        rows={1}
                        className="focus resize-none border-none bg-transparent text-center text-sm/6 font-semibold tracking-tight text-gray-600 outline-none focus:ring-0"
                      >
                        {character.description
                          ? character.description
                          : "Add a description"}
                      </textarea>
                    </div>
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
