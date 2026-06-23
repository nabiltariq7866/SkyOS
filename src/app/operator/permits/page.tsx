"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, PERMITS } from "@/data/mockData";

export default function OperatorPermits() {
  const operatorUser = DEMO_USERS.find((u) => u.role === "operator")!;

  return (
    <AppShell role="operator" user={operatorUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Permits</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>18</div>
          <div className="kpi-trend up">+2 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Pending</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>4</div>
          <div className="kpi-trend up">+1 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Expiring Soon</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>3</div>
          <div className="kpi-trend up">+1 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Approved</div>
          <div className="kpi-value">156</div>
          <div className="kpi-trend up">+24 this month</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Permit Status
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Date</th>
                <th>Risk Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PERMITS.filter((p) => p.operator === "DHL").map((permit) => (
                <tr key={permit.id}>
                  <td style={{ fontWeight: "600" }}>{permit.route}</td>
                  <td>{permit.date}</td>
                  <td>
                    <span className={`badge ${permit.riskScore >= 80 ? "badge-green" : "badge-amber"}`}>
                      {permit.riskScore}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${permit.status === "Approved" ? "badge-green" : "badge-amber"}`}
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
