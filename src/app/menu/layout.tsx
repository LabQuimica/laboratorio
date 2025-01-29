import Navigation from "@/components/navigation/navigation";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Navigation children={children} />;
}

export default Layout;