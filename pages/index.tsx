import { Fragment } from "react";
import Head from "next/head";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";
import { Post } from "@/types/post";

type Props = {
  posts: Post[];
};

function HomePage(props: Props) {
  return (
    <Fragment>
      <Head>
        <title>Next Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
        s
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
