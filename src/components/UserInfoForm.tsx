import { Button, FormHelperText, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { UserDataProps } from "./ModalCreditInfo";
import PhoneInputField from "./PhoneInput";

interface UserInfoProps {
  next: (newData: UserDataProps) => void;
  data: UserDataProps;
  setData: React.Dispatch<React.SetStateAction<UserDataProps>>;
}

const UserInfoValidationSchema = yup.object({
  full_name: yup
    .string()
    .min(7, "Mininum name characters are 7")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const UserInfoForm = (props: UserInfoProps) => {
  const { next, data } = props;

  const handleSubmit = (values: UserDataProps) => {
    next(values);
    console.log("values", values);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={UserInfoValidationSchema}
    >
      {({ errors }) => (
        <Form>
          <Field
            as={TextField}
            fullWidth
            margin="dense"
            id="full_name"
            name="full_name"
            label="Full Name"
            error={!!errors.full_name}
          />
          <ErrorMessage name="full_name">
            {(msg) => <FormHelperText error>{msg}</FormHelperText>}
          </ErrorMessage>
          <Field
            as={TextField}
            fullWidth
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            error={!!errors.email}
          />
          <ErrorMessage name="email">
            {(msg) => <FormHelperText error>{msg}</FormHelperText>}
          </ErrorMessage>

          <PhoneInputField />

          <Button type="submit" variant="contained">
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};
