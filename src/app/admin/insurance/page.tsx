"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, INSURANCE_POLICIES } from "@/data/mockData";

export default function AdminInsurancePage() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid" style={{ marginBottom: "24px" }}>
        <div className="kpi-card">
          <div className="kpi-label">Total Policies</div>
          <div className="kpi-value">{INSURANCE_POLICIES.length}</div>
          <div className="kpi-trend up">+15% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Policies</div>
          <div className="kpi-value">
            {INSURANCE_POLICIES.filter((p) => p.status === "Active").length}
          </div>
          <div className="kpi-trend up">+2 new this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Premiums</div>
          <div className="kpi-value">$1,250</div>
          <div className="kpi-trend up">+12% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Expired Policies</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>
            {INSURANCE_POLICIES.filter((p) => p.status === "Expired").length}
          </div>
          <div className="kpi-trend down">-1 this week</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Insurance Policies
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Policy Type</th>
                <th>Coverage</th>
                <th>Premium</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {INSURANCE_POLICIES.map((policy) => (
                <tr key={policy.id}>
                  <td style={{ fontWeight: "600" }}>{policy.operator}</td>
                  <td>{policy.type}</td>
                  <td style={{ fontWeight: "700" }}>{policy.coverage}</td>
                  <td style={{ fontWeight: "700" }}>{policy.premium}</td>
                  <td>
                    <span
                      className={`badge ${
                        policy.status === "Active"
                          ? "badge-green"
                          : "badge-red"
                      }`}
                    >
                      {policy.status}
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
