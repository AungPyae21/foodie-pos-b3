import "../styles/globals.css";
import { store } from "@/store/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeWrapper>
      </Provider>
    </SessionProvider>
  );
}
