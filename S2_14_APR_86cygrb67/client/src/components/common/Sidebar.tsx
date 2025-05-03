import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { selectUserRole } from '../../redux/slices/authSlice';
import styled from 'styled-components';

const SidebarContainer = styled(Drawer)`
  width: 240px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: 240px;
    box-sizing: border-box;
  }
`;

const Sidebar = () => {
  const role = useAppSelector(selectUserRole);
  return (
    <SidebarContainer variant="permanent">
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/posts">
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <ListItemText primary="Categories" />
        </ListItem>
        {role === 'admin' && (
          <ListItem button component={Link} to="/users">
            <ListItemText primary="Users" />
          </ListItem>
        )}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;