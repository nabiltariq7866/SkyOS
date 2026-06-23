"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, INFRASTRUCTURE_ASSETS } from "@/data/mockData";

export default function OwnerInfrastructurePage() {
  const user = DEMO_USERS.find((u) => u.role === "owner")!;
  const ownerAssets = [INFRASTRUCTURE_ASSETS[0], INFRASTRUCTURE_ASSETS[1]];

  return (
    <AppShell role="owner" user={user}>
      <div className="kpi-grid" style={{ marginBottom: "24px" }}>
        <div className="kpi-card">
          <div className="kpi-label">My Assets</div>
          <div className="kpi-value">{ownerAssets.length}</div>
          <div className="kpi-trend up">+1 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Valuation</div>
          <div className="kpi-value">
            ${ownerAssets.reduce((sum, a) => sum + a.valuation, 0).toLocaleString()}
          </div>
          <div className="kpi-trend up">+7.2% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Lease Income</div>
          <div className="kpi-value">
            ${ownerAssets.reduce((sum, a) => sum + a.leaseIncome, 0).toLocaleString()}
          </div>
          <div className="kpi-trend up">+9.5% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Yield</div>
          <div className="kpi-value">
            {((ownerAssets.reduce((sum, a) => sum + parseFloat(a.yield), 0) / ownerAssets.length).toFixed(1))}%
          </div>
          <div className="kpi-trend up">+0.3% YoY</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          My Infrastructure Assets
        </h2>
        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {ownerAssets.map((asset) => (
            <div
              key={asset.id}
              style={{
                padding: "16px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--card-secondary)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text)", marginBottom: "4px" }}>
                    {asset.type}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>{asset.address}</div>
                </div>
                <span
                  className={`badge ${
                    asset.tokenization === "Ready"
                      ? "badge-green"
                      : asset.tokenization === "In Progress"
                      ? "badge-amber"
                      : "badge-red"
                  }`}
                >
                  {asset.tokenization}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "12px" }}>
                <div>
                  <div style={{ color: "var(--muted)" }}>Valuation</div>
                  <div style={{ fontWeight: "700", color: "var(--text)" }}>${asset.valuation.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ color: "var(--muted)" }}>Monthly Lease</div>
                  <div style={{ fontWeight: "700", color: "var(--text)" }}>${asset.leaseIncome.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ color: "var(--muted)" }}>Yield</div>
                  <div style={{ fontWeight: "700", color: "var(--accent)" }}>{asset.yield}</div>
                </div>
                <div>
                  <div style={{ color: "var(--muted)" }}>Risk Score</div>
                  <div style={{ fontWeight: "700", color: "var(--text)" }}>{asset.riskScore}/100</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
