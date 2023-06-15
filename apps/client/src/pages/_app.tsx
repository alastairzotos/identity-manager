import { AppProps } from "next/app";
import Head from "next/head";

function Inner({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

function AppPage(props: AppProps) {
  return <Inner {...props} />;
}

export default AppPage;
