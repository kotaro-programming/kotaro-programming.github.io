import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getBlogList, BlogListItem } from "@/lib/content";

type BlogIndexProps = {
  posts: BlogListItem[];
  totalPages: number;
};

const POSTS_PER_PAGE = 8;

export default function BlogIndex({ posts, totalPages }: BlogIndexProps) {
  return (
    <Layout title="Blog">
      <section className="section">
        <h1 className="section-title">Blog</h1>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        <Pagination basePath="/blog" currentPage={1} totalPages={totalPages} />
      </section>
    </Layout>
  );
}

export const getStaticProps = () => {
  const posts = getBlogList();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const firstPage = posts.slice(0, POSTS_PER_PAGE);
  return { props: { posts: firstPage, totalPages } };
};
