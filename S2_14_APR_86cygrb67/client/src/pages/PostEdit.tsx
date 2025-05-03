import { useParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useGetPostQuery, useUpdatePostMutation } from '../redux/api/postApi';
import PostForm from '../components/posts/PostForm';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading } = useGetPostQuery(id!);
  const [updatePost] = useUpdatePostMutation();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!post) return <Typography>Post not found</Typography>;

  const initialValues = {
    title: post.title,
    content: post.content,
    category: post.category._id,
    tags: post.tags,
    status: post.status,
    image: post.image || '',
  };

  const handleSubmit = async (values: any) => {
    await updatePost({ id: id!, ...values }).unwrap();
    navigate('/posts');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      <PostForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default PostEdit;