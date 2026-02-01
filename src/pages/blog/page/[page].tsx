import { GetStaticPaths } from "next";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getBlogList, BlogListItem } from "@/lib/content";

type BlogPageProps = {
  posts: BlogListItem[];
  currentPage: number;
  totalPages: number;
};

const POSTS_PER_PAGE = 8;

export default function BlogPage({
  posts,
  currentPage,
  totalPages,
}: BlogPageProps) {
  return (
    <Layout title={`Blog Page ${currentPage}`}>
      <section className="section">
        <h1 className="section-title">Blog</h1>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        <Pagination
          basePath="/blog"
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getBlogList();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
  const paths = pages.map((page) => ({ params: { page: String(page) } }));

  return { paths, fallback: false };
};

export const getStaticProps = ({ params }: { params: { page: string } }) => {
  const currentPage = Number(params.page);
  const posts = getBlogList();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paged = posts.slice(start, start + POSTS_PER_PAGE);

  return {
    props: {
      posts: paged,
      currentPage,
      totalPages,
    },
  };
};
