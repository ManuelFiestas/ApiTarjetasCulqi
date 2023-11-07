Serverless nodejs typescript lambda proyecto para Tokenizacion de tarjetas

* Pasos para deployar en local:

    - npm install
    - npm run dev
    - npm run test

    Luego probar con postman el metodo post usando un body como el siguiente:

        {
        "card_number": "1234567890123700",
        "cvv": "1278",
        "expiration_month": "12",
        "expiration_year": "2028",
        "email": "usuario@yahoo.es"
        }

        SI pasa las validaciones debe retornar el token.
    
    El metodo get recibe un token, primero valida si el token ya tiene 15 minutos y devuelve los datos de la tarjeta sin el cvv
    debe agregar el token en Authorization type Bearer

* Pasos para deployar en produccion

    npm run deploy
    Este comando subira los cambios locales a AWS lambda, ojo que se deben ingresar las credenciales de AWS para que funcione





