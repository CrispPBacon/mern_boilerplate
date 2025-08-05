import express from "express";
import upload from "../config/multer.js";
import { handleFileUpload } from "../controller/upload.controller.js";

const router = express.Router();

router
  .route("/")
  .get((_, res) => {
    const routes = ["FILE UPLOAD ROUTES"];
    return res.status(200).json({ routes });
  })
  .post(upload.single("file"), handleFileUpload);

export default router;
