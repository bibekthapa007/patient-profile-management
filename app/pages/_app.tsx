import {
  ThemeProvider,
  ChakraProvider,
  theme,
  CSSReset,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import { createStandaloneToast } from "@chakra-ui/toast";

import { wrapper } from "../store/store";
import { useAppDispatch } from "store/hook";

import { fetchUserData } from "features/auth/AuthSlice";

const { ToastContainer } = createStandaloneToast();

function App({ Component, ...rest }: AppProps) {
  const title = Component.displayName || "Zendenta";
  const meta = "Patient Profile Management.";

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <FetchAppData>
        <ChakraProvider>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <Head>
              <title>{title}</title>
              <meta name="description" content={meta} />
              <link rel="icon" href="/favicon.ico" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
              />
            </Head>
            <ToastContainer />

            <Component {...props.pageProps} />
          </ThemeProvider>
        </ChakraProvider>
      </FetchAppData>
    </Provider>
  );
}

interface MyProps {
  children?: React.ReactNode;
}

function FetchAppData({ children }: MyProps) {
  let dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return <div>{children}</div>;
}

export default App;
