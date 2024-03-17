import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { UserDataProps } from '../../../interfaces';



export interface PaymentState {
  data: UserDataProps;
}

const initialState: PaymentState = {
  data: {
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
      state.data = action.payload;
    },
  },
});

export const { updateUserData } = paymentSlice.actions;

export const selectPayment = (state: RootState) => state.payment.data;

export default paymentSlice.reducer;
