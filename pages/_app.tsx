import { NextPage } from "next";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { ThemeProvider } from "styled-components";

import theme from "../styles/theme";
import GlobalStyle from "../styles/globalStyle";

import Head from "next/head";
import Layout from "../components/Layout/Layout";

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>Fight Census</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <GlobalStyle />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default wrapper.withRedux(App);
