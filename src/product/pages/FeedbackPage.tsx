import { Button, Grid, Typography } from "@mui/material";
import { MainLayout } from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";

export const FeedbackPage = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Typography variant="h5" textAlign="center">
            Successful Transaction
          </Typography>
        </Grid>
        <Grid item xs={3} mt={3}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Continue shopping
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
