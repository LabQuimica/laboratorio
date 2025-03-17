import ValeNavigation from "@/components/layouts/vales/naviation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ValeNavigation />
      {children}
    </>
  );
}

export default Layout;
