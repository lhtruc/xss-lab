import blogModel from '../models/blog.model.js';
import commentModel from '../models/comment.model.js';
import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const blogs = await blogModel.findAll(); // ✅ await Promise

        res.render("vwBlogs/list", {
            title: "All Blogs",
            blogs,
            user: req.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get("/:id", async (req, res) => {
    const blogId = req.params.id;
    try {
        const blog = await blogModel.findById(blogId); 

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        const comments = await commentModel.findByBlogId(blogId);

        res.render("vwBlogs/detail", {
            title: blog.title,
            blog,
            comments,
            user: req.user
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


export default router;
