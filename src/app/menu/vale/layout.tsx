import ValeNavigation from "@/components/layouts/vales/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ValeNavigation />
      {children}
    </>
  );
}

export default Layout;
