import { BadRequestError } from "../utils/errors.js";
import Asset from "../models/asset.model.js";

export async function handleFileUpload(req, res, next) {
  try {
    if (!req.file) {
      throw new BadRequestError("File not found or file type not allowed.");
    }

    const url = `http://${process.env.HOST || "localhost"}:${
      process.env.PORT || 3000
    }/uploads/${req.session.user_id}/${req.file.filename}`;

    const uploadedBy = req.session.user_id;
    const { originalname, mimetype, filename, path, size } = req.file;
    const data = {
      fileName: filename,
      originalName: originalname,
      mimeType: mimetype,
      path,
      size,
      url,
      uploadedBy,
    };
    const upload_data = new Asset(data);
    await upload_data.save();

    console.log("File uploaded:", req.file, upload_data);
    return res.status(200).send("File uploaded successfully!");
  } catch (error) {
    next(error);
  }
}
x``;
