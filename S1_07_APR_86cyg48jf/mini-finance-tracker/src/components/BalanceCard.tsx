import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteTransaction } from "../store/transactionsSlice";
import {  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box, } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import Navigation  from '../components/Navigation'
import { styled } from '@mui/material/styles';


const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(to bottom right, #4e54c8, #8f94fb)', 
  color: '#fff',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[6],
  overflow: 'hidden',
  width:'400px',
  
}));

const BalanceCard = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const dispatch = useDispatch();

  const totalBalance = (transactions).reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  
  return (
<Box sx={{display: 'flex', justifyContent: 'center', p: 1}}>
<GradientCard >
        <CardHeader 
          title={
            <Typography sx={{mb:-3,fontWeight:600,}} variant="h6" className="text-bold-700 text-[20px] md:text-[24px]">
              Current Balance
            </Typography>
          }
      
        />
        <CardContent>
          <Typography sx={{fontSize:'40px',fontWeight:600}}
            variant="h3"
            className="text-[30px] md:text-[40px] font-bold mb-3"

          >
            ₹{totalIncome-totalExpense}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Total Income
                </Typography>
                <Typography variant="h6" fontWeight="600">
                ₹{totalIncome}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Total Expenses
                </Typography>
                <Typography variant="h6" fontWeight="600">
                ₹{totalExpense}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </GradientCard>
    </Box>
    
  );
};

export default BalanceCard;
