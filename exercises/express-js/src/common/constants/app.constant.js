import dotenv from 'dotenv/config';

// console.log(process);

// export const DATABASE_URL =
//   'mysql://root:1234@localhost:3307/db_cyber_community';

export const DATABASE_URL = process.env.DATABASE_URL;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

console.log('DATABASE_URL:', DATABASE_URL);
