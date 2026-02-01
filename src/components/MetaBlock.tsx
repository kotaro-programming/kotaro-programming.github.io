import { ItemMeta } from "@/lib/content";

const labelMap: Record<keyof ItemMeta, string> = {
  title: "Title",
  creator: "Creator",
  released: "Released",
  medium: "Medium",
};

type MetaBlockProps = {
  item: ItemMeta;
};

export default function MetaBlock({ item }: MetaBlockProps) {
  const entries = Object.entries(item).filter(([, value]) => value);
  if (entries.length === 0) {
    return null;
  }

  return (
    <aside className="meta-block">
      {entries.map(([key, value]) => (
        <p key={key}>
          <strong>{labelMap[key as keyof ItemMeta]}:</strong> {value as string}
        </p>
      ))}
    </aside>
  );
}
