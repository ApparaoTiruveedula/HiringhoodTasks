export interface Post {
  _id: string;
  title: string;
  content: string;
  category: { _id: string; name: string };
  tags: string[];
  status: 'draft' | 'published';
  author: { _id: string; name: string };
  image?: string;
  createdAt: string;
}