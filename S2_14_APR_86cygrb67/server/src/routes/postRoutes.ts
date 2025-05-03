import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;