import express from "express";
import auth from "./auth.routes.js";

const router = express.Router();

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

router.use("/api/auth", auth);

export default router;
