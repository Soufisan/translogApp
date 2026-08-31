import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Pool para comunicarnos con la base de datos
export const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
})

//Función que que hace peticiones a la base de datos a través de la pool
const executeQuery = async (sql, values=[]) =>{
    let connection
    try {
        connection = await dbPool.getConnection();
        const [result] = await connection.query(sql, values);
        return result;
    } catch (error) {
        console.log("error en la consulta", error);
        throw error;
    } finally {
        if(connection){
            connection.release();
        }
    }
}


export default executeQuery;