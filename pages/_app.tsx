import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayOut from "@/components/layouts";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LayOut>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </LayOut>
    </QueryClientProvider>
  );
}

export default MyApp;
