import { Button, Typography } from "@mui/material";
import { MainLayout } from "../../layout/MainLayout";
import { ModalCreditInfo } from "../../components/ModalCreditInfo";
import { useState } from "react";

const emails = ["username@gmail.com", "user02@gmail.com"];

export const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <MainLayout>
      <Typography>Product Page</Typography>
      <Button variant="contained" onClick={handleClickOpen}>
        Pay with credit card
      </Button>
      <ModalCreditInfo
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </MainLayout>
  );
};
