import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../redux/api/postApi';  // Import the query hook
import { useGetUserByIdQuery } from '../redux/api/userApi';  // Import the user hook
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();  // Extract the post id from the URL
  const { data: post, isLoading, error } = useGetPostsQuery({ page: 1, limit: 10 });  // Assuming posts are already fetched and paginated
  const { data: user, isLoading: userLoading } = useGetUserByIdQuery(post?._id || '');  // Fetch the user info based on userId in post

  useEffect(() => {
    if (!id) return;  // if id is undefined or null, return early.
    // Trigger post fetching with specific post ID
  }, [id]);

  const selectedPost = post?.data.find((post) => post._id === id);

  if (isLoading || userLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !selectedPost) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h6">Post not found!</Typography>
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{selectedPost.title}</Typography>
        <Typography variant="subtitle1">{new Date(selectedPost.createdAt).toLocaleDateString()}</Typography>
        <Typography variant="body1" mt={2}>
          {selectedPost.content}
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={2}>
          Author: {selectedPost?.author.name || 'Unknown Author'}
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
          Status: {selectedPost.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostDetail;
