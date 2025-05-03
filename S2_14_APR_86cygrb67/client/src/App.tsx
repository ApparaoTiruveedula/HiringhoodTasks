import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './styles/theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import PostCreate from './pages/PostCreate';
import PostEdit from './pages/PostEdit';
import Categories from './pages/Categories';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import { Box } from '@mui/material';
import styled from 'styled-components';

const AppContainer = styled(Box)`
  display: flex;
`;

const MainContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Content = styled(Box)`
  flex-grow: 1;
  padding: 2rem;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <AppContainer>
                <Sidebar />
                <MainContainer>
                  <Header />
                  <Content>
                    <PrivateRoute />
                  </Content>
                </MainContainer>
              </AppContainer>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} allowedRoles={['admin']} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;