"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

export default function OwnerDashboard() {
  const ownerUser = DEMO_USERS.find((u) => u.role === "owner")!;

  return (
    <AppShell role="owner" user={ownerUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Properties</div>
          <div className="kpi-value">3</div>
          <div className="kpi-trend up">+1 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Claimed Parcels</div>
          <div className="kpi-value">2</div>
          <div className="kpi-trend up">All active</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Earnings</div>
          <div className="kpi-value">$5,400</div>
          <div className="kpi-trend up">+12.5% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Rentals</div>
          <div className="kpi-value">2</div>
          <div className="kpi-trend up">+1 this week</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Property Owner Overview
        </h2>
        <p style={{ color: "var(--muted)" }}>
          Welcome! Use the sidebar to manage your properties, view earnings, and check your fractional ownership certificates.
        </p>
      </div>
    </AppShell>
  );
}
