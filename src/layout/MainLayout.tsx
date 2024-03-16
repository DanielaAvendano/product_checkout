import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container component="section" maxWidth={"lg"}>
      <Box>{children}</Box>
    </Container>
  );
};
