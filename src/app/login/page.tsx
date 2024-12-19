'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Inicio de sesión exitoso');
        localStorage.setItem('token', data.token.token); // Guarda el token para autenticación
        window.location.href = '/dashboard'; // Redirige al usuario al dashboard
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className='w-full h-dvh flex pl-10 align-middle justify-center items-center bg-light-bg dark:bg-dark-bg dark:text-white'>
      {/* Botón de toggle para modo oscuro */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 z-50 p-2 bg-blue-400 dark:bg-blue-500 rounded"
      >
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      {/* Primera mitad: mensaje y credenciales */}
      <div className='w-1/2'>
        {/* Mensaje */}
        <div className='align-middle justify-center'>
          <h1 className="uppercase font-bold text-4xl text-center">¡Bienvenid@ de nuevo!</h1>
          <p className='font-semibold text-2xl text-center'>Estamos Felices Por Tenerte Aquí</p>
        </div>
        {/* Credeciales */}
        <div className='flex pt-16 w-full justify-center align-middle items-center'>
          <form onSubmit={handleSubmit} className='w-3/4 align-middle justify-center'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div className='w-full inline-grid'>
              <label className='text-sm'>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='bg-[#CCD4DE] rounded-3xl h-10 w-full pl-4 mt-2 placeholder:text-gray-600'
              />
            </div>
            <div className='w-full inline-grid mt-5'>
              <label className='text-sm'>Contraseña:</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='bg-[#CCD4DE] rounded-3xl h-10 w-full pl-4 mt-2 placeholder:text-gray-600'
              />
              <p className='text-sm w-full text-right mt-4'>¿Olvidaste Tu Contraseña?</p>
            </div>
            <div className='w-full flex align-middle items-center justify-center'>
              <button type="submit" className='bg-[#3E53A0] mt-10 rounded-3xl w-1/2 self-center'>
                <p className='text-center font-semibold text-lg'>Iniciar Sesión</p>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Segunda mitad: imagen */}
      <div className='flex w-1/2 items-center justify-center align-middle'>
        <Image 
          src={`/assets/${'logo.png'}`}
          alt={'logo'}
          className='h-96 w-96'
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}