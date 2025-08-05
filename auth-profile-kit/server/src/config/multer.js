import multer from "multer";
import path from "path";
import fs from "fs";
import { __dirname } from "../utils/general-utils.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      String(req.session.user_id)
    );

    // ? Ensure the directory exists, create it if it doesn't //
    fs.promises
      .mkdir(destination, { recursive: true })
      .then(() => cb(null, destination))
      .catch((err) => cb(err));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = uniqueSuffix + ext;
    cb(null, filename);
    console.log("Uploading file:", file.originalname, "as", filename);
  },
});

// TODO: Standardize the file size limit across the application //
// TODO: Accept images with many file types (jpg, jpeg, png, gif, webp) and store a standardized file type //

// ? Set a maximum file size of 32MB //
const fileMaxSize = 32 * 1024 * 1024;

const upload = multer({
  storage: storage,
  limits: { fileSize: fileMaxSize },
});

export default upload;
