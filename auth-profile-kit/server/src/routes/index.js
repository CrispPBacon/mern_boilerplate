import express from "express";
import path from "path";
import authRoute from "./auth.routes.js";
import uploadRoute from "./upload.routes.js";
import { __dirname } from "../utils/general-utils.js";
import { requireUserSession } from "../middlewares/auth-handler.js";

const router = express.Router();

router.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads"))
);

router.get("/", (_req, res, next) => {
  try {
    res.status(404).json({ msg: "NOT FOUND!" });
  } catch (error) {
    next(error);
  }
});

router.get("/ip", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const IpAddress = ip.substring(ip.lastIndexOf(":") + 1, ip.length);
  console.log(IpAddress, typeof IpAddress);
  res.send(`Client IP: ${IpAddress}`);
});

router.use("/api/auth", authRoute);

// * PRIVATE ROUTES
router.use(requireUserSession);
router.use("/api/upload", uploadRoute);

export default router;
