"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

export default function OperatorDashboard() {
  const operatorUser = DEMO_USERS.find((u) => u.role === "operator")!;

  return (
    <AppShell role="operator" user={operatorUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Drones</div>
          <div className="kpi-value">24</div>
          <div className="kpi-trend up">+3 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Completed Flights</div>
          <div className="kpi-value">142</div>
          <div className="kpi-trend up">+18 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. Cost per Flight</div>
          <div className="kpi-value">$38</div>
          <div className="kpi-trend down">-5.2% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Pending Permits</div>
          <div className="kpi-value">4</div>
          <div className="kpi-trend up">+1 today</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Fleet Operations Overview
        </h2>
        <p style={{ color: "var(--muted)" }}>
          Welcome to the operator dashboard! Use the sidebar to plan routes, check permits, and view billing.
        </p>
      </div>
    </AppShell>
  );
}
