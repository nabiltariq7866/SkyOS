"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

export default function MunicipalityCalculator() {
  const municipalUser = DEMO_USERS.find((u) => u.role === "municipality")!;
  const [flightVolume, setFlightVolume] = useState(500);
  const [avgFeePerFlight, setAvgFeePerFlight] = useState(25);

  const monthlyRevenue = flightVolume * avgFeePerFlight;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <AppShell role="municipality" user={municipalUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Projected Monthly</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>${monthlyRevenue.toLocaleString()}</div>
          <div className="kpi-trend up">+14.5% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Projected Annual</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>${annualRevenue.toLocaleString()}</div>
          <div className="kpi-trend up">+18.2% YoY</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Revenue Calculator
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
              <span style={{ color: "var(--muted)" }}>Monthly Flight Volume</span>
              <span style={{ color: "var(--text)", fontWeight: "700" }}>{flightVolume} flights</span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              value={flightVolume}
              onChange={(e) => setFlightVolume(parseInt(e.target.value))}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
              <span style={{ color: "var(--muted)" }}>Average Fee per Flight ($)</span>
              <span style={{ color: "var(--text)", fontWeight: "700" }}>${avgFeePerFlight}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={avgFeePerFlight}
              onChange={(e) => setAvgFeePerFlight(parseInt(e.target.value))}
              style={{ width: "100%", cursor: "pointer" }}
            />
          </div>
        </div>
        <div style={{ marginTop: "20px", padding: "16px", background: "var(--ai-bg)", borderRadius: "10px" }}>
          <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "4px" }}>
            Estimated Monthly Revenue
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--accent)" }}>
            ${monthlyRevenue.toLocaleString()}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
