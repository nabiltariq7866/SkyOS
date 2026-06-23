"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, PERMITS } from "@/data/mockData";

export default function AdminCompliance() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Compliance Score</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>94/100</div>
          <div className="kpi-trend up">+3 points</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Permits</div>
          <div className="kpi-value">87</div>
          <div className="kpi-trend up">+12 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Pending Reviews</div>
          <div className="kpi-value">15</div>
          <div className="kpi-trend down">-5 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Violations</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>3</div>
          <div className="kpi-trend down">-2 this week</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Permit Compliance Status
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Route</th>
                <th>Risk Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PERMITS.map((permit) => (
                <tr key={permit.id}>
                  <td style={{ fontWeight: "600" }}>{permit.operator}</td>
                  <td>{permit.route}</td>
                  <td>
                    <span
                      className={`badge ${permit.riskScore >= 80 ? "badge-green" : permit.riskScore >= 60 ? "badge-amber" : "badge-red"}`}
                    >
                      {permit.riskScore}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${permit.status === "Approved" ? "badge-green" : permit.status === "Pending" ? "badge-amber" : "badge-red"}`}
                    >
                      {permit.status}
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
