// models/comment.model.js
import db from "../utils/db.js";

const TABLE_NAME = "comments";

export default {
  async findByBlogId(blogId) {
    // join users để lấy username
    return db(TABLE_NAME)
      .select("comments.*", "users.username")
      .leftJoin("users", "comments.user_id", "users.id")
      .where("comments.blog_id", blogId)
      .orderBy("comments.created_at", "asc");
  },

  async add(comment) {
    return db(TABLE_NAME).insert(comment);
  }
};
