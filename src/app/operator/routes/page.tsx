"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

export default function OperatorRoutes() {
  const operatorUser = DEMO_USERS.find((u) => u.role === "operator")!;
  const [origin, setOrigin] = useState("Hafeez Center");
  const [destination, setDestination] = useState("Emporium Mall");

  const routeDetails = {
    distance: "12.4 km",
    duration: "18 min",
    cost: 45,
    riskScore: 88,
  };

  return (
    <AppShell role="operator" user={operatorUser}>
      <div className="grid-2">
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Route Planner
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "var(--muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Origin
              </label>
              <input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  fontSize: "14px",
                  color: "var(--text)",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "var(--muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Destination
              </label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  fontSize: "14px",
                  color: "var(--text)",
                  outline: "none",
                }}
              />
            </div>
            <button
              type="button"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "var(--accent)",
                color: "var(--btn-primary-text)",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                marginTop: "4px",
              }}
            >
              Calculate Route
            </button>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Route Details
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <span style={{ color: "var(--muted)" }}>Distance</span>
              <span style={{ color: "var(--text)", fontWeight: "700" }}>{routeDetails.distance}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <span style={{ color: "var(--muted)" }}>Est. Duration</span>
              <span style={{ color: "var(--text)", fontWeight: "700" }}>{routeDetails.duration}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <span style={{ color: "var(--muted)" }}>Risk Score</span>
              <span className="badge badge-green">{routeDetails.riskScore}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px", background: "var(--ai-bg)", borderRadius: "10px" }}>
              <span style={{ color: "var(--text)", fontWeight: "800" }}>Estimated Cost</span>
              <span style={{ color: "var(--accent)", fontSize: "20px", fontWeight: "800" }}>
                ${routeDetails.cost}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
