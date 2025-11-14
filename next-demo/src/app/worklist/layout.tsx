import React from "react";

export default function WorklistLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
        作品列表
      </h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {children}
      </ul>
    </main>
  );
}
