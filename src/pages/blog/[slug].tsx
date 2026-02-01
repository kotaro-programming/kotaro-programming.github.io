import { GetStaticPaths } from "next";
import Layout from "@/components/Layout";
import MetaBlock from "@/components/MetaBlock";
import {
  getBlogPostBySlug,
  getBlogSlugs,
  BlogPost,
} from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { formatDate } from "@/lib/format";

type BlogDetailProps = {
  post: BlogPost;
  contentHtml: string;
};

export default function BlogDetail({ post, contentHtml }: BlogDetailProps) {
  return (
    <Layout title={post.title} description={post.summary}>
      <article className="section">
        <div className="meta">
          {post.category ? <span className="badge">{post.category}</span> : null}
          <small>{formatDate(post.date)}</small>
        </div>
        <h1 className="section-title" style={{ marginTop: 12 }}>
          {post.title}
        </h1>
        {post.item ? <MetaBlock item={post.item} /> : null}
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getBlogSlugs().map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const post = getBlogPostBySlug(params.slug);
  const contentHtml = await markdownToHtml(post.content);

  return {
    props: {
      post,
      contentHtml,
    },
  };
};
