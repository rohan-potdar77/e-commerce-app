import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVars = [
  'PORT',
  'DATABASE_URL',
  'CLIENT_URLS',
  'COOKIE_SECRET',
  'PROD_ENV',
  'SECRET',
  'SALT',
  'EXPIRES_IN',
];

const configuration = {
  port: Number(process.env.PORT),
  databaseUrl: process.env.DATABASE_URL,
  clientUrls: process.env.CLIENT_URLS,
  cookieSecret: process.env.COOKIE_SECRET,
  prodEnv: process.env.PROD_ENV,
  secret: process.env.SECRET,
  salt: process.env.SALT,
  expiresIn: Number(process.env.EXPIRES_IN),
};

const missingEnvVariables = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVariables.length) {
  console.warn(
    `⚠️  Warning: The following environment variables are missing: [ ${missingEnvVariables.join(
      ', '
    )} ]!`
  );
  console.warn(
    '⚠️  Proceeding with missing environment variables may cause unexpected behavior!'
  );
} else {
  console.info('✅ Environment variables loaded successfully!');
}

export default configuration;
