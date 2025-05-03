import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);