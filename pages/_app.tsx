import type { AppProps /*, AppContext */ } from "next/app";
import { ThemeProvider } from "styled-components";

import theme from "../styles/theme";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
