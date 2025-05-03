import {
  Typography,
  Button,
  Stack,
  Modal,
  Box,
  TextField,
  MenuItem,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import UserList from '../components/users/UserList';
import { useAddUserMutation } from '../redux/api/userApi'; // adjust the path

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  role: Yup.string().oneOf(['admin', 'editor']).required('Required'),
});

const Users = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      await addUser({ ...values, isActive: true }).unwrap();
      resetForm();
      handleClose();
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add User
        </Button>
      </Stack>

      <UserList />

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Add New User
          </Typography>

          <Formik
            initialValues={{ name: '', email: '', role: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  margin="normal"
                  onChange={handleChange}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  margin="normal"
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  name="role"
                  label="Role"
                  select
                  margin="normal"
                  onChange={handleChange}
                  error={touched.role && !!errors.role}
                  helperText={touched.role && errors.role}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                </TextField>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add User'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Users;
