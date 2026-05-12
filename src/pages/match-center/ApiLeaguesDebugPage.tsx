import { useEffect, useState } from "react";

export default function ApiLeaguesDebugPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        "https://v1.rugby.api-sports.io/leagues",
        {
          headers: {
            "x-apisports-key": "98844306cf41e6b4f567f722527415a2",
          },
        }
      );

      const json = await res.json();

      console.log("🔥 ALL LEAGUES:", json);

      setData(json.response || []);
    }

    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>API LEAGUES DEBUG</h1>

      <p>Total: {data.length}</p>

      <pre
        style={{
          maxHeight: 500,
          overflow: "auto",
          background: "#111",
          color: "#0f0",
          padding: 10,
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}