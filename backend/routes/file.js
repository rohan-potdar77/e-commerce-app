import express from 'express';
import file from '../controllers/file.js';
import fileHandler from '../middlewares/fileHandler.js';

const fileRouter = express.Router();

fileRouter.post('/', fileHandler.any(), file.addFiles);

fileRouter.delete('/:id', file.removeFile);

export default fileRouter;
