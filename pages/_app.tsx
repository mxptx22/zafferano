import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/cormorant-infant/700.css";
import "@fontsource/cormorant-infant/600.css";
import "@fontsource/cormorant-infant/500.css";
import "@fontsource/cormorant-infant/400.css";
import "@fontsource/cormorant-infant/300.css";

import "@fontsource/yaldevi/700.css";
import "@fontsource/yaldevi/600.css";
import "@fontsource/yaldevi/500.css";
import "@fontsource/yaldevi/400.css";
import "@fontsource/yaldevi/300.css";
import "@fontsource/yaldevi/200.css";

import "@fontsource/material-icons-outlined";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
