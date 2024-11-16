"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  PencilSquareIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

import { Editor } from "~/components/DynamicEditor";
import type { PartialBlock } from "@blocknote/core";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ClientPage({
  initialContent,
}: {
  initialContent: PartialBlock[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState([
    { name: "Editor", icon: PencilSquareIcon, current: true },
    { name: "Characters", icon: UsersIcon, current: false },
    { name: "Settings", icon: FolderIcon, current: false },
  ]);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <Image
                    width={500}
                    height={500}
                    alt=""
                    src="/logo.png"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <button
                              className={classNames(
                                item.current
                                  ? "bg-gray-50 text-rose-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-rose-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current
                                    ? "text-rose-600"
                                    : "text-gray-400 group-hover:text-rose-600",
                                  "h-6 w-6 shrink-0",
                                )}
                              />
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-black bg-base-200 px-6">
            <nav className="mt-32 flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() =>
                            setNavigation((prev) =>
                              prev.map((nav) =>
                                item.name === nav.name
                                  ? { ...nav, current: true }
                                  : { ...nav, current: false },
                              ),
                            )
                          }
                          className={classNames(
                            item.current
                              ? "bg-primary text-accent-content"
                              : "text-accent-content hover:bg-primary hover:text-accent-content",
                            "group flex w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              item.current
                                ? "text-accent-content"
                                : "text-accent-content group-hover:text-accent-content",
                              "h-6 w-6 shrink-0",
                            )}
                          />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="bg- sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <Image
              alt=""
              width={500}
              height={500}
              src="/logo.png"
              className="h-8 w-8 rounded-full bg-gray-50"
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {navigation.map((item, idx) => {
              if (item.current && item.name === "Editor") {
                return (
                  <div key={idx}>
                    <Editor initialContent={initialContent} />
                  </div>
                );
              }
            })}
          </div>
        </main>
      </div>
    </>
  );
}
