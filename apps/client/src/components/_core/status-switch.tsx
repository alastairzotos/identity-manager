import { FetchStatus } from "@bitmetro/create-query";
import { Alert, LinearProgress } from "@mui/material";
import React from "react";

interface Props {
  status: FetchStatus | undefined;
  fetching?: React.ReactNode;
  error?: React.ReactNode;
}

export const StatusSwitch: React.FC<React.PropsWithChildren<Props>> = ({
  status,
  fetching = <LinearProgress />,
  error = <Alert severity="warning">There was an unexpected error</Alert>,
  children
}) => {
  return (
    <>
      {status === 'fetching' && fetching}
      {status === 'error' && error}
      {status === 'success' && children}
    </>
  )
}
