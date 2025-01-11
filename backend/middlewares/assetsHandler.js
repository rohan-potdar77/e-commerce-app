import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsHandler = express.static(path.join(__dirname, 'assets'));

export default assetsHandler;
