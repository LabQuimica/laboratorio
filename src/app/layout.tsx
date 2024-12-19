import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light">
      <head>
        <title>Laboratorio de química</title>
      </head>
      <body className="bg-light-bg dark:bg-dark-bgx">
        <main className="h-full">{children}</main>
        
      </body>
    </html>
  );
}
