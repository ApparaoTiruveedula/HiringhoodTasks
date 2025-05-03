require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Arjun:<Ercga>@backendtask.yfuy3.mongodb.net/?retryWrites=true&w=majority&appName=BackendTask';

async function seedUser() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@gmail.com';
    const password = 'admin123';
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
      return;
    }

    await User.create({
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('User created: admin@gmail.com');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedUser();