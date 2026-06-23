"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, FLIGHT_ALERTS } from "@/data/mockData";

export default function MunicipalityAlerts() {
  const municipalUser = DEMO_USERS.find((u) => u.role === "municipality")!;

  return (
    <AppShell role="municipality" user={municipalUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">High Priority</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>2</div>
          <div className="kpi-trend up">+1 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Medium Priority</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>3</div>
          <div className="kpi-trend down">-1 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Low Priority</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>8</div>
          <div className="kpi-trend down">-2 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Resolved Today</div>
          <div className="kpi-value">6</div>
          <div className="kpi-trend up">+3 from yesterday</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Live Flight Alerts
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FLIGHT_ALERTS.map((alert) => (
            <div
              key={alert.id}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "var(--highlight)",
                border: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: "700", color: "var(--text)", marginBottom: "2px" }}>
                  {alert.location}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>{alert.time}</div>
              </div>
              <span
                className={`badge ${alert.severity === "High" ? "badge-red" : alert.severity === "Medium" ? "badge-amber" : "badge-green"}`}
              >
                {alert.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
