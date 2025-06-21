import express from "express";

const router = express.Router();

router.route("/").get((_, res) => {
  return res.status(200).json({ msg: "HELLO FROM AUTH" });
});
router.route("/ping").get((_, res) => {
  return res.status(200).json({ msg: "You pinged the AUTH route!" });
});

export default router;
