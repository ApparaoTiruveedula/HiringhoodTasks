import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { useGetPostsQuery } from '../redux/api/postApi';
import { useGetUsersQuery } from '../redux/api/userApi';
import { useGetCategoriesQuery } from '../redux/api/categoryApi';
import { selectUserRole } from '../redux/slices/authSlice';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const role = useSelector(selectUserRole);

  const { data: posts, isLoading } = useGetPostsQuery({ page: 1, limit: 5 });
  const users = useGetUsersQuery();
  const categories = useGetCategoriesQuery();

  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Posts</Typography>
              <Typography variant="h4">{posts?.total || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Categories</Typography>
              <Typography variant="h4">{categories.data?.total || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {role === 'admin' && (
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Users</Typography>
                <Typography variant="h4">{users.data?.length || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Button
        variant="contained"
        component={Link}
        to="/posts/create"
        sx={{ mt: 3 }}
      >
        Add New Post
      </Button>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Recent Posts
      </Typography>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        posts?.data.map((post) => (
          <Card
            key={post._id}
            sx={{ mt: 2, cursor: 'pointer' }}
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography color="textSecondary">
                {post.status} | {post.author.name} |{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
