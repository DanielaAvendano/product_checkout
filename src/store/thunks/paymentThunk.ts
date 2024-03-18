import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserDataProps } from '../../interfaces';

export const simulateAPICall = createAsyncThunk(
  'payment/simulateAPICall',
  async (paymentData: UserDataProps) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a 2-second delay
    console.log('success');
    return paymentData;
  }
);