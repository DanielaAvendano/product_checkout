import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";

export const NavBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          {/* <MenuOutlined /> */}
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6" noWrap>
              BuyMore.com
            </Typography>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
