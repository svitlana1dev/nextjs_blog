import { Post } from "@/types/post";
import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

type Props = {
  posts: Post[];
};

function FeaturedPosts(props: Props) {
  const { posts } = props;

  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
