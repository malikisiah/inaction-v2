import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import SideBar from "~/components/SideBar";

export const metadata: Metadata = {
  title: "Inaction",
  description: "Playwriting for the 21st Century",
  icons: [{ rel: "icon", url: "/logo_transparent.png" }],
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="nord"
      className={`${GeistSans.variable} h-full bg-white`}
    >
      <body className="h-full">
        <TRPCReactProvider>
          <SideBar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
