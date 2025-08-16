import dotenv from 'dotenv/config';

// console.log(process);

// export const DATABASE_URL =
//   'mysql://root:1234@localhost:3307/db_cyber_community';

export const DATABASE_URL = process.env.DATABASE_URL;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;

export const ACCESS_REFRESH_SECRET = process.env.ACCESS_REFRESH_SECRET;
export const ACCESS_REFRESH_EXPIRES_IN = process.env.ACCESS_REFRESH_EXPIRES_IN;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CLIENT_URI_CALLBACK = process.env.GOOGLE_CLIENT_URI_CALLBACK;

console.log('DATABASE_URL:', DATABASE_URL);
console.log('ACCESS_TOKEN_SECRET:', ACCESS_TOKEN_SECRET);
console.log('ACCESS_TOKEN_EXPIRES_IN:', ACCESS_TOKEN_EXPIRES_IN);
console.log('ACCESS_REFRESH_SECRET:', ACCESS_REFRESH_SECRET);
console.log('ACCESS_REFRESH_EXPIRES_IN:', ACCESS_REFRESH_EXPIRES_IN);
console.log('GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_CLIENT_URI_CALLBACK:', GOOGLE_CLIENT_URI_CALLBACK);