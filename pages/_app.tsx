import "../styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/yrsa";

import "@fontsource/frank-ruhl-libre";

import "@fontsource/cormorant-infant/300.css";

import "@fontsource/yaldevi/700.css";
import "@fontsource/yaldevi/600.css";
import "@fontsource/yaldevi/500.css";
import "@fontsource/yaldevi/400.css";
import "@fontsource/yaldevi/300.css";
import "@fontsource/yaldevi/200.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
