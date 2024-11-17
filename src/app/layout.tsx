import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "~/components/NavBar";

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
      data-theme="light"
      className={`${GeistSans.variable} h-full bg-base-100`}
    >
      <body className="h-full">
        <TRPCReactProvider>
          <NavBar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
