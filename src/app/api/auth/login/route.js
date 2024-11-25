import db from '@/lib/db';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length > 0) {
      // Usuario encontrado
      return new Response(JSON.stringify({ success: true, user: rows[0] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Usuario no encontrado
      return new Response(JSON.stringify({ success: false, message: 'Credenciales incorrectas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    // Error del servidor
    return new Response(JSON.stringify({ success: false, message: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
