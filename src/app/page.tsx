import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido al Inventario del Laboratorio</h1>
      <p>Comienza gestionando tus materiales y prácticas.</p>
      <Link href="/login">
        <button style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </Link>
    </div>
  );
}
