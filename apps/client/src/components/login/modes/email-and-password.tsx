import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { ILoginEmailPasswordSchema, loginEmailPasswordSchema } from "@/schemas";
import { Alert, Box, Button, TextField, } from "@mui/material";
import { IProperty, WithId } from "@bitmetro/identity";
import { useLoginWithEmailAndPassword } from "@/state/identity";
import Link from "next/link";
import { getForwardUrl } from "@/utils";
import { useReturnWithAccessToken } from "@/hooks/return.hook";

interface Props {
  property: WithId<IProperty>;
}

export const LoginWithEmailAndPassword: React.FC<Props> = ({ property }) => {
  const returnWithAccessToken = useReturnWithAccessToken();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm<ILoginEmailPasswordSchema>({
    mode: "onChange",
    resolver: zodResolver(loginEmailPasswordSchema)
  })

  const {
    status: loginStatus,
    request: login,
    value: loginResult,
    error: loginError
  } = useLoginWithEmailAndPassword();

  useEffect(() => {
    if (loginStatus === "success") {
      returnWithAccessToken(loginResult?.accessToken || "");
    }
  }, [loginStatus]);

  const onSubmit = async (data: ILoginEmailPasswordSchema) => {
    await login({
      propertyId: property._id,
      email: data.email!,
      password: data.password,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loginStatus === "error" && (
          <Alert severity="warning">{loginError.response?.data?.message || "There was an unexpected error"}</Alert>
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

        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
          size="large"
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        <Button LinkComponent={Link} href={`/register?propertyId=${property.uniqueId}&fwd=${encodeURIComponent(getForwardUrl())}`}>
          Register
        </Button>
      </Box>
    </form>
  )
}
