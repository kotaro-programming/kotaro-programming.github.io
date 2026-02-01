import { GetStaticPaths } from "next";
import Layout from "@/components/Layout";
import P5Canvas from "@/components/P5Canvas";
import { getP5PostBySlug, getP5Slugs, P5Post } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { formatDate } from "@/lib/format";

type P5DetailProps = {
  post: P5Post;
  contentHtml: string;
};

export default function P5Detail({ post, contentHtml }: P5DetailProps) {
  return (
    <Layout title={post.title} description={post.summary}>
      <article className="section">
        <div className="meta">
          <small>{formatDate(post.date)}</small>
          {post.theme ? <span className="badge">{post.theme}</span> : null}
        </div>
        <h1 className="section-title" style={{ marginTop: 12 }}>
          {post.title}
        </h1>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        {post.sketch ? <P5Canvas sketch={post.sketch} /> : null}
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getP5Slugs().map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const post = getP5PostBySlug(params.slug);
  const contentHtml = await markdownToHtml(post.content);

  return {
    props: {
      post,
      contentHtml,
    },
  };
};
