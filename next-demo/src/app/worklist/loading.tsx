export default function Loading() {
  const placeholders = Array.from({ length: 5 });

  return (
    <>
      {placeholders.map((_, idx) => (
        <li
          key={idx}
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
            <div
              style={{
                height: 18,
                width: "40%",
                background: "#e5e7eb",
                borderRadius: 4
              }}
            />
            <div
              style={{
                height: 12,
                width: 80,
                background: "#f3f4f6",
                borderRadius: 4
              }}
            />
          </div>
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                height: 12,
                width: "90%",
                background: "#f3f4f6",
                borderRadius: 4,
                marginBottom: 6
              }}
            />
            <div
              style={{
                height: 12,
                width: "70%",
                background: "#f3f4f6",
                borderRadius: 4
              }}
            />
          </div>
        </li>
      ))}
    </>
  );
}
