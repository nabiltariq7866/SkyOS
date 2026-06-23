"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, INSURANCE_POLICIES } from "@/data/mockData";

export default function OperatorInsurancePage() {
  const operatorUser = DEMO_USERS.find((u) => u.role === "operator")!;
  const operatorPolicies = INSURANCE_POLICIES.filter(p => p.operator === "DHL");

  return (
    <AppShell role="operator" user={operatorUser}>
      <div className="kpi-grid" style={{ marginBottom: "24px" }}>
        <div className="kpi-card">
          <div className="kpi-label">Active Policy</div>
          <div className="kpi-value">{operatorPolicies.length}</div>
          <div className="kpi-trend up">Valid until 2026-07-01</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Coverage Limit</div>
          <div className="kpi-value">$50,000</div>
          <div className="kpi-trend up">Per-flight</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Premium</div>
          <div className="kpi-value">$750</div>
          <div className="kpi-trend up">30 flights/month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Risk Score</div>
          <div className="kpi-value">85/100</div>
          <div className="kpi-trend up">Low Risk</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          My Insurance Policy
        </h2>
        {operatorPolicies.map(policy => (
          <div
            key={policy.id}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "16px",
              background: "var(--card-secondary)",
              marginBottom: "12px"
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px"
            }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text)" }}>
                  {policy.type} Policy
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                  Coverage: {policy.coverage}
                </div>
              </div>
              <span className={`badge badge-green`}>{policy.status}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "12px" }}>
              <div>
                <div style={{ color: "var(--muted)" }}>Premium (per flight)</div>
                <div style={{ fontWeight: "700", color: "var(--text)" }}>{policy.premium}</div>
              </div>
              <div>
                <div style={{ color: "var(--muted)" }}>Valid Until</div>
                <div style={{ fontWeight: "700", color: "var(--text)" }}>2026-07-01</div>
              </div>
            </div>
          </div>
        ))}

        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "var(--text)", marginTop: "24px", marginBottom: "12px" }}>
          Upgrade Policy
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "16px",
            background: "var(--card-secondary)",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text)", marginBottom: "8px" }}>
              Monthly (Basic)
            </div>
            <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "12px" }}>
              Coverage: $50,000
            </div>
            <div style={{ fontSize: "18px", fontWeight: "900", color: "var(--accent)" }}>
              $350/mo
            </div>
          </div>
          <div style={{
            border: "2px solid var(--accent)",
            borderRadius: "8px",
            padding: "16px",
            background: "var(--highlight)",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text)", marginBottom: "8px" }}>
              Monthly (Pro)
            </div>
            <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "12px" }}>
              Coverage: $100,000
            </div>
            <div style={{ fontSize: "18px", fontWeight: "900", color: "var(--accent)" }}>
              $650/mo
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
