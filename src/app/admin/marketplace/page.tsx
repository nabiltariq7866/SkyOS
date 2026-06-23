"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, MOCK_STATS, PROPERTIES } from "@/data/mockData";

export default function AdminMarketplace() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Listings</div>
          <div className="kpi-value">{MOCK_STATS.activeListings.toLocaleString()}</div>
          <div className="kpi-trend up">+15 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Volume</div>
          <div className="kpi-value">$12.5M</div>
          <div className="kpi-trend up">+8.3% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. Price</div>
          <div className="kpi-value">$24,500</div>
          <div className="kpi-trend up">+3.2% this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Liquidity Score</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>87/100</div>
          <div className="kpi-trend up">+2 points</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Marketplace Listings
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
          {PROPERTIES.map((property) => (
            <div
              key={property.id}
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "var(--highlight)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div style={{ fontWeight: "700", color: "var(--text)" }}>{property.address}</div>
                <span className={`badge ${property.status === "Claimed" ? "badge-green" : "badge-amber"}`}>
                  {property.status}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Value</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>${property.value.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginTop: "4px" }}>
                <span style={{ color: "var(--muted)" }}>Monthly Rent</span>
                <span style={{ fontWeight: "700", color: "var(--accent)" }}>${property.monthlyRent.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
