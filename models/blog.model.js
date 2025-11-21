// repositories/blogs.repo.js
import db from "../utils/db.js";

const TABLE_NAME = "blogs";

export default {
    async findAll() {
        return db(TABLE_NAME).orderBy("id", "asc");
    },

    async add(blog) {
        return db(TABLE_NAME).insert(blog);
    },

    async findById(id) {
        return db(TABLE_NAME).where({ id }).first();
    }   
};
