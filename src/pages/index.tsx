import Link from "next/link";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import P5Card from "@/components/P5Card";
import { getBlogList, getP5List, BlogListItem, P5ListItem } from "@/lib/content";

type HomeProps = {
  latestPosts: BlogListItem[];
  featuredP5: P5ListItem[];
};

export default function Home({ latestPosts, featuredP5 }: HomeProps) {
  return (
    <Layout>
      <section className="section">
        <h2 className="section-title">Generative Design</h2>
        <div className="grid">
          {featuredP5.map((post) => (
            <P5Card key={post.slug} post={post} />
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Link href="/p5">View all works →</Link>
        </div>
      </section>

      <section className="section">
        <h1 className="section-title">Latest Blog Entries</h1>
        {latestPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        <div style={{ marginTop: 16 }}>
          <Link href="/blog">View all posts →</Link>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps = () => {
  const latestPosts = getBlogList().slice(0, 3);
  const featuredP5 = getP5List().slice(0, 4);

  return {
    props: {
      latestPosts,
      featuredP5,
    },
  };
};
