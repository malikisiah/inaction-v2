"use client";
import { DocumentIcon, PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CreatePlayModal from "~/components/CreatePlayModal";
import type { Play } from "@prisma/client";
import { trpc } from "~/trpc/react";
import avatar from "public/logo_transparent.png";

export default function ClientPage({ plays }: { plays: Play[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data, refetch } = trpc.play.getAll.useQuery(undefined, {
    initialData: plays,
  });
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                My Plays
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center">
                <button onClick={() => setOpen((prev) => !prev)}>
                  <PlusIcon className="size-10 text-primary" />
                </button>
              </div>

              <ul
                role="list"
                className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {data.map((play) => (
                  <li
                    key={play.id}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  >
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-sm font-medium text-gray-900">
                            {play.title}
                          </h3>
                          <span className="inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20">
                            Author
                          </span>
                        </div>
                        <p className="mt-1 truncate text-sm text-gray-500">
                          Malik Teague
                        </p>
                      </div>
                      <Image
                        alt=""
                        width={500}
                        height={500}
                        src={avatar}
                        className="shirnk-0 size-10 rounded-full"
                      />
                    </div>
                    <div>
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                          <Link
                            href={`/${play.id}/editor`}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                          >
                            <DocumentIcon
                              aria-hidden="true"
                              className="size-5 text-gray-400"
                            />
                            Edit
                          </Link>
                        </div>
                        {/* <div className="-ml-px flex w-0 flex-1">
                          <a
                            href={`tel:${play.title}`}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                          >
                            <PhoneIcon
                              aria-hidden="true"
                              className="size-5 text-gray-400"
                            />
                            Call
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </li>
                ))}
                {loading ? (
                  <li className="skeleton col-span-1 divide-y divide-gray-200 rounded-lg shadow"></li>
                ) : null}
              </ul>
            </div>
          </main>
        </div>
      </div>
      <CreatePlayModal
        open={open}
        setOpen={setOpen}
        setLoading={setLoading}
        refetch={refetch}
      />
    </>
  );
}
