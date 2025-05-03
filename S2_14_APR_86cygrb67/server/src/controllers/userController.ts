import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { hasSubscribers } from 'diagnostics_channel';

// GET /api/users - Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/users - Add a new user
export const addUser = async (req: Request, res: Response) => {
  const { name, email, role, isActive } = req.body;
  console.log(name)
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // You may want to generate or hash password securely in production
    const hashedPassword = await bcrypt.hash('defaultPassword123', 10);
    console.log(hashedPassword)

    const newUser = new User({
      name,
      email,
      role,
      isActive: isActive ?? true,
      password: await bcrypt.hash('123456', 10),
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/:id - Update a user's role or active status
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role, isActive } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role, isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
