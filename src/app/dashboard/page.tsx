'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Importación corregida

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setError('No estás autenticado.');
        setTimeout(() => {
          window.location.href = '/login'; // Redirige a la pantalla de login después de 1 segundos
        }, 1000);
        return;
      }

      try {
        // Decodifica el token para obtener el ID del usuario
        const decoded = jwtDecode(token); // Usar `jwtDecode` en lugar de `decode`
        const userId = decoded.id;

        // Solicita la información del usuario desde el servidor
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Envía el token en el encabezado
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Guarda los datos del usuario
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error al obtener datos del usuario.');
        }
      } catch (err) {
        setError('No se pudo conectar con el servidor.');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token'); // Elimina el token de las cookies
    window.location.href = '/login'; // Redirige al login
  };

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {user ? (
        <>
          <h1>Bienvenido, {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Rol: {user.rol}</p>
          <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Cerrar Sesión
          </button>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
}