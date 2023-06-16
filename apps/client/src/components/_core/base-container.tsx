import { useIsDesktop } from "@/hooks/is-desktop.hook";
import { Container, Paper } from "@mui/material";
import React from "react";

export const BaseContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <Container maxWidth="sm">
        <Paper sx={{ p: 5, mt: 10 }}>
          {children}
        </Paper>
      </Container>
    );
  }

  return (
    <Paper sx={{ p: 5, pt: 2, height: '100vh' }}>
      {children}
    </Paper>
  )
};
