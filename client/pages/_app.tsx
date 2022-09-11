import { deepPurple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.scss";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../networks/apollo";
import { PlayerProvider } from "../hooks/use-player";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[400],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={getApolloClient()}>
      <PlayerProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </PlayerProvider>
    </ApolloProvider>
  );
}

export default MyApp;
