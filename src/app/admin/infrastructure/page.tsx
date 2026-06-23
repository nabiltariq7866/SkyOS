"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, INFRASTRUCTURE_ASSETS } from "@/data/mockData";

export default function AdminInfrastructurePage() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid" style={{ marginBottom: "24px" }}>
        <div className="kpi-card">
          <div className="kpi-label">Total Assets</div>
          <div className="kpi-value">{INFRASTRUCTURE_ASSETS.length}</div>
          <div className="kpi-trend up">+12% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Valuation</div>
          <div className="kpi-value">
            ${INFRASTRUCTURE_ASSETS.reduce((sum, a) => sum + a.valuation, 0).toLocaleString()}
          </div>
          <div className="kpi-trend up">+8.5% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Lease Income</div>
          <div className="kpi-value">
            ${INFRASTRUCTURE_ASSETS.reduce((sum, a) => sum + a.leaseIncome, 0).toLocaleString()}
          </div>
          <div className="kpi-trend up">+10.2% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Tokenized Assets</div>
          <div className="kpi-value">
            {INFRASTRUCTURE_ASSETS.filter((a) => a.tokenization === "Ready").length}
          </div>
          <div className="kpi-trend up">+2 this month</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Infrastructure Assets
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Address</th>
                <th>Valuation</th>
                <th>Monthly Lease</th>
                <th>Yield</th>
                <th>Risk Score</th>
                <th>Tokenization</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {INFRASTRUCTURE_ASSETS.map((asset) => (
                <tr key={asset.id}>
                  <td style={{ fontWeight: "600" }}>{asset.type}</td>
                  <td>{asset.address}</td>
                  <td style={{ fontWeight: "700" }}>${asset.valuation.toLocaleString()}</td>
                  <td style={{ fontWeight: "700" }}>${asset.leaseIncome.toLocaleString()}</td>
                  <td style={{ fontWeight: "700" }}>{asset.yield}</td>
                  <td style={{ fontWeight: "700" }}>{asset.riskScore}/100</td>
                  <td>
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
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        asset.status === "Active" ? "badge-green" : "badge-amber"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
