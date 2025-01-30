import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import configuration from './configuration.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import setCorsPolicy from './middlewares/setCorsPolicy.js';
import apiRouter from './routes/api.js';

const app = express();
const { databaseUrl, cookieSecret, clientUrls, port } = configuration;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose
    .connect(databaseUrl)
    .then(() => console.info('✅ Database connected!'))
    .catch(error => console.error(`⚠️  ${error.message}`));

app.use(cookieParser(cookieSecret));
app.use(cors(setCorsPolicy(clientUrls)));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use(notFound);
app.use(errorHandler);

process.on('SIGINT', async () => {
    console.info('⚠️  Disconnecting database...!\n⚠️  Terminating process...!');
    await mongoose.connection.close();
    process.exit(0);
});

app.listen(port, () => console.info('✅ Server running on port:', port));
