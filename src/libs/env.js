import dotenv from 'dotenv';
import { access } from 'fs/promises';

if (process.env.NODE_ENV !== 'production') {
  const isLocalEnvExists = await access('.env.local')
    .then(() => true)
    .catch(() => false);

  const envPath = `.env.${isLocalEnvExists ? 'local' : 'development'}`;

  // eslint-disable-next-line no-console
  console.info(`Loading environment variables from ${envPath}`);

  dotenv.config({
    path: envPath
  });
}

export const HOST_PORT = process.env.PORT ?? process.env.HOST_PORT;

export const {
  DB_HOST,
  JWT_SECRET,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET
} = /** @type {Record<string, string>} */ (process.env);
