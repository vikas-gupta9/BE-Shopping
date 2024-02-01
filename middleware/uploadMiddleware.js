import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = "C:/Users/vikas_gupta9/Desktop/BE app/Shopping-FE/src/assets/";
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const validateFileAndUpload = (req, res, next) => {
  upload.array("images", 2)(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "More than 2 files are uploaded" });
    }

    if (!req.files) {
      return res.status(400).json({ message: "files are required" });
    }

    const files = req.files;
    console.log(files)
    const errors = [];
    files.forEach((file) => {
      const allowedType = ["image/png", "image/jpg", "image/jpeg"];
      const maxSize = 1 * 1024 * 1024; //1MB

      if (!allowedType.includes(file.mimetype)) {
        errors.push(`File type invalid ${file.originalname}`);
      }
      if (file.size > maxSize) {
        errors.push(`File too large ${file.originalname}`);
      }
    });
    if (errors.length > 0) {
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
      return res.status(400).json(errors);
    }
    req.files = files;
    next();
  });
};

export default validateFileAndUpload;
