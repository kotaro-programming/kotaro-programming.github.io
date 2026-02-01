import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");
const p5Dir = path.join(process.cwd(), "content", "p5");

export type ItemMeta = {
  title?: string;
  creator?: string;
  released?: string;
  medium?: string;
};

export type BlogFrontmatter = {
  title: string;
  date: string;
  category?: string;
  tags?: string[];
  summary?: string;
  item?: ItemMeta;
};

export type BlogListItem = BlogFrontmatter & {
  slug: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
};

export type P5Frontmatter = {
  title: string;
  date: string;
  theme?: string;
  tags?: string[];
  thumbnail?: string;
  sketch?: string;
  summary?: string;
};

export type P5ListItem = P5Frontmatter & {
  slug: string;
};

export type P5Post = P5Frontmatter & {
  slug: string;
  content: string;
};

const readMarkdownFiles = (directory: string) => {
  if (!fs.existsSync(directory)) {
    return [] as string[];
  }
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"));
};

export const getBlogSlugs = () =>
  readMarkdownFiles(blogDir).map((file) => file.replace(/\.md$/, ""));

export const getP5Slugs = () =>
  readMarkdownFiles(p5Dir).map((file) => file.replace(/\.md$/, ""));

const sortByDateDesc = <T extends { date: string }>(items: T[]) => {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return bTime - aTime;
  });
};

export const getBlogList = (): BlogListItem[] => {
  const files = readMarkdownFiles(blogDir);
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(blogDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    return {
      slug,
      ...(data as BlogFrontmatter),
    };
  });

  return sortByDateDesc(posts);
};

export const getBlogPostBySlug = (slug: string): BlogPost => {
  const fullPath = path.join(blogDir, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    ...(data as BlogFrontmatter),
    content,
  };
};

export const getP5List = (): P5ListItem[] => {
  const files = readMarkdownFiles(p5Dir);
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(p5Dir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    return {
      slug,
      ...(data as P5Frontmatter),
    };
  });

  return sortByDateDesc(posts);
};

export const getP5PostBySlug = (slug: string): P5Post => {
  const fullPath = path.join(p5Dir, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    ...(data as P5Frontmatter),
    content,
  };
};
