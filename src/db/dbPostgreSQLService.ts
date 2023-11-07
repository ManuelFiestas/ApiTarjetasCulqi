import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

const client = new Client({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

async function insertPostGreData(data: any) {
  const insertQuery = `
    INSERT INTO culqi (card_number, cvv, expiration_month, expiration_year, email, token)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  try {
    await client.connect();
    const result = await client.query(insertQuery, Object.values(data));
    if (result.rowCount === 1) {
      console.log('Los datos se insertaron correctamente en la bd.');
    } else {
      console.log('No se pudo insertar el dato.');
    }
    await client.end()
  } catch (error) {
    console.error('Error al insertar los datos:', error);
  }
}

async function getPostgreCardData(data: any) {
  const selectQuery = `
      SELECT * FROM culqi
      WHERE token = $1;
    `;

  try {
    await client.connect();
    const result = await client.query(selectQuery, [data]);
    if (result.rowCount === 1) {
      return result.rows[0];
    } else {
      console.log('No se encontró una fila con el token proporcionado')
    }
    await client.end()
  } catch (error) {
    console.error('Error al insertar los datos:', error);
  }
}

export { connectDB, insertPostGreData, getPostgreCardData };