import { APIGatewayProxyEvent } from 'aws-lambda';
import { insertPostGreData } from '../db/dbPostgreSQLService';
import { insertMongoData } from '../db/dbMongoService';
const { 
        validateLuhn, validateCvv, validateExpirationMonth, validateExpirationYear, validateEmail, createUniqueToken 
      } = require('../static/validations');

export const handler = async (event : APIGatewayProxyEvent) => {
  const requestBody = JSON.parse(event.body || '{}');
  return MyLambdaFunction(requestBody)
}

function MyLambdaFunction (requestBody) {
	try {
    const { card_number, cvv, expiration_month, expiration_year, email } = requestBody;

    if (!card_number || !cvv || !expiration_month || !expiration_year || !email) {
      throw new Error('Faltan parámetros requeridos');
      }
    if (!validateLuhn(card_number)) {
      throw new Error('Número de tarjeta no válido');
      }

    if (!validateCvv(cvv)) {
      throw new Error('Cvv no válido');
      }

    if (!validateExpirationMonth(expiration_month)) {
      throw new Error('Mes de expiración no válido');
      }

    if (!validateExpirationYear(expiration_year)) {
      throw new Error('Año de expiración no válido');
      }

    if (!validateEmail(email)) {
      throw new Error('El email ingresado no es válido');
      }
    // const db = connectToDatabase(); 
    //insertPostGreData(dataToSave)
    const token = createUniqueToken();
    const dataToSave = { ...requestBody, token };
    insertMongoData(dataToSave)

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}