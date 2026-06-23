"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, PERMITS } from "@/data/mockData";

export default function MunicipalityPermits() {
  const municipalUser = DEMO_USERS.find((u) => u.role === "municipality")!;

  return (
    <AppShell role="municipality" user={municipalUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Pending</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>8</div>
          <div className="kpi-trend up">+2 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Approved</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>79</div>
          <div className="kpi-trend up">+10 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Rejected</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>3</div>
          <div className="kpi-trend down">-1 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total</div>
          <div className="kpi-value">90</div>
          <div className="kpi-trend up">+11 today</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Permit Queue
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
