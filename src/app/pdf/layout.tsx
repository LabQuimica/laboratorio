"use client";

import ProtectedRoute from "@/providers/ProtectedRoute";

function Layout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default Layout;
