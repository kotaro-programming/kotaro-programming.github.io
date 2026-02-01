import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

const siteTitle = "Complexity";
const siteDescription = "Blog and generative design sketches.";

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  title,
  description,
}: LayoutProps) {
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description ?? siteDescription;

  return (
    <div className="page">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <header className="header">
        <div className="container nav">
          <Link className="brand" href="/">
            {siteTitle}
          </Link>
          <nav className="nav-links">
            <Link href="/p5">Generative Design</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container fade-in">{children}</div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>© Complexity</p>
        </div>
      </footer>
    </div>
  );
}
