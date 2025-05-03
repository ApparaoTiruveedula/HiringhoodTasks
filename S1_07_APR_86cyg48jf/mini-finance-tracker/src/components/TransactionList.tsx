import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionItem from '../components/TransactionItem';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { deleteTransaction } from '../store/transactionsSlice';

const TransactionList: React.FC = () => {
  const { transactions } = useTransactions();
  const dispatch = useAppDispatch();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleDelete = (id: string, title: string) => {
    dispatch(deleteTransaction(id));
    setSnackbar({
      open: true,
      message: `${title} has been deleted`,
      severity: 'success',
    });
  };

  if (transactions.length === 0) {
    return (
      <Card
        sx={{
          width: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mx: 'auto',
          mt: 3,
        }}
      >
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Typography variant="body1" color="text.secondary">
            No transactions yet
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 2 }}>
            Add your first transaction to start tracking your finances
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          p: 1,
        }}
      >
        <Typography
          sx={{ marginRight: '200px', fontWeight: '600' }}
          variant="h6"
          className="text-xl font-semibold"
        >
          Recent Transactions
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          p: 1,
        }}
      >
        <Box className="space-y-3 mt-2">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%',color:'red' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TransactionList;
