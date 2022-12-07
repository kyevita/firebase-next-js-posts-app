import Link from "next/link";
import { Post } from "../models/posts";
import ReactMarkdown from "react-markdown";

export default function PostContent({ post }: { post?: Post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Writen By{" "}
        <Link href={`/${post.username}`}>
          <a className="text-info">{post.username}</a>
        </Link>{" "}
        on {createdAt.toISOString()}
      </span>

      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
