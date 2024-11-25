export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Inventario del Laboratorio</title>
      </head>
      <body>
        <header style={{ padding: '10px', background: '#eee', textAlign: 'center' }}>
          <h1>Inventario del Laboratorio</h1>
        </header>
        <main>{children}</main>
        <footer style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>&copy; 2024 Laboratorio</p>
        </footer>
      </body>
    </html>
  );
}
