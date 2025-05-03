import { Request, Response } from 'express';
import Category from '../models/Category';
import Post from '../models/Post';

export const getCategories = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const categories = await Category.find()
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await Category.countDocuments();
    res.json({
      data: categories,
      total,
      hasMore: total > +page * +limit,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ category: id });
    if (posts.length > 0) {
      return res.status(400).json({ message: 'Cannot delete category in use' });
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};