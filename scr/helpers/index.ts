import crypto from 'crypto';

const SECRET = 'PRODAPP-REST-API'

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string | undefined, password: string) =>{
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

/**
 * Convierte una fecha en formato "dd-mm-aaaa" a un objeto Date
 * @param fechaStr La fecha en formato "dd-mm-aaaa"
 * @returns Un objeto Date
 */
export const  convertirFecha = (fechaStr: string) => {
    const [dia, mes, año] = fechaStr.split('-').map(Number);
    return new Date(año, mes - 1, dia); // Los meses en JavaScript van de 0 (enero) a 11 (diciembre)
}
