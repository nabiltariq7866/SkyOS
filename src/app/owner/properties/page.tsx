"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, PROPERTIES } from "@/data/mockData";

export default function OwnerProperties() {
  const ownerUser = DEMO_USERS.find((u) => u.role === "owner")!;

  return (
    <AppShell role="owner" user={ownerUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Claimed</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>2</div>
          <div className="kpi-trend up">All active</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Available</div>
          <div className="kpi-value">1</div>
          <div className="kpi-trend up">+1 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Value</div>
          <div className="kpi-value">$295,000</div>
          <div className="kpi-trend up">+7.2% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Rent</div>
          <div className="kpi-value">$5,400</div>
          <div className="kpi-trend up">+12.5% this month</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          My Properties
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                <div style={{ fontWeight: "700", color: "var(--text)" }}>
                  {property.address}
                </div>
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
