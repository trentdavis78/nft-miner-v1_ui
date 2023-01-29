import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import { JsonRpc } from 'eosjs';
 import { Anchor } from 'ual-anchor';
import { Wax } from '@nefty/ual-wax';
import { UALProvider } from 'ual-reactjs-renderer';
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const appName = "waxdao";

  const chains = {
    chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    rpcEndpoints: [
      {
        protocol: 'https',
        host: 'wax.greymass.com',
        port: 443,
      }
    ],
  }


  const anchor = new Anchor([chains], { appName: appName });
  const wcw = new Wax([chains]);
  return (
    <SessionProvider session={session}>
      <RWBProvider>
        <div className={cx(sfPro.variable, inter.variable)}>
        <UALProvider
      appName={appName}
      authenticators={[anchor, wcw]}
      chains={[chains]}
    >
          <Component {...pageProps} />
          </UALProvider>
        </div>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
  );
}
