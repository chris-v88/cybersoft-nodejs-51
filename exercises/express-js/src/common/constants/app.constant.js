import dotenv from 'dotenv/config';

// console.log(process);

// export const DATABASE_URL =
//   'mysql://root:1234@localhost:3307/db_cyber_community';

export const DATABASE_URL = process.env.DATABASE_URL;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;

export const ACCESS_REFRESH_SECRET = process.env.ACCESS_REFRESH_SECRET;
export const ACCESS_REFRESH_EXPIRES_IN = process.env.ACCESS_REFRESH_EXPIRES_IN;

console.log('DATABASE_URL:', DATABASE_URL);
console.log('ACCESS_TOKEN_SECRET:', ACCESS_TOKEN_SECRET);
console.log('ACCESS_TOKEN_EXPIRES_IN:', ACCESS_TOKEN_EXPIRES_IN);
console.log('ACCESS_REFRESH_SECRET:', ACCESS_REFRESH_SECRET);
console.log('ACCESS_REFRESH_EXPIRES_IN:', ACCESS_REFRESH_EXPIRES_IN);