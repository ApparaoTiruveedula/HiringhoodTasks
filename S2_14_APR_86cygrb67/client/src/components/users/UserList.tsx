import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Switch,
} from '@mui/material';
import { useGetUsersQuery, useUpdateUserMutation } from '../../redux/api/userApi';
import { toast } from 'react-toastify';

const UserList = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const handleToggle = async (id: string, isActive: boolean) => {
    try {
      await updateUser({ id, isActive: !isActive }).unwrap();
      toast.success(`User ${isActive ? 'disabled' : 'enabled'}`);
    } catch (err) {
      toast.error('Failed to update user');
    }
  };

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await updateUser({ id, role }).unwrap();
      toast.success('Role updated');
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={4}>Loading...</TableCell>
          </TableRow>
        ) : (
          data?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </TableCell>
              <TableCell>
                <Switch
                  checked={user.isActive}
                  onChange={() => handleToggle(user._id, user.isActive)}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default UserList;