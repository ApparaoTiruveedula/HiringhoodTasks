import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};

interface TransactionsState {
  transactions: Transaction[];
}

// Load transactions from localStorage
const loadTransactions = (): Transaction[] => {
  try {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse transactions from localStorage", error);
    return [];
  }
};

const initialState: TransactionsState = {
  transactions: loadTransactions(),
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
