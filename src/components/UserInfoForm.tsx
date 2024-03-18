import { Button, FormHelperText, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import PhoneInputField from "./PhoneInput";
import { UserDataProps } from "../interfaces";
import { selectPayment, updateUserData } from "../store/slices/payment";

interface UserInfoProps {
  next: (newData: UserDataProps) => void;
  data: UserDataProps;
  setData: React.Dispatch<React.SetStateAction<UserDataProps>>;
  handleClose: () => void;
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
  phone_number: yup.object().shape({
    countryCode: yup.string().required("Country code is required"),
    number: yup.string().required("Phone number is required"),
  }),
});

export const UserInfoForm = (props: UserInfoProps) => {
  const { next, data, handleClose } = props;

  const dispatch = useDispatch();
  const paymentData = useSelector(selectPayment);

  const handleSubmit = (values: UserDataProps) => {
    next(values);
    console.log("values", values);
    dispatch(updateUserData({ ...paymentData, ...values }));
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

          <Stack direction="row" justifyContent={"space-between"} marginY={2}>
            <Button type="button" variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
