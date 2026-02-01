import { BlogListItem } from "@/lib/content";
import { formatDate } from "@/lib/format";
import Link from "next/link";

type PostCardProps = {
  post: BlogListItem;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link className="card" href={`/blog/${post.slug}`}>
      <article>
        <div className="meta">
          {post.category ? <span className="badge">{post.category}</span> : null}
          <small>{formatDate(post.date)}</small>
        </div>
        <h3 className="post-title">{post.title}</h3>
        {post.summary ? <p className="post-summary">{post.summary}</p> : null}
      </article>
    </Link>
  );
}
