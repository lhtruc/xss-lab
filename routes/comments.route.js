import express from 'express';
import commentModel from '../models/comment.model.js';
import { authUser } from '../middlewares/auth.mdw.js';

const router = express.Router();

// POST /comments/add
router.post('/add', authUser, async (req, res) => {
  const { blog_id, comment } = req.body;

  if (!blog_id || !comment) {
    return res.status(400).send('Missing blog_id or comment');
  }

  try {
    const newComment = {
      blog_id: blog_id,
      user_id: req.user?.id || null,
      text: comment,
      created_at: new Date()
    };

    await commentModel.add(newComment);

    res.redirect(`/blogs/${blog_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;
