import Link from "next/link";

const ids = Array.from({ length: 12 }, (_, i) => `jira:id-${i}`);

export default function Page() {
  // Control: href={`/items/${encodeURIComponent(id)}`} -> no loop.
  return (
    <ul>
      {ids.map((id) => (
        <li key={id}>
          <Link href={`/items/${id}`}>{id}</Link>
        </li>
      ))}
    </ul>
  );
}
