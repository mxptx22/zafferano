import "../styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/yrsa/300.css";
import "@fontsource/yrsa/400.css";
import "@fontsource/yrsa/500.css";
import "@fontsource/yrsa/600.css";
import "@fontsource/yrsa/700.css";

import "@fontsource/frank-ruhl-libre/300.css";
import "@fontsource/frank-ruhl-libre/400.css";
import "@fontsource/frank-ruhl-libre/500.css";
import "@fontsource/frank-ruhl-libre/600.css";
import "@fontsource/frank-ruhl-libre/700.css";
import "@fontsource/frank-ruhl-libre/800.css";
import "@fontsource/frank-ruhl-libre/900.css";

import "@fontsource/cormorant-infant/300.css";

import "@fontsource/murecho/900.css";
import "@fontsource/murecho/800.css";
import "@fontsource/murecho/700.css";
import "@fontsource/murecho/600.css";
import "@fontsource/murecho/500.css";
import "@fontsource/murecho/400.css";
import "@fontsource/murecho/300.css";
import "@fontsource/murecho/200.css";
import "@fontsource/murecho/100.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
