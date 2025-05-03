import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PostList from '../components/posts/PostList';

const Posts = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/posts/create"
        sx={{ mb: 2 }}
      >
        Create Post
      </Button>
      <PostList />
    </div>
  );
};

export default Posts;