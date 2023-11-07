import { APIGatewayProxyEvent } from 'aws-lambda';
const { validateTokenLenght, validate15MinutesToken } = require('../static/validations');
import { getPostgreCardData } from '../db/dbPostgreSQLService';
import { getMongoDBCardData } from '../db/dbMongoService';

export const handler = async (event : APIGatewayProxyEvent) => {
  try {
    const authorizationHeader = event.headers.Authorization || event.headers.authorization;
    const tokenValue = authorizationHeader ? authorizationHeader.split(' ')[1] : ''
    if (!authorizationHeader) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Token no proporcionado" }),
        };
      }
    
    if (!validateTokenLenght(tokenValue)) {
        throw new Error('El token ingresado no tiene 16 dígitos');
      }
      // const cardData = await getPostgreCardData(tokenValue)
      const cardData = await getMongoDBCardData(tokenValue)
      const fechaDB = cardData?.createdAt
      if (validate15MinutesToken(fechaDB)) {
        throw new Error('El token ingresado ya expiró');
      }
      if(cardData){
        const { cvv , token, ...newDataTest } = cardData;
        return {
          statusCode: 200,
          body: JSON.stringify( newDataTest )
        }
      }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
