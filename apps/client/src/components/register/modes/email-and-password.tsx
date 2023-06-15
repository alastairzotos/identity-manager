import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { IRegisterEmailPasswordSchema, registerEmailPasswordSchema } from "@/schemas";
import { Alert, Box, Button, TextField } from "@mui/material";
import { IProperty, WithId } from "@bitmetro/identity";
import { useRegisterWithEmailAndPassword } from "@/state/identity";
import Link from "next/link";
import { getForwardUrl } from "@/utils";
import { useReturnWithAccessToken } from "@/hooks/return.hook";

interface Props {
  property: WithId<IProperty>;
}

export const RegisterWithEmailAndPassword: React.FC<Props> = ({ property }) => {
  const returnWithAccessToken = useReturnWithAccessToken();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<IRegisterEmailPasswordSchema>({
    mode: "onChange",
    resolver: zodResolver(registerEmailPasswordSchema)
  })

  const {
    status: registerStatus,
    request: register,
    value: registerResult,
    error: registerError
  } = useRegisterWithEmailAndPassword();

  const { userDetails } = property;

  const onSubmit = async (data: IRegisterEmailPasswordSchema) => {
    await register({
      propertyId: property._id,
      email: data.email!,
      password: data.password,
      details: data.details || {},
    });
  }

  useEffect(() => {
    if (registerStatus === "success") {
      returnWithAccessToken(registerResult?.accessToken || "");
    }
  }, [registerStatus]);

  if (registerStatus === "success") {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Alert severity="success">Thank you for registering with {property.name}. You will receive a verification email shortly.</Alert>

        <Button LinkComponent={Link} href={getForwardUrl()} variant="outlined">
          Return
        </Button>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {registerStatus === "error" && (
          <Alert severity="warning">{registerError.response?.data?.message || "There was an unexpected error"}</Alert>
        )}

        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              type="email"
              inputRef={ref}
              label="Your email"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
              {...field}
            />
          )}
        />

        {userDetails.includes("first_name") && (
          <Controller
            name="details.first_name"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                inputRef={ref}
                label="Your first name"
                error={!!errors.details?.first_name}
                helperText={errors.details?.first_name?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
        )}

        {userDetails.includes("last_name") && (
          <Controller
            name="details.last_name"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                inputRef={ref}
                label="Your last name"
                error={!!errors.details?.last_name}
                helperText={errors.details?.last_name?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
        )}

        {userDetails.includes("display_name") && (
          <Controller
            name="details.display_name"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                inputRef={ref}
                label="Username"
                error={!!errors.details?.display_name}
                helperText={errors.details?.display_name?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
        )}

        <Controller
          name="password"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              type="password"
              inputRef={ref}
              label="Your password"
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isSubmitting}
              {...field}
            />
          )}
        />

        <Controller
          name="repeatPassword"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              type="password"
              inputRef={ref}
              label="Repeat password"
              error={!!errors.repeatPassword}
              helperText={errors.repeatPassword?.message}
              disabled={isSubmitting}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
          size="large"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </form>
  )
}
