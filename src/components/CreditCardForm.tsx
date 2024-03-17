import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { UserDataProps } from "../interfaces";
import { updateUserData } from "../store/slices/payment";
import { useDispatch } from "react-redux";

interface CreditCardFormProps {
  prev: (newData: UserDataProps) => void;
  next: (newData: UserDataProps, final: boolean) => void;
  data: UserDataProps;
}

const idTypes: string[] = ["CC", "TI", "Passport"];

const numberOfPayments: number[] = Array.from(
  { length: 72 },
  (_, index) => index + 1
);
const CreditCardFormValidationSchema = yup.object({
  credit_card_number: yup
    .string()
    .matches(/^[0-9\s]*$/, "Wront format, numbers only")
    .required("Can´t be blank")
    .min(19, "Min. 16 characters")
    .max(19, "Max. 16 characters"),
  card_holder_name: yup.string().required("Can´t be blank"),
  month: yup
    .string()
    .required("Can´t be blank")
    .matches(/^[0-9]+$/, "Numbers only")
    .test("month-range", "Between 1-12", (value) => {
      return parseInt(value) >= 1 && parseInt(value) <= 12;
    }),
  year: yup
    .string()
    .required("Can´t be blank")
    .matches(/^[0-9]+$/, "Numbers only")
    .min(2, "Min. 2 characters"),
  cvc: yup
    .string()
    .required("Can´t be blank")
    .matches(/^[0-9]+$/, "Numbers only")
    .min(3, "Min. 3 characters"),
  number_of_payments: yup.number().required("Can´t be blank"),
  accept_terms_and_conditions: yup.bool().required("Please accept"),
});

export const CreditCardForm = (props: CreditCardFormProps) => {
  const { prev, next, data } = props;

  const dispatch = useDispatch();

  const handleSubmit = (values: UserDataProps) => {
    next(values, true);
    dispatch(updateUserData(values));
    console.log("values", values);
  };
  return (
    <>
      <Typography variant="h6"> Credit card payment </Typography>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={CreditCardFormValidationSchema}
      >
        {({ values }) => (
          <Form>
            <FormHelperText>Credit card number</FormHelperText>
            <Field
              as={TextField}
              fullWidth
              margin="dense"
              id="credit_card_number"
              inputMode="numeric"
              name="credit_card_number"
              maxLength={19}
              placeholder="e.g. 1234 5678 9123 0000"
            />
            <ErrorMessage name="credit_card_number">
              {(msg) => <FormHelperText error>{msg}</FormHelperText>}
            </ErrorMessage>

            <Grid container spacing={1}>
              <Grid item xs={4}>
                <FormHelperText>Month</FormHelperText>
                <Field
                  as={TextField}
                  margin="dense"
                  id="month"
                  name="month"
                  placeholder="5"
                />

                <ErrorMessage name="month">
                  {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
              </Grid>
              <Grid item xs={4}>
                <FormHelperText>Year</FormHelperText>
                <Field
                  as={TextField}
                  margin="dense"
                  id="year"
                  name="year"
                  placeholder="2024"
                />

                <ErrorMessage name="year">
                  {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
              </Grid>
              <Grid item xs={4}>
                <FormHelperText>CVC</FormHelperText>
                <Field
                  as={TextField}
                  margin="dense"
                  id="cvc"
                  name="cvc"
                  placeholder="000"
                />

                <ErrorMessage name="cvc">
                  {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
              </Grid>
              <Grid item xs={12}>
                <FormHelperText>Card Holder Name</FormHelperText>
                <Field
                  as={TextField}
                  fullWidth
                  margin="dense"
                  id="card_holder_name"
                  name="card_holder_name"
                  placeholder="John Doe"
                />

                <ErrorMessage name="card_holder_name">
                  {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
              </Grid>

              <Grid item xs={12}>
                <FormHelperText>Id</FormHelperText>
                <Field
                  fullWidth
                  as={TextField}
                  name="user_id.id_number"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ marginRight: "2px", marginLeft: "-8px" }}
                      >
                        <Field
                          as={Select}
                          name="user_id.id_type"
                          MenuProps={{
                            style: {
                              height: "300px",
                              width: "360px",
                              top: "10px",
                              left: "-34px",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                          }}
                          sx={{
                            width: "max-content",
                            fieldset: {
                              display: "none",
                            },
                            '&.Mui-focused:has(div[aria-expanded="false"])': {
                              fieldset: {
                                display: "block",
                              },
                            },
                            ".MuiSelect-select": {
                              padding: "8px",
                              paddingRight: "24px !important",
                            },
                            svg: {
                              right: 0,
                            },
                          }}
                        >
                          {idTypes.map((i) => (
                            <MenuItem key={i} value={i}>
                              <Typography>{i}</Typography>
                            </MenuItem>
                          ))}
                        </Field>
                      </InputAdornment>
                    ),
                  }}
                ></Field>
                <ErrorMessage name="user_id.id_number">
                  {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
              </Grid>

              <Grid item xs={12}>
                <FormHelperText>Number of payments</FormHelperText>
                <Field
                  as={Select}
                  name="number_of_payments"
                  fullWidth
                  margin="dense"
                >
                  {numberOfPayments.map((num) => (
                    <MenuItem key={num} value={num}>
                      <Typography>{num}</Typography>
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="number_of_payments">
                  {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                </ErrorMessage>
              </Grid>
            </Grid>

            <Field
              type="checkbox"
              as={FormControlLabel}
              control={<Checkbox />}
              label="I accept I have read terms and conditions."
              id="accept_terms_and_conditions"
              name="accept_terms_and_conditions"
            />
            <Stack direction="row" justifyContent={"space-between"} marginY={4}>
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
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};
