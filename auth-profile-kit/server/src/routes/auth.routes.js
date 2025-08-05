import express from "express";
import {
  authLogin,
  authLogout,
  authSignup,
} from "../controller/auth.controller.js";
import {
  validateLogin,
  validateSignUp,
} from "../middlewares/validators/validation.js";

const router = express.Router();

router.route("/").get((_, res) => {
  const routes = ["/login", "/signup", "/logout"];
  return res.status(200).json({ routes });
});

router.route("/login").post(validateLogin, authLogin);
router.route("/logout").delete(authLogout);
router.route("/signup").post(validateSignUp, authSignup);

export default router;
