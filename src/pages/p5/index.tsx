import Layout from "@/components/Layout";
import P5Card from "@/components/P5Card";
import Pagination from "@/components/Pagination";
import { getP5List, P5ListItem } from "@/lib/content";

type P5IndexProps = {
  posts: P5ListItem[];
  totalPages: number;
};

const POSTS_PER_PAGE = 8;

export default function P5Index({ posts, totalPages }: P5IndexProps) {
  return (
    <Layout title="Generative Design">
      <section className="section">
        <h1 className="section-title">Generative Design</h1>
        <div className="grid">
          {posts.map((post) => (
            <P5Card key={post.slug} post={post} />
          ))}
        </div>
        <Pagination basePath="/p5" currentPage={1} totalPages={totalPages} />
      </section>
    </Layout>
  );
}

export const getStaticProps = () => {
  const posts = getP5List();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const firstPage = posts.slice(0, POSTS_PER_PAGE);
  return { props: { posts: firstPage, totalPages } };
};
