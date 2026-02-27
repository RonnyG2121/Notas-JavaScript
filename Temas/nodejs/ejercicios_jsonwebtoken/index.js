const express = require('express');
const jwt = require('jsonwebtoken'); // Importamos el paquete JWT
const app = express();
const port = 3000;

// Clave secreta para firmar los tokens (puedes usar una clave más segura en producción)
const secretKey = 'miClaveSecreta';

// Ruta para generar un token
app.get('/login', (req, res) => {
  // Información de ejemplo para el token
  const payload = { username: 'usuarioEjemplo', role: 'admin' };

  // Generamos el token
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // El token expira en 1 hora

  res.json({ token });
});

// Ruta protegida que requiere un token válido
app.get('/protected', (req, res) => {
  const token = req.headers['authorization']; // Obtenemos el token de los encabezados

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Verificamos el token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Si el token es válido, respondemos con el contenido protegido
    res.json({ message: 'Acceso concedido', data: decoded });
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola mundo!');
});

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor escucha en http://localhost:${port}`);
});
