import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import { MainLayout } from "../../layout/MainLayout";
import { ModalCreditInfo } from "../../components/ModalCreditInfo";
import { UserDataProps } from "../../interfaces";
import { products } from "../../api/products";

import { updateUserData } from "../../store/slices/payment";

interface ProductPageProps {
  data: UserDataProps;
}
const emails = ["username@gmail.com", "user02@gmail.com"];

const productQuantity: number[] = Array.from(
  { length: 12 },
  (_, index) => index + 1
);

export const ProductPage = ({ data }: ProductPageProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const [productName, setProductName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productPrice, setProductPrice] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(products[0].product_price);

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleNavigate = () => {
    navigate("/feedback");
  };

  const handleQuantityChange = (event: SelectChangeEvent<number>) => {
    const quantity = event.target.value as number;
    setSelectedQuantity(quantity);
    // Calculate total price based on selected quantity
    setTotalPrice(quantity * products[0].product_price);
  };

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(
      updateUserData({
        ...data,
        product_name: productName,
        product_price: totalPrice,
        product_quantity: selectedQuantity,
      })
    );
  };

  useEffect(() => {
    // Fetch product info
    const product_name = products[0].product_name;
    const product_price = products[0].product_price;
    setProductName(product_name);
    setProductPrice(product_price);
  }, []);

  return (
    <MainLayout>
      <Box sx={{ flexGrow: 1, marginTop: { xs: 8, md: 10 } }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Box
              component="img"
              alt="The best maple syrup"
              src="../src/assets/product_1.jpeg"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="h5" fontWeight={"bold"}>
              {productName}
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="#D9A455">
              ${totalPrice.toFixed(2)}
            </Typography>
            <p>
              Maple syrup is the true essence of what we do. Our maple syrup is
              vegan, dairy-free, gluten-free, nut-free, certified Kosher and it
              doesn’t contain any additives.
            </p>
            <FormHelperText>Quantity</FormHelperText>
            <Select
              fullWidth
              margin="dense"
              value={selectedQuantity}
              onChange={handleQuantityChange}
            >
              {productQuantity.map((num) => (
                <MenuItem key={num} value={num}>
                  <Typography>{num}</Typography>
                </MenuItem>
              ))}
            </Select>

            <Grid xs={12} md={6}>
              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                  marginY: { xs: 3, md: 5 },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                Pay with credit card
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <ModalCreditInfo
        handleNavigate={handleNavigate}
        handleClickOpen={handleClickOpen}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </MainLayout>
  );
};
