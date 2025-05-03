import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button as MuiButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Snackbar,
  Alert,
  Stack
} from '@mui/material';
import { addTransaction } from '../store/transactionsSlice';
import { useAppDispatch } from '../store/hooks';
import Navigation from '../components/Navigation';

const AddTransaction: React.FC = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showToast = (message: string, severity: 'success' | 'error') => {
    console.log('TOAST:', message);
    setSnackbar({ open: true, message, severity });
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      showToast('Please enter a title', 'error');
      return false;
    }

    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      showToast('Please enter a valid amount', 'error');
      return false;
    }

    if (!date) {
      showToast('Please select a date', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      dispatch(
        addTransaction({
          id:uuidv4(),
          title: title.trim(),
          amount: Number(amount),
          type,
          date,
        })
      );

      showToast('Transaction added successfully', 'success');

    } catch (error) {
      showToast('Failed to add transaction', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <Card
        sx={{
          width: '400px',
          margin: '2.5rem auto',
          padding: '1rem',
          animation: 'fadeIn 0.5s ease-in',
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontSize: '25px', fontWeight: 600 }}>
              Add Transaction
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                className="bg-gray-100"
                label="Title"
                placeholder="e.g., Salary, Groceries"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: 50 }}
                required
                size="small"
              />

              <TextField
                type="number"
                label="Amount (₹)"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputProps={{ step: '1', min: '1' }}
                required
                size="small"
              />

              <div>
                <FormLabel component="legend" className="mb-2 block text-sm font-medium text-gray-700">
                  Type
                </FormLabel>
                <RadioGroup
                  row
                  value={type}
                  onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                >
                  <FormControlLabel
                    value="income"
                    control={<Radio size="small" sx={{ p: 0.5 }} />}
                    label={<span className="text-green-600 text-xs">Income</span>}
                    sx={{ m: 0,color:"green" }}
                  />

                  <FormControlLabel
                    value="expense"
                    control={<Radio size="small" sx={{ p: 0.5 }} />}
                    label={<span className="text-red-600 text-xs">Expense</span>}
                    sx={{ m: 0 ,color:'red' }}
                  />
                </RadioGroup>
              </div>

              <TextField
                fullWidth
                type="date"
                label="Date"
                size="small"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />

              <MuiButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? 'Adding...' : 'Add Transaction'}
              </MuiButton>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={(e, reason) => {
          if (reason !== 'clickaway') {
            setSnackbar({ ...snackbar, open: false });
            if (snackbar.severity === 'success') {
              console.log('Navigating after toast...');
              navigate('/');
            }
          }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddTransaction;
