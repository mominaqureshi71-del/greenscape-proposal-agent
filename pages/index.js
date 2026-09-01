import { useState } from "react";

export default function Home() {
  const [clientName, setClientName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [siteWalkNotes, setSiteWalkNotes] = useState("");
  const [pricingItems, setPricingItems] = useState([{ name: "", price: "" }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function updateItem(index, field, value) {
    const next = [...pricingItems];
    next[index][field] = value;
    setPricingItems(next);
  }

  function addItem() {
    setPricingItems([...pricingItems, { name: "", price: "" }]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          projectAddress,
          siteWalkNotes,
          pricingItems: pricingItems.filter((i) => i.name && i.price),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data.proposal);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Greenscape Pro — Proposal Drafting Agent</h1>
        <p style={styles.subtitle}>
          Turn site-walk notes into a proposal draft in seconds, not days.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Client name
            <input
              style={styles.input}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </label>

          <label style={styles.label}>
            Project address
            <input
              style={styles.input}
              value={projectAddress}
              onChange={(e) => setProjectAddress(e.target.value)}
            />
          </label>

          <label style={styles.label}>
            Site walk notes
            <textarea
              style={{ ...styles.input, height: 120 }}
              value={siteWalkNotes}
              onChange={(e) => setSiteWalkNotes(e.target.value)}
              placeholder="Paste or type the notes from the site walk..."
              required
            />
          </label>

          <div>
            <p style={styles.label}>Pricing items</p>
            {pricingItems.map((item, i) => (
              <div key={i} style={styles.itemRow}>
                <input
                  style={{ ...styles.input, flex: 2 }}
                  placeholder="Item (e.g. Paver patio - 400 sqft)"
                  value={item.name}
                  onChange={(e) => updateItem(i, "name", e.target.value)}
                />
                <input
                  style={{ ...styles.input, flex: 1 }}
                  placeholder="Price"
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(i, "price", e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={addItem} style={styles.addBtn}>
              + Add item
            </button>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Drafting..." : "Draft Proposal"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.result}>
            <h2>Draft ready</h2>
            <p style={styles.meta}>
              Estimate: ${Number(result.total_estimate).toLocaleString()}
              {result.needs_render && (
                <span style={styles.warning}>
                  {" "}
                  — over $30k, flagged for 3D render step
                </span>
              )}
            </p>
            <pre style={styles.draft}>{result.draft_content}</pre>
            <p style={styles.meta}>
              A Slack notification was sent for approval. Proposal ID:{" "}
              {result.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f4",
    padding: "40px 16px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: 720,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 12,
    padding: 32,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  h1: { fontSize: 24, marginBottom: 4, color: "#1f2d20" },
  subtitle: { color: "#5b6b5c", marginBottom: 24 },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 14,
    fontWeight: 600,
    color: "#33402f",
  },
  input: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #d7ded7",
    fontSize: 14,
    fontFamily: "inherit",
  },
  itemRow: { display: "flex", gap: 8, marginBottom: 8 },
  addBtn: {
    background: "none",
    border: "none",
    color: "#2f6b3a",
    cursor: "pointer",
    fontSize: 14,
    padding: 0,
  },
  submitBtn: {
    background: "#2f6b3a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 20px",
    fontSize: 15,
    cursor: "pointer",
    fontWeight: 600,
  },
  error: { color: "#b3261e", marginTop: 16 },
  result: { marginTop: 32, borderTop: "1px solid #eee", paddingTop: 24 },
  meta: { fontSize: 13, color: "#5b6b5c" },
  warning: { color: "#b3611e", fontWeight: 600 },
  draft: {
    whiteSpace: "pre-wrap",
    background: "#f7f9f7",
    padding: 16,
    borderRadius: 8,
    fontSize: 14,
    lineHeight: 1.5,
    fontFamily: "inherit",
  },
};
