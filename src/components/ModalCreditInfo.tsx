import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

import { UserInfoForm } from "./UserInfoForm";
import { CreditCardForm } from "./CreditCardForm";

interface ModalCreditInfoProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
export interface UserDataProps {
  full_name: string;
  email: string;
  phone_number: {
    countryCode: string;
    number: string;
  };
}

const steps = ["Personal Information", "Credit card Info"];

export const ModalCreditInfo = (props: ModalCreditInfoProps) => {
  const { onClose, selectedValue, open } = props;

  const [data, setData] = useState<UserDataProps>({
    full_name: "",
    email: "",
    phone_number: { countryCode: "CO", number: "" },
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
          <UserInfoForm next={handleNextStep} data={data} setData={setData} />
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
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Fill out you data</DialogTitle>

      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <DialogContentText marginLeft={3} marginTop={5}>
        Please enter your personal data in this form.
      </DialogContentText>
      <DialogContent>{formContent(currentStep)}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
