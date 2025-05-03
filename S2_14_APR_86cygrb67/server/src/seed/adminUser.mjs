import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.ts'; // use relative path with .js at the end

const MONGO_URI =process.env.MONGO_URI|| 'mongodb+srv://Arjumbmmbn:<password>@backendtask.yfuy3.mongodb.net/blog-cms?retryWrites=true&w=majority';
const uri = MONGO_URI.replace('<password>', encodeURIComponent('your_actual_password'));

async function createAdminUser() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingUser = await User.findOne({ email: 'admin@gmail.com' });
    if (existingUser) {
      console.log('✅ Admin user already exists');
      process.exit();
    }

    const hashedPassword = bcrypt.hashSync('admin123', 10);
    const newUser = new User({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    await newUser.save();
    console.log('✅ Admin user created successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
    process.exit(1);
  }
}

createAdminUser();
