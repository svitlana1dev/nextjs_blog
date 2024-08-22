import { Post } from "@/types/post";
import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

type Props = {
  posts: Post[];
};

function PostsGrid(props: Props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post: Post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
