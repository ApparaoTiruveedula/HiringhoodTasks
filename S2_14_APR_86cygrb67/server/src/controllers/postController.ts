import { Response } from 'express';
import Post from '../models/Post';
import { AuthRequest } from '../middleware/authMiddleware'; // Import AuthRequest

export const getPosts = async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, categoryId } = req.query;
  try {
    const query = categoryId ? { category: categoryId } : {};
    const posts = await Post.find(query)
      .populate('author', 'name')
      .populate('category', 'name')
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await Post.countDocuments(query);
    res.json({
      data: posts,
      total,
      hasMore: total > +page * +limit,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('category', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content, category, tags, status, image } = req.body;
  try {
    const post = new Post({
      title,
      content,
      category,
      tags,
      status,
      image,
      author: req.user?.id, // Now TypeScript recognizes req.user
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePost = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};