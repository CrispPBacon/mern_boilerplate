import User from "../models/user.model.js";
import { NotFoundError, UnauthorizedError } from "../utils/errors.js";

export async function login(username, password) {
  if (!username) throw NotFoundError("Please enter your username");
  if (!password) throw NotFoundError("Please enter your password");

  const user_data = await User.findOne({ username })
    .select("-createdAt -updatedAt -__v")
    .lean();
  if (!user_data) throw NotFoundError("User not found");

  if (user_data.password !== password)
    throw new UnauthorizedError("Incorrect Password");

  delete user_data.password;
  return user_data;
}

export async function signup(first_name, last_name, username, email, password) {
  const user_data = new User({
    first_name,
    last_name,
    username,
    email,
    password,
  });

  await user_data.save();
  const { password: _, avatar, __v, ...user_object } = user_data.toObject();
  return user_object;
}

// ! CHECK IF THE USER [IS] LOGGED IN
export async function getUserSession(session) {
  if (!session || !session.user_id) return null;

  const user_data = await User.findById(session.user_id)
    .select("-password -createdAt -updatedAt -__v")
    .lean();

  if (!user_data) return null;
  return user_data;
}
