'use client';

import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirige a la pantalla de inicio de sesión
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Bienvenido</h1>
      <p>Por favor, inicie sesión para continuar.</p>
      <button
        onClick={handleLoginRedirect}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginTop: '20px',
          cursor: 'pointer',
        }}
      >
        Iniciar sesión
      </button>
    </div>
  );
}
