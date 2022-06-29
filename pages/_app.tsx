import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayOut from "@/components/layouts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayOut>
      <Component {...pageProps} />
    </LayOut>
  );
}

export default MyApp;
