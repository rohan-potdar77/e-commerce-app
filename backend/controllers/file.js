import File from '../models/file.js';
import fs from 'fs';
import service from '../service.js';

const addFiles = async (req, res, next) => {
    try {
        const { resourceId, resourceType } = req.body;

        const files = req.files.map(file => {
            return { ...file, resourceId, resourceType };
        });

        await File.insertMany(files, { ordered: true });

        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

const removeFile = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await File.findByIdAndDelete(id);

        if (result) {
            fs.unlink(result.path, error => error && console.error(error));
            res.status(204).send();
        } else {
            throw service.createError('Bad request: not found!', 400);
        }
    } catch (error) {
        next(error);
    }
};

export default { addFiles, removeFile };
