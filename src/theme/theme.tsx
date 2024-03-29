import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: "#43129a",
    },
    secondary: {
      main: "#543884",
    },
    error: {
      main: red.A400,
    },
  },
});
