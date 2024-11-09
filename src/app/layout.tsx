import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Inaction",
  description: "Playwriting for the 21st Century",
  icons: [{ rel: "icon", url: "/logo_transparent.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="black"
      className={`${GeistSans.variable} h-full bg-[#1f1f1f]`}
    >
      <body className="h-full">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
