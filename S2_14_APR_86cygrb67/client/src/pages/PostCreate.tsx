import { Typography } from '@mui/material';
import { useCreatePostMutation } from '../redux/api/postApi';
import PostForm from '../components/posts/PostForm';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    image: '',
  };

  const handleSubmit = async (values: any) => {
    await createPost(values).unwrap();
    navigate('/posts');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Create Post
      </Typography>
      <PostForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default PostCreate;