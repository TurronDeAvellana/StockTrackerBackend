const express = require('express');
const { Client } = require('pg');

// Configuración de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de PostgreSQL
const client = new Client({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'midb',
  port: 5432,
});

// Conectar a PostgreSQL
client.connect()
  .then(() => console.log('Conectado a PostgreSQL desde Docker'))
  .catch(err => console.error('Error de conexión:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    status: 'API funcionando',
    database: 'Conectado a PostgreSQL'
  });
});

// Ejemplo de ruta que consulta la base de datos
app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users'); // Ajusta el nombre de tu tabla
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});