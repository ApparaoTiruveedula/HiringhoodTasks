import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/authApi';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import styled from 'styled-components';

const LoginContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4a90e2, #50c9c3);
`;

const LoginForm = styled(Box)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <LoginForm>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>
        {error && (
          <Alert severity="error">
            {error && 'data' in error ? (error as any).data.message : 'Login failed'}
          </Alert>
        )}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(3, 'Too short').required('Required'),
          })}
          onSubmit={async (values) => {
            try {
              console.log('Login payload:', values); // Debug
              const { token } = await login(values).unwrap();
              console.log('Token received:', token);
              localStorage.setItem('token', token);
              navigate('/dashboard');
            } catch (err) {
              console.error('Login error:', err);
            }
          }}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...getFieldProps('email')}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...getFieldProps('password')}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;