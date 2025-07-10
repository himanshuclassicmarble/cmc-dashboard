import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading entire page...</div>}>{children}</Suspense>
  );
}
