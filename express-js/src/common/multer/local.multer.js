import multer from 'multer';
import path from 'path';
import fs from 'fs';

fs.mkdirSync('images/', { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extName);
  },
});

export const uploadLocal = multer({ storage: storage });
// const upload = multer({ storage: storage });
