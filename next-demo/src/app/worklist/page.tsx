export default async function Worklist() {
  await new Promise((r) => setTimeout(r, 5000));

  const items = Array.from({ length: 10 }).map((_, index) => ({
    id: index + 1,
    title: `作品标题 ${index + 1}`,
    description: `这是作品 ${index + 1} 的简短描述信息，用于展示静态内容。`,
    date: `2025-11-${String(index + 1).padStart(2, "0")}`
  }));

  return (
    <>
      {items.map((item) => (
        <li
          key={item.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            background: "#fff"
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline"
            }}>
            <h2 style={{ fontSize: 18, margin: 0 }}>{item.title}</h2>
            <span style={{ color: "#6b7280", fontSize: 12 }}>{item.date}</span>
          </div>
          <p style={{ color: "#374151", marginTop: 8, marginBottom: 0 }}>
            {item.description}
          </p>
        </li>
      ))}
    </>
  );
}
