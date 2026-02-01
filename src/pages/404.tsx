import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout title="Not Found">
      <section className="section">
        <h1 className="section-title">Page not found</h1>
        <p className="post-summary">
          The page you requested does not exist.
        </p>
        <Link href="/">Back to home →</Link>
      </section>
    </Layout>
  );
}
