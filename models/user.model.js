import db from "../utils/db.js";
import bcrypt from "bcrypt";

const TABLE_NAME = "users";

export default {
  async findByUsername(username) {
    return db(TABLE_NAME).where({ username }).first();
  },

  async create(user) {
    // hash password trước khi lưu
    const hashedPass = await bcrypt.hash(user.pass, 10);
    return db(TABLE_NAME).insert({
      username: user.username,
      pass: hashedPass,
      role: user.role || "user"
    });
  },

  async validate(username, password) {
    const user = await db(TABLE_NAME).where({ username }).first();
    if (!user) return null;
    const match = await bcrypt.compare(password, user.pass);
    return match ? user : null;
  }
};
