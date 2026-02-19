"use client";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Web3Provider = dynamic(
  () =>
    import("@/app/providers/Web3Provider").then((m) => ({
      default: m.Web3Provider,
    })),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
