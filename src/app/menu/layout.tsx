// import Navigation from "@/components/layouts/navigation/navigation";

// function Layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return <Navigation children={children} />;
// }

// export default Layout;

"use client";

import ProtectedRoute from "@/providers/ProtectedRoute";
import Navigation from "@/components/layouts/navigation/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Navigation>{children}</Navigation>
    </ProtectedRoute>
  );
}

export default Layout;

