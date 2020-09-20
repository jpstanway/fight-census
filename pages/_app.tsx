import { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyle from "../styles/globalStyle";

import { initializeCards } from "../redux/cards/actions";

import Head from "next/head";
import Layout from "../components/Layout/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore();
  store.dispatch<any>(initializeCards());

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Fight Census</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
