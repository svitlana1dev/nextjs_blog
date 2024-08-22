import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { Post } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles: string[] = getPostsFiles();

  const allPosts: Post[] = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA: Post, postB: Post) =>
    postA.date! > postB.date! ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post: Post) => post.isFeatured);

  return featuredPosts;
}
