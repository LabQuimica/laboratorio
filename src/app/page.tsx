import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex h-full">
      <div className="w-1/2 h-full">
        <h1 className="uppercase">¡Bienvenid@ de nuevo!</h1>
        <p>Estamos Felices Por Tenerte Aquí</p>
        <Link href="/login">
          <button>Iniciar Sesión</button>
        </Link>
      </div>

      <div className="w-1/2 h-full">
        <p>Imagen</p>
      </div>
    </div>
  );
}
