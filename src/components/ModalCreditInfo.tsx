import { Dialog, DialogTitle, Step, StepLabel, Stepper } from "@mui/material";
import { WithMaterialUI } from "./UserInfoForm";

const steps = ["personal", "card info"];
interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const ModalCreditInfo = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Fill out you data</DialogTitle>

      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <WithMaterialUI />
    </Dialog>
  );
};
