import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { NavBar } from "../ui";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Container fixed>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};
