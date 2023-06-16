import { FetchStatus } from "@bitmetro/create-query";
import React, { useState } from "react";

interface IStatusContext {
  status: FetchStatus | undefined;
  isFetching: boolean;
  errorMessage?: string;
  setStatus: (status: FetchStatus, errorMessage?: string) => void;
}

const StatusContext = React.createContext<IStatusContext>({
  status: undefined,
  isFetching: false,
  setStatus: () => {},
})

export const StatusProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<FetchStatus | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  return (
    <StatusContext.Provider
      value={{
        status,
        isFetching: status === "fetching",
        errorMessage,
        setStatus: (status, errorMessage) => {
          setStatus(status);
          setErrorMessage(errorMessage);
        }
      }}
    >
      {children}
    </StatusContext.Provider>
  )
}

export const useStatus = () => React.useContext(StatusContext);
