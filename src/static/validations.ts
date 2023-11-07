import moment from 'moment';

export function validateLuhn(numero: string): boolean {

    const numeroLimpio = numero.trim();
    if (!/^\d{13,16}$/.test(numeroLimpio)) {
      return false;
    }
    
      const digitos = numero.split('').map((d) => parseInt(d, 10));
    
      for (let i = digitos.length - 2; i >= 0; i -= 2) {
        digitos[i] *= 2;
        if (digitos[i] > 9) {
          digitos[i] -= 9;
        }
      }
    
      const suma = digitos.reduce((total, d) => total + d, 0);
    
      return suma % 10 === 0;

  }
export function validateEmail(email: string): boolean {
    const emailLimpio = email.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]{5,100}@(gmail\.com|hotmail\.com|yahoo\.es)$/i;

    return emailRegex.test(emailLimpio);

  }

  export function validateCvv(cvv: string): boolean {
    const numeroLimpio = cvv.trim();
    if (!/^\d{3,4}$/.test(numeroLimpio)) {
      return false;
    }
     return true
  }
  
  export function validateExpirationMonth(expiration_month: string): boolean {
      const numeroLimpio = parseInt(expiration_month);
      
      return (!isNaN(numeroLimpio) && numeroLimpio >= 1 && numeroLimpio <= 12)
    }

  export function validateExpirationYear(expiration_year: string): boolean {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 5;
    const parsedNumber = parseInt(expiration_year);
    
    return (!isNaN(parsedNumber) && parsedNumber >= currentYear && parsedNumber <= maxYear) 
  }
  
  export function createUniqueToken(): string {
    const usedTokens: Set<string> = new Set();
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

        return usedTokens.has(token) ? createUniqueToken() : token;
      
  }

  export function validateTokenLenght(token: string): boolean {
    const tokenLimpio = token.replace(/\s/g, '').replace(/-/g, '');
    if (typeof tokenLimpio !== 'string') {
        return false;
      }

      const data = tokenLimpio.length === 16;
      return data;
  }

export function validate15MinutesToken(value: string): boolean {
  const dateDB = moment(value, 'DD/MM/YYYY, HH:mm:ss');
  const ActualDate = moment(new Date().toLocaleString(), 'DD/MM/YYYY, HH:mm:ss');

  const diffMinutes = ActualDate.diff(dateDB, 'minutes');

  return diffMinutes > 2;
}
