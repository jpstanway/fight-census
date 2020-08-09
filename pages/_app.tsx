import type { AppProps /*, AppContext */ } from "next/app";
import { ThemeProvider } from "styled-components";

import theme from "../styles/theme";
import "../styles/globals.css";

import Layout from "../components/Layout/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
