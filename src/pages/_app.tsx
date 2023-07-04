import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "../styles/globals.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [sender, setSender] = useState("");
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    router.push("/TranquilityGaming/tally");
  };
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
        <link
          rel="preload"
          href="/fonts/Industry-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@600&display=swap"
          rel="stylesheet"
        />
        <title>Scoreboardish</title>
      </Head>

      <Component
        handleLoginChange={(e: any) => setSender(e.target.value)}
        sender={sender}
        handleLogin={handleLogin}
        {...pageProps}
      />
    </>
  );
};

export default MyApp;
