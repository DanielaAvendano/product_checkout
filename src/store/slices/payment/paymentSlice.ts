import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { UserDataProps } from '../../../interfaces';

export interface PaymentState {
  data: UserDataProps;
}

const initialState: PaymentState = {
  data: {
    product_name: "",
    product_price: 0,
    product_quantity: 1,
    full_name: "",
    email: "",
    phone_number: { countryCode: "CO", number: "" },
    credit_card_number: "",
    card_holder_name: "",
    month: "",
    year: "",
    cvc: "",
    user_id: { id_type: "CC", id_number: "" },
    number_of_payments: 1,
    accept_terms_and_conditions: false,
  },
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserDataProps>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetPaymentData: (state) => {
      state.data = { ...initialState.data }; 
    },
  },
});

export const { updateUserData, resetPaymentData } = paymentSlice.actions;

export const selectPayment = (state: RootState) => state.payment.data;

export default paymentSlice.reducer;
