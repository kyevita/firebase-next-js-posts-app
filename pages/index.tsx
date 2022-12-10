import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Loader from "../components/Loader";
import PostFeed from "../components/PostFeed";
import { fromMillis } from "../lib/firebase";
import { getPosts, Post, PostQueryOptions } from "../models/posts";
import styles from "../styles/Home.module.css";

const LIMIT = 1;
const DEFAULT_POST_SEARCH: PostQueryOptions = {
  where: [["published", "==", true]],
  orderBy: ["createdAt", "desc"],
  limit: LIMIT,
};

export async function getServerSideProps(context) {
  const posts = await getPosts(DEFAULT_POST_SEARCH);

  return {
    props: { posts },
  };
}

export default function Home(props: { posts: Post[] }) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(posts.length === 0);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const newPosts = await getPosts({
      ...DEFAULT_POST_SEARCH,
      startAfter: cursor,
    });

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load More</button>
      )}
      <Loader show={loading} />
      {postsEnd && "You have reached the end!"}
    </main>
  );
}
