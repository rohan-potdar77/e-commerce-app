import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { mkdirSync, existsSync } from 'fs';

const storage = diskStorage({
    destination: function (req, file, cb) {
        const fileType = file.mimetype.split('/')[0];
        let folder = 'assets/';

        switch (fileType) {
            case 'image':
                folder += 'images/';
                break;
            case 'video':
                folder += 'videos/';
                break;
            default:
                folder += 'others/';
                break;
        }

        if (!existsSync(folder)) {
            mkdirSync(folder, { recursive: true });
        }

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.mimetype.split('/')[0] +
                '-' +
                uniqueSuffix +
                extname(file.originalname)
        );
    },
});

const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/mkv',
];

const fileHandler = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb('Invalid file, type image/video only allowed.', false);
        }
    },
    limits: { fileSize: 15 * 1024 * 1024 },
});

export default fileHandler;
