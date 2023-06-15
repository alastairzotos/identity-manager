import { RegisterForm } from "@/components/register";
import { NextPage } from "next";

const RegisterPage: NextPage = () => {
  return <RegisterForm />
}

RegisterPage.getInitialProps = () => ({});

export default RegisterPage;
