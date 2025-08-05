import { login, signup } from "../services/auth.service.js";
import { NotFoundError } from "../utils/errors.js";

export async function authLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new NotFoundError("Please enter your username and password!");
    const data = await login(username, password);
    req.session.user_id = data._id;
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function authSignup(req, res, next) {
  try {
    const { first_name, last_name, username, password, email } = req.body;
    const data = await signup(first_name, last_name, username, email, password);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function authLogout(req, res, next) {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    return res.status(200).json({ msg: "You have logged out" });
  } catch (e) {
    next(e);
  }
}
