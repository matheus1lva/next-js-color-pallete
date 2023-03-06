import Link from "next/link";

export function Header() {
  return (
    <div
      style={{
        padding: "6px",
        backgroundColor: "#ccc",
        display: "flex",
        gap: 6,
        color: "blue",
      }}
    >
      <Link href={"/"}>Home</Link>
      <Link href={"/general"}>General</Link>
    </div>
  );
}
