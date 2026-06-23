"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

export default function OwnerCertificates() {
  const ownerUser = DEMO_USERS.find((u) => u.role === "owner")!;

  const certificates = [
    { id: "NFT-001", property: "Hafeez Center", share: "25%", value: "$31,250" },
    { id: "NFT-002", property: "Hafeez Center", share: "15%", value: "$18,750" },
    { id: "NFT-003", property: "Packages Mall", share: "40%", value: "$60,000" },
  ];

  return (
    <AppShell role="owner" user={ownerUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Certificates</div>
          <div className="kpi-value">3</div>
          <div className="kpi-trend up">All active</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Value</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>$110,000</div>
          <div className="kpi-trend up">+6.8% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Share</div>
          <div className="kpi-value">80%</div>
          <div className="kpi-trend up">+25% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. Value</div>
          <div className="kpi-value">$36,667</div>
          <div className="kpi-trend up">+5.2% this month</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Fractional Ownership Certificates
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
          {certificates.map((cert) => (
            <div
              key={cert.id}
              style={{
                padding: "16px",
                borderRadius: "14px",
                background: "var(--valuation-accent-bg)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "6px" }}>Token ID</div>
              <div style={{ fontWeight: "800", color: "var(--text)", marginBottom: "12px" }}>{cert.id}</div>
              <div style={{ marginBottom: "6px" }}>
                <span style={{ color: "var(--muted)", fontSize: "12px" }}>Property: </span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>{cert.property}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Share</span>
                <span style={{ fontWeight: "700", color: "var(--accent)" }}>{cert.share}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginTop: "4px" }}>
                <span style={{ color: "var(--muted)" }}>Value</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>{cert.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
