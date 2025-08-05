import mongoose from "mongoose";

const user__schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      lowercase: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    avatar: { type: String, default: null },
  },
  { timestamps: true }
);

user__schema.index({ username: 1 });

const User = new mongoose.model("User", user__schema, "users");

export default User;
