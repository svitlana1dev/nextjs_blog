import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { Post } from "@/types/post";

interface CustomPageProps {
  post: Post;
}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
