import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

import { UserInfoForm } from "./UserInfoForm";
import { CreditCardForm } from "./CreditCardForm";
import { UserDataProps } from "../interfaces";
import { PaymentSummary } from "./PaymentSummary";
import { selectPayment, updateUserData } from "../store/slices/payment";

interface ModalCreditInfoProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handleClickOpen: () => void;
  handleNavigate: () => void;
}

const steps = ["Personal Info", "Credit card Info"];

export const ModalCreditInfo = (props: ModalCreditInfoProps) => {
  const { onClose, selectedValue, open, handleClickOpen, handleNavigate } =
    props;

  const paymentData = useSelector(selectPayment);
  const dispatch = useDispatch();

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      dispatch(updateUserData(parsedData));
    }
  }, [dispatch]);

  const handleNextStep = (newData: UserDataProps, final = false) => {
    const updatedData = {
      ...paymentData,
      ...newData,
      product_name: paymentData.product_name,
      product_price: paymentData.product_price,
      product_quantity: paymentData.product_quantity,
    };
    dispatch(updateUserData(updatedData));

    localStorage.setItem("userData", JSON.stringify(updatedData));

    if (final) {
      onClose(selectedValue);
      setOpenBackdrop(true);
    } else if (currentStep + 1 < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const formContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <UserInfoForm
            next={handleNextStep}
            handleClose={handleClose}
            data={paymentData}
          />
        );
      case 1:
        return (
          <CreditCardForm
            prev={handlePrevStep}
            next={handleNextStep}
            data={paymentData}
          />
        );
      default:
        return <div>404: Not Found</div>;
    }
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle>Fill out you data</DialogTitle>

        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <DialogContent>{formContent(currentStep)}</DialogContent>
      </Dialog>

      <PaymentSummary
        handleNavigate={handleNavigate}
        setOpenBackdrop={setOpenBackdrop}
        openBackdrop={openBackdrop}
        handleClickOpen={handleClickOpen}
      />
    </>
  );
};
