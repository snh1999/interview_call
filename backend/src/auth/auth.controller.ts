import jwt from "jsonwebtoken";
import { ENV } from "#lib/env";
import { createController } from "#lib/http-wrapper/request";
import { SendResponse } from "#lib/http-wrapper/response";
import { upsertStreamUser } from "#lib/stream";
import { type IUserDocument, User } from "#user/User.model";
import type { IAuthPayload, TLoginDTO, TRegisterDTO } from "./auth.dto.js";

const register = createController(async (req, res) => {
  const { email, password, name } = req.body as TRegisterDTO;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return SendResponse.error("BAD_REQUEST", "User already exists", 400);
  }

  const verificationToken = generateToken();
  const user = new User({
    email,
    password,
    name,
    verificationToken,
    verificationTokenExpireAt: Date.now() + 60 * 60 * 1000,
  });
  await user.save();

  await upsertStreamUser({
    id: user._id.toString(),
    name: user.name,
  });

  const token = getJwtToken({ id: user._id.toString() });
  SendResponse.setCookie(res, "token", token);

  return SendResponse.created(getUserObject(user), "User created sucessfully");
});

const generateToken = () =>
  Math.floor(1000000 + Math.random() * 900000).toString();

const getJwtToken = (payload: IAuthPayload) =>
  jwt.sign({ ...payload }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES,
  });

const login = createController(async (req, res) => {
  const { email, password } = req.body as TLoginDTO;

  const user = await User.findOne({ email });

  if (!user || (user && !(await user.matchPassword(password)))) {
    return SendResponse.error("BAD_REQUEST", "Invalid Credentials", 400);
  }

  const token = getJwtToken({ id: user._id.toString() });
  SendResponse.setCookie(res, "token", token);

  user.lastLogin = new Date();
  await user.save();
  return SendResponse.ok(
    { token, ...getUserObject(user) },
    "Logged in successfully"
  );
});

const logout = createController(async (_, res) => {
  SendResponse.clearCookie(res, "token");
  return SendResponse.ok({}, "Logged out Successfully");
});

const getUser = createController(async (req) => {
  const user = req.user;
  if (!user) {
    return SendResponse.error("NOT_FOUND", "User Not found", 400);
  }
  return SendResponse.ok(getUserObject(user));
});

const getUserObject = (user: IUserDocument) => {
  const { email, name, _id: id } = user;
  return {
    user: { id, name, email },
  };
};

export const AuthController = {
  register,
  login,
  logout,
  getUser,
};
