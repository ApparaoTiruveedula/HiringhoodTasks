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
  TextField,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../redux/api/categoryApi';
import { useGetPostsQuery } from '../../redux/api/postApi';
import { toast } from 'react-toastify';

const CategoryList = () => {
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ _id?: string; name: string } | null>(null);

  const { data, isLoading } = useGetCategoriesQuery({ page, limit: 10 });
  console.log(data)
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleSave = async () => {
    if (!selectedCategory) return;
    try {
      if (selectedCategory._id) {
        await updateCategory(selectedCategory).unwrap();
        toast.success('Category updated');
      } else {
        await createCategory({ name: selectedCategory.name }).unwrap();
        toast.success('Category created');
      }
      setOpenDialog(false);
      setSelectedCategory(null);
    } catch (err) {
      toast.error('Failed to save category');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { data: posts } = useGetPostsQuery({ categoryId: id });

      if (posts?.data.length) {
        toast.error('Cannot delete category in use');
        return;
      }
      await deleteCategory(id).unwrap();
      toast.success('Category deleted');
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          setSelectedCategory({ name: '' });
          setOpenDialog(true);
        }}
        sx={{ mb: 2 }}
      >
        Add Category
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={2}>Loading...</TableCell>
            </TableRow>
          ) : (
            data?.data.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenDialog(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(category._id)}>
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedCategory?._id ? 'Edit' : 'Add'} Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={selectedCategory?.name || ''}
            onChange={(e) =>
              setSelectedCategory({ ...selectedCategory!, name: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryList;