import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useGetPostsQuery, useDeletePostMutation } from '../../redux/api/postApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostList = () => {
  const [page, setPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const { data, isLoading } = useGetPostsQuery({ page, limit: 10 });
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    if (!selectedPostId) return;
    try {
      await deletePost(selectedPostId).unwrap();
      toast.success('Post deleted');
      setOpenDeleteDialog(false);
    } catch (err) {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>
          ) : (
            data?.data.map((post) =>(
              <TableRow key={post._id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>{post.author.name}</TableCell>
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/posts/${post._id}`}>
                    <Visibility />
                  </IconButton>
                  <IconButton component={Link} to={`/posts/edit/${post._id}`}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedPostId(post._id);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <Button disabled={!data?.hasMore} onClick={() => setPage(page + 1)}>
        Next
      </Button>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this post?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostList;