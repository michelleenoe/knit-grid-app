import type { PropsWithChildren } from "react";
import { BottomNav } from "./BottomNav";
import "./PageShell.css";

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="page-shell">
      <main className="page-shell__content">{children}</main>
      <BottomNav />
    </div>
  );
}