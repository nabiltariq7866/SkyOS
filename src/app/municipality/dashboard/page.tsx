"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

export default function MunicipalityDashboard() {
  const municipalUser = DEMO_USERS.find((u) => u.role === "municipality")!;

  return (
    <AppShell role="municipality" user={municipalUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Pending Permits</div>
          <div className="kpi-value">12</div>
          <div className="kpi-trend up">+3 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Flights</div>
          <div className="kpi-value">47</div>
          <div className="kpi-trend up">+8 from yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Alerts</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>
            5
          </div>
          <div className="kpi-trend down">-2 resolved</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Revenue</div>
          <div className="kpi-value">$12,500</div>
          <div className="kpi-trend up">+14.5% MoM</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Municipality Overview
        </h2>
        <p style={{ color: "var(--muted)" }}>
          Welcome to the municipal dashboard! Use the sidebar to manage permits, view flight alerts, and calculate revenue.
        </p>
      </div>
    </AppShell>
  );
}
