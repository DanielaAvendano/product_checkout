import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Backdrop,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { resetPaymentData, selectPayment } from "../store/slices/payment";

import { simulateAPICall } from "../store/thunks/paymentThunk";

import { AppDispatch } from "../store/index";
import { UserDataProps } from "../interfaces";

interface PaymentSummaryProps {
  setOpenBackdrop: (value: React.SetStateAction<boolean>) => void;
  openBackdrop: boolean;
  handleClickOpen: () => void;
  handleNavigate: () => void;
}

export const PaymentSummary = ({
  setOpenBackdrop,
  openBackdrop,
  handleClickOpen,
  handleNavigate,
}: PaymentSummaryProps) => {
  const [loading, setLoading] = useState(false);

  const paymentData = useSelector(selectPayment);
  const dispatch: AppDispatch = useDispatch();

  const {
    product_name,
    product_price,
    product_quantity,
    full_name,
    email,
    phone_number,
    user_id,
    number_of_payments,
  } = paymentData;

  const handleConfirm = () => {
    setLoading(true);
    // Simulate API call
    dispatch(simulateAPICall(paymentData))
      .then((action) => {
        const payload = action.payload as UserDataProps;
        console.log(payload);
        handleNavigate();
        dispatch(resetPaymentData());
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setLoading(false);
      });
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackdrop}
      onClick={() => setOpenBackdrop(false)}
    >
      <Container sx={{ width: { md: 600 } }}>
        <Paper>
          <Typography variant="h6" textAlign="center" pt={1}>
            Payment Summary
          </Typography>

          <List>
            <ListItem>
              <ListItemText primary={`Product Name:${product_name} `} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Quantity:${product_quantity}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Total:${product_price}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Full Name: ${full_name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Email: ${email}`} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Phone: ${phone_number?.countryCode ?? "N/A"} - ${
                  phone_number?.number ?? "N/A"
                }`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Id: ${user_id?.id_type ?? "N/A"} - ${
                  user_id?.id_number ?? "N/A"
                }`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Number Of payments: ${number_of_payments}`}
              />
            </ListItem>
          </List>
          <Stack
            justifyContent="space-between"
            padding={1}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Button
              variant="contained"
              sx={{ marginY: { xs: 1, md: 0 } }}
              disabled={loading}
              onClick={handleConfirm}
            >
              {loading ? "Confirming..." : "Confirm"}
            </Button>
            <Button variant="outlined" onClick={handleClickOpen}>
              Cancel
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Backdrop>
  );
};
