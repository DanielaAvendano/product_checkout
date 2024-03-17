import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field } from "formik";

import { getCountries } from "react-phone-number-input";

const PhoneInputField = () => {
  return (
    <Field
      as={TextField}
      type="tel"
      name="phone_number.number"
      fullWidth
      margin="dense"
      variant="outlined"
      label="Phone number"
      color="primary"
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-8px" }}
          >
            <Field
              as={Select}
              name="phone_number.countryCode"
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
              {getCountries().map((country) => {
                return (
                  <MenuItem key={country} value={country}>
                    <Typography>+{country}</Typography>
                  </MenuItem>
                );
              })}
            </Field>
          </InputAdornment>
        ),
      }}
    ></Field>
  );
};

export default PhoneInputField;
