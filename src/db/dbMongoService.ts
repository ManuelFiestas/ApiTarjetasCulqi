import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let client: MongoClient;
const uri = process.env.MONGODB_URI || '';

const connectToDatabase = async () => {
  if (!client) {
    try {
      client = new MongoClient(uri, {});

      await client.connect();
      console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
      console.error('Error al conectar a la base de datos MongoDB:', error);
      throw error;
    }
  }
  return client.db();
};

const insertMongoData = async (data: any) => {
  const db = await connectToDatabase();
  const collection = db.collection('culqi');
  data.createdAt = new Date().toLocaleString();
  try {
    const result = await collection.insertOne(data);
    if (result.acknowledged) {
      console.log(`Se insertó correctamente 1 documento en la colección.`);
    } else {
      console.log('No se pudo insertar el documento.');
    }
  } catch (error) {
    console.error('Error al insertar el documento:', error);
  }
};

const getMongoDBCardData = async (token: string) => {
  const db = await connectToDatabase();
  const collection = db.collection('culqi');

  try {
    const result = await collection.findOne({ token });
    if (result) {
      return result;
    } else {
      console.log('No se encontró un documento con el token proporcionado');
      return null;
    }
  } catch (error) {
    console.error('Error al consultar los datos:', error);
    return null;
  }
};

const closeDatabaseConnection = () => {
  if (client) {
    client.close();
    console.log('Conexión a la base de datos cerrada');
  }
};

export { connectToDatabase, insertMongoData, closeDatabaseConnection, getMongoDBCardData };