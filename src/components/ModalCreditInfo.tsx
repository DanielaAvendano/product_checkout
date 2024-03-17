import { useState } from "react";
import {
  // Button,
  Dialog,
  // DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

import { UserInfoForm } from "./UserInfoForm";
import { CreditCardForm } from "./CreditCardForm";
import { UserDataProps } from "../interfaces";
import { useSelector } from "react-redux";
import { selectPayment } from "../store/slices/payment";

interface ModalCreditInfoProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const steps = ["Personal Info", "Credit card Info"];

export const ModalCreditInfo = (props: ModalCreditInfoProps) => {
  const { onClose, selectedValue, open } = props;

  const paymentData = useSelector(selectPayment);

  console.log("paymentData", paymentData);

  const [data, setData] = useState<UserDataProps>({
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

  const makeRequest = (formData: UserDataProps) => {
    console.log("form submitted", formData);
  };

  const handleNextStep = (newData: UserDataProps, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
    }
    setCurrentStep((prev) => prev + 1);
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
      // default:
      //   return <div>404: Not Found</div>;
    }
  };

  return (
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
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions> */}
    </Dialog>
  );
};
