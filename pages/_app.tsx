import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/cormorant/700.css";
import "@fontsource/cormorant/600.css";
import "@fontsource/cormorant/500.css";
import "@fontsource/cormorant/400.css";
import "@fontsource/cormorant/300.css";

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
