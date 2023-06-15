import { useLoginPopup } from "@bitmetro/auth-react";
import { Button } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const openLoginPopup = useLoginPopup();

  const handleLoginClick = async () => {
    openLoginPopup(() => router.push(router.query.fwd as string));
  }

  return (
    <Button onClick={handleLoginClick}>
      Login
    </Button>
  )
}

LoginPage.getInitialProps = () => ({});

export default LoginPage;
