import Link from "next/link";
import { P5ListItem } from "@/lib/content";
import { formatDate } from "@/lib/format";

type P5CardProps = {
  post: P5ListItem;
};

export default function P5Card({ post }: P5CardProps) {
  return (
    <Link className="card p5-card" href={`/p5/${post.slug}`}>
      <article>
        {post.thumbnail ? (
          <img src={post.thumbnail} alt={post.title} />
        ) : (
          <div style={{ height: 160, background: "#e8e0d5" }} />
        )}
        <div className="p5-body">
          <div className="meta">
            <small>{formatDate(post.date)}</small>
          </div>
          <h3 className="post-title">{post.title}</h3>
          {post.summary ? <p className="post-summary">{post.summary}</p> : null}
        </div>
      </article>
    </Link>
  );
}
