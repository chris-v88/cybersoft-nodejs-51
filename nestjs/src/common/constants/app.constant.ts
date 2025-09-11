import 'dotenv/config';

export const PORT = process.env.PORT;

export const MOBILE_VISIBLE_DESKTOP_HIDDEN = `mantine-hidden-from-md`;
export const MOBILE_HIDDEN_DESKTOP_VISIBLE = `mantine-visible-from-md`;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;

export const ACCESS_REFRESH_SECRET = process.env.ACCESS_REFRESH_SECRET;
export const ACCESS_REFRESH_EXPIRES_IN = process.env.ACCESS_REFRESH_EXPIRES_IN;

export const NEXT_LOCALE = 'NEXT_LOCALE';
export const COLOR_KEYS = 'user-color-theme';

export const NEXT_PUBLIC_BASE_DOMAIN =
  process.env.NEXT_PUBLIC_BASE_DOMAIN || 'http://localhost:3069/';
export const NEXT_PUBLIC_BASE_DOMAIN_API = `${NEXT_PUBLIC_BASE_DOMAIN}api/`;

export const NEXT_PUBLIC_GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY =
  process.env.NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY;
export const FOLDER_IMAGE_BE = `public/images/`;

export const TITLE = `Cyber Community`;
export const LOGO = `/images/logo/logo-512x512.png`;

export const USER_ADMIN = `685a841653144894fc7cef97`;

// Log all constants in order
console.log('PORT:', PORT);
console.log('MOBILE_VISIBLE_DESKTOP_HIDDEN:', MOBILE_VISIBLE_DESKTOP_HIDDEN);
console.log('MOBILE_HIDDEN_DESKTOP_VISIBLE:', MOBILE_HIDDEN_DESKTOP_VISIBLE);
console.log('NEXT_LOCALE:', NEXT_LOCALE);
console.log('COLOR_KEYS:', COLOR_KEYS);
console.log('NEXT_PUBLIC_BASE_DOMAIN:', NEXT_PUBLIC_BASE_DOMAIN);
console.log('NEXT_PUBLIC_BASE_DOMAIN_API:', NEXT_PUBLIC_BASE_DOMAIN_API);
console.log('NEXT_PUBLIC_GOOGLE_CLIENT_ID:', NEXT_PUBLIC_GOOGLE_CLIENT_ID);
console.log(
  'NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY:',
  NEXT_PUBLIC_BASE_DOMAIN_CLOUDINARY,
);
console.log('FOLDER_IMAGE_BE:', FOLDER_IMAGE_BE);
console.log('TITLE:', TITLE);
console.log('LOGO:', LOGO);
console.log('USER_ADMIN:', USER_ADMIN);
