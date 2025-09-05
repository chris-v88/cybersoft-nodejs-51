import * as Joi from "joi";

export const envValidation = Joi.object({
  DATABASE_URL: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  ACCESS_REFRESH_SECRET: Joi.string().required(),
  ACCESS_REFRESH_EXPIRES_IN: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CLIENT_URI_CALLBACK: Joi.string().required(),
  GMAIL_USER: Joi.string().required(),
  GMAIL_PASS: Joi.string().required(),
  CLOUDINARY_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
});