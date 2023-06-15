import "../styles/globals.css";

import { useRouter } from "next/router";
import { AuthProvider, useCheckAuthState, useLoggedInUser, useLogout } from "@bitmetro/auth-react";

import { AppProps } from "next/app";
import { AppLayoutProvider, createNavMenuItem } from '@bitmetro/app-layout-antd';
import { DeploymentUnitOutlined, ApiOutlined } from '@ant-design/icons';

import { Button, ConfigProvider, Space, Typography, theme } from "antd";
import { urls } from "@/urls";
import { getPropertyById } from "@/clients/properties.client";

const { Text } = Typography;

const { darkAlgorithm } = theme;

const Inner = ({ Component, pageProps }: AppProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const handleLogout = useLogout();
  const loggedInUser = useLoggedInUser();

  useCheckAuthState(({ accessToken }) => {
    if (!accessToken && !router.pathname.startsWith('/login')) {
      router.push(urls.login(router.asPath.split('?')[0]));
    }
  }, [router.asPath])

  return (
    <AppLayoutProvider
      title="Identity Manager"
      logo="/bm-logo-new-white.png"
      logoAlt="BitMetro logo"
      homeUrl={urls.home()}
      navItems={[
        createNavMenuItem("Properties", urls.properties.home(), <DeploymentUnitOutlined />),
        createNavMenuItem("API Keys", urls.apiKeys.home(), <ApiOutlined />),
      ]}
      breadcrumbResolvers={{
        "[propertyId]": async (id) => (await getPropertyById(id)).name,
      }}
      appBar={(
        loggedInUser && (
          <Space>
            <Text>Logged in as {loggedInUser.details.first_name}</Text>
            <Button onClick={handleLogout}>Logout</Button>
          </Space>
        )
      )}
      appBarStyles={{ backgroundColor: colorBgContainer }}
    >
      <Component {...pageProps} />
    </AppLayoutProvider>
  )
}

const AppPage = (props: AppProps) => {
  return (
    <AuthProvider localStorageKey="@id-manager:access-token" propertyId="bitmetro.identity-manager" idServiceUrl="http://localhost:5002">
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm
        }}
      >
        <Inner {...props} />
      </ConfigProvider>
    </AuthProvider>
  )
}

export default AppPage;
