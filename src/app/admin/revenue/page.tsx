"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, MOCK_STATS } from "@/data/mockData";

export default function AdminRevenue() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Revenue</div>
          <div className="kpi-value">${MOCK_STATS.totalRevenue.toLocaleString()}</div>
          <div className="kpi-trend up">+22.4% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Protocol Fees</div>
          <div className="kpi-value">${MOCK_STATS.protocolFees.toLocaleString()}</div>
          <div className="kpi-trend up">+18.2% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Municipal Share</div>
          <div className="kpi-value">${(MOCK_STATS.totalRevenue * 0.35).toLocaleString()}</div>
          <div className="kpi-trend up">+21.5% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Property Owner Share</div>
          <div className="kpi-value">${(MOCK_STATS.totalRevenue * 0.6).toLocaleString()}</div>
          <div className="kpi-trend up">+23.1% YoY</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Revenue Breakdown
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "var(--muted)" }}>Airspace Rentals</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>$1.8M</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "63%" }} />
              </div>
            </div>
            <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "var(--muted)" }}>Parcel Sales</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>$850K</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "30%", background: "#45828b" }} />
              </div>
            </div>
            <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "var(--muted)" }}>API & Services</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>$190K</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "7%", background: "#055b65" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Monthly Revenue Trend
          </h2>
          <div style={{ padding: "24px 0", textAlign: "center", color: "var(--muted)" }}>
            Revenue chart visualization placeholder
          </div>
        </div>
      </div>
    </AppShell>
  );
}
