
export const getAxiosError = (error: any) =>
  error?.response?.data?.message || "There was an unexpected error";
