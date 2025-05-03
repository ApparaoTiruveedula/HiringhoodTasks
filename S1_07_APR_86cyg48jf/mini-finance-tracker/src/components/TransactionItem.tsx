import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useTransactions } from '../hooks/useTransactions'; 

import { Transaction } from '../store/transactionsSlice';



interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string, title: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
  const { formatCurrency, formatDate } = useTransactions();

  return (
    <Card
      className="animate-enter"
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: 2,
        backgroundColor: '#ffffff',
        width: '600px',
      }}
    >
      <CardContent
        sx={{
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {transaction.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(transaction.date)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: transaction.type === 'income' ? '#16a34a' : '#dc2626',
            }}
          >

            {transaction.type === 'income' ? '+' : '-'}{' '}
            ₹{
(transaction.amount)}
          </Typography>

          <IconButton
            onClick={() => onDelete(transaction.id, transaction.title)}
            sx={{
              backgroundColor: '#ef4444',
              color: 'white',
              '&:hover': {
                backgroundColor: '#dc2626',
              },
              borderRadius: 2,
              p: 1,
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransactionItem;
