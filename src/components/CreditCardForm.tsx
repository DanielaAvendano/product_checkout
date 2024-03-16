import { Button, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { UserDataProps } from "./ModalCreditInfo";

interface CreditCardFormProps {
  prev: (newData: UserDataProps) => void;
  next: (newData: UserDataProps, final: boolean) => void;
  data: UserDataProps;
}

export const CreditCardForm = (props: CreditCardFormProps) => {
  const { prev, next, data } = props;

  const handleSubmit = (values: UserDataProps) => {
    next(values, true);
  };
  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          <p>Segundo paso del form</p>
          <TextField fullWidth id="fullname" name="fullname" label="fullname" />

          <Button
            type="button"
            onClick={() => prev(values)}
            variant="contained"
          >
            Back
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
