import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { Transaction } from '../store/transactionsSlice';

interface TransactionSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export function useTransactions() {
  const transactions = useAppSelector((state) => state.transactions.transactions);
  
  const summary: TransactionSummary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += transaction.amount;
        }
        
        acc.totalBalance = acc.totalIncome - acc.totalExpense;
        return acc;
      },
      { totalBalance: 0, totalIncome: 0, totalExpense: 0 }
    );
  }, [transactions]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions]);

  return {
    transactions: sortedTransactions,
    summary,
    formatCurrency,
    formatDate,
  };
}