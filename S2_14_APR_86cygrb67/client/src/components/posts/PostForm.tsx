import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Box,
  CircularProgress,
} from '@mui/material';
import { useFetchCategoryOptions } from '../../redux/api/categoryApi';  // <- using the helper hook
import { toast } from 'react-toastify';

interface PostFormProps {
  initialValues: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    status: string;
    image: string;
  };
  onSubmit: (values: any) => Promise<void>;
}

const PostForm = ({ initialValues, onSubmit }: PostFormProps) => {
  const { categories, isLoading, isError } = useFetchCategoryOptions();

  useEffect(() => {
    const autosaved = JSON.stringify(initialValues);
    localStorage.setItem('postDraft', autosaved);
  }, [initialValues]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required('Required'),
        content: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
        status: Yup.string().oneOf(['draft', 'published']).required('Required'),
        image: Yup.string().url('Invalid URL'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
          localStorage.removeItem('postDraft');
          toast.success('Post saved');
        } catch (err) {
          toast.error('Failed to save post');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, getFieldProps, setFieldValue }) => (
        <Form>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...getFieldProps('title')}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
          />
          <TextField
            label="Content"
            fullWidth
            margin="normal"
            multiline
            rows={6}
            {...getFieldProps('content')}
            error={touched.content && !!errors.content}
            helperText={touched.content && errors.content}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              {...getFieldProps('category')}
              error={touched.category && !!errors.category}
              disabled={isLoading || isError}
            >
              {isLoading && (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                </MenuItem>
              )}

              {isError && <MenuItem disabled>Error loading categories</MenuItem>}

              {!isLoading && !isError && categories.length === 0 && (
                <MenuItem disabled>No categories available</MenuItem>
              )}

              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Tags (comma-separated)"
            fullWidth
            margin="normal"
            onChange={(e) => {
              const tags = e.target.value.split(',').map((t) => t.trim());
              setFieldValue('tags', tags);
            }}
            error={touched.tags && !!errors.tags}
            helperText={touched.tags && errors.tags}
          />

          <Box>
            {values.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => {
                  const newTags = values.tags.filter((_, i) => i !== index);
                  setFieldValue('tags', newTags);
                }}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              {...getFieldProps('status')}
              error={touched.status && !!errors.status}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            {...getFieldProps('image')}
            error={touched.image && !!errors.image}
            helperText={touched.image && errors.image}
          />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Save Post
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
