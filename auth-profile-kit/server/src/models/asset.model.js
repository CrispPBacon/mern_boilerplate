import mongoose, { Schema } from "mongoose";

const asset__schema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, "Filename is required"],
    },
    originalName: {
      type: String,
      required: [true, "Original file name is required"],
    },
    mimeType: {
      type: String,
      required: [true, "MIME type is required"],
    },
    path: {
      type: String,
      required: [true, "Path is required"],
    },
    size: {
      type: Number,
      required: [true, "File size is required"],
      min: [0, "Size cannot be negative"],
    },
    url: {
      type: String,
      required: [true, "URL is required"],
    },

    // ! OPTIONALS //
    assetType: {
      type: String,
      enum: ["image", "video", "audio", "document", "other"],
    },

    metadata: {
      width: Number, // for images/videos
      height: Number, // for images/videos
      duration: Number, // seconds, for videos/audio
      format: String, // e.g., 'mp4', 'jpeg'
      // ? add any other metadata your app needs
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    tags: [String], // optional array of tags/keywords
    isPublic: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = new mongoose.model("Asset", asset__schema, "assets");

export default Asset;
