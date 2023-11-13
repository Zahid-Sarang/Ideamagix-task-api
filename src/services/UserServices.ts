import createHttpError from "http-errors";
import User from "../models/UserSchema";
import { UserData } from "../types";
export class UserService {
  constructor() {}
  async create({ userName, password, email, role }: UserData) {
    try {
      const isEmailExsit = await User.findOne({ email: email });
      if (isEmailExsit) {
        const err = createHttpError(400, "Email is already exists!");
        throw err;
      }
      await User.create({ userName, email, password, role: role });
    } catch (err) {
      const error = createHttpError(500, "failed to create user");
      throw error;
    }
  }
}
