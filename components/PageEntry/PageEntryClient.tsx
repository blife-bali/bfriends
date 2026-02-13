"use client";

import dynamic from "next/dynamic";

const PageEntry = dynamic(
  () => import("./PageEntry").then((m) => m.default),
  { ssr: false }
);

export default function PageEntryClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageEntry>{children}</PageEntry>;
}
