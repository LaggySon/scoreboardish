import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "../styles/globals.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <style>
          @import url(
          {
            "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
          }
          );
        </style>
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
