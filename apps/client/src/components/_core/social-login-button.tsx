import { Box, Button } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const SocialLoginButton: React.FC<Props> = ({ title, icon, onClick, disabled }) => {
  return (
    <Button
      sx={{ width: '100%' }}
      size="large"
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        {icon}
        {title}
      </Box>
    </Button>
  )
}
