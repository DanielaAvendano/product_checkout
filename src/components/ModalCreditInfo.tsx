import { useState } from "react";
import { useSelector } from "react-redux";
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
import { selectPayment } from "../store/slices/payment";

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
  const { product_name, product_price, product_quantity } = paymentData;

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [data, setData] = useState<UserDataProps>({
    product_name: product_name,
    product_price: product_price,
    product_quantity: product_quantity,
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
  });

  const [currentStep, setCurrentStep] = useState(0);
  const handleClose = () => {
    onClose(selectedValue);
  };

  // const makeRequest = (formData: UserDataProps) => {
  //   console.log("form submitted", formData);
  // };

  const handleNextStep = (newData: UserDataProps, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      // makeRequest(newData);
      onClose(selectedValue);
      setOpenBackdrop(true);
    } else if (currentStep + 1 < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = (newData: UserDataProps) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const formContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <UserInfoForm
            next={handleNextStep}
            handleClose={handleClose}
            data={data}
            setData={setData}
          />
        );
      case 1:
        return (
          <CreditCardForm
            prev={handlePrevStep}
            next={handleNextStep}
            data={data}
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
