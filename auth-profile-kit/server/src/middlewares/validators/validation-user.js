import User from "../../models/user.model.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../utils/errors.js";
import { getUserSession } from "../../services/auth.service.js";

async function findUserByUsername(username) {
  if (typeof username !== "string")
    throw new BadRequestError("Invalid username");
  return await User.findOne({ username });
}

/**
 * Checks if a given username is available (not already taken).
 *
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - Resolves to true if the username is available.
 * @throws {ConflictError} - If the username is already taken.
 */
export async function assertUsernameAvailable(username) {
  const usernameTaken = Boolean(await findUserByUsername(username));
  if (usernameTaken) throw new ConflictError("Username is already taken");
  return true;
}

/**
 * Verifies whether a user with the given username exists.
 *
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - Resolves to true if the user exists.
 * @throws {NotFoundError} - If the user does not exist.
 */
export async function assertUserExists(username) {
  const userExist = Boolean(await findUserByUsername(username));
  if (!userExist) throw new NotFoundError("User does not exist");
  return true;
}

/**
 * Express middleware to check that there is no active session.
 * - If a session is active, a ConflictError is passed to the next middleware.
 * - If no session is active, clears the session cookie and continues.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
// ! CHECK IF THE USER [IS NOT] LOGGED IN
export async function assertNoActiveSession(req, res, next) {
  const user = await getUserSession(req.session);
  if (user) return next(new ConflictError("Active session already exists"));

  res.clearCookie("connect.sid");
  return next();
}
