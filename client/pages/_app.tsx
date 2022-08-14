import { deepPurple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.scss";

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
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
