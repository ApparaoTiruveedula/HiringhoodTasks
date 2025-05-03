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
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";




const Home = () => {

  return ( <div className="max-w-md mx-auto">
    <Navigation />
    <BalanceCard />
    <TransactionList />
  </div>
  );
};

export default Home;
