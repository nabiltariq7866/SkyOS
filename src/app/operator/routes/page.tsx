"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";
import { useApp } from "@/context/AppProvider";

const SAVED_ROUTES = [
  { id: 1, name: "Hafeez Center → Emporium Mall", distance: "12.4 km", duration: "18 min", cost: 45, riskScore: 88, waypoints: ["Gulberg 3", "Liberty Market"] },
  { id: 2, name: "DHA Phase 6 → Model Town", distance: "8.2 km", duration: "12 min", cost: 32, riskScore: 92, waypoints: ["Khyaban-e-Jami", "Bahria Town Entrance"] },
  { id: 3, name: "Johar Town → Packages Mall", distance: "6.7 km", duration: "10 min", cost: 28, riskScore: 95, waypoints: ["Wapda Town"] },
];

const RECENT_ROUTES = [
  { id: 101, name: "Hafeez Center → DHA Phase 5", date: "Today, 10:42 AM", distance: "14.2 km", cost: 52 },
  { id: 102, name: "Emporium Mall → Model Town", date: "Today, 09:15 AM", distance: "7.8 km", cost: 30 },
  { id: 103, name: "Packages Mall → Gulberg 3", date: "Yesterday, 05:30 PM", distance: "9.1 km", cost: 35 },
];

const ALTERNATIVE_ROUTES = [
  { id: 201, name: "Gulberg Corridor", distance: "12.4 km", duration: "18 min", cost: 45, riskScore: 88, highlight: true },
  { id: 202, name: "Canal Bank Route", distance: "14.8 km", duration: "22 min", cost: 55, riskScore: 82 },
  { id: 203, name: "Inner City Path", distance: "10.2 km", duration: "25 min", cost: 38, riskScore: 72 },
];

export default function OperatorRoutes() {
  const operatorUser = DEMO_USERS.find((u) => u.role === "operator")!;
  const { logActivity } = useApp();
  const [origin, setOrigin] = useState("Hafeez Center");
  const [destination, setDestination] = useState("Emporium Mall");
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    setCalculated(true);
    logActivity({
      userName: operatorUser.name,
      userRole: "operator",
      type: "searched",
      action: "Route planner used",
      detail: `Planned route from ${origin} to ${destination}`,
      screen: "operator/routes"
    });
  };

  const selectSavedRoute = (route: typeof SAVED_ROUTES[0]) => {
    const parts = route.name.split(" → ");
    setOrigin(parts[0]);
    setDestination(parts[1]);
    setCalculated(true);
    logActivity({
      userName: operatorUser.name,
      userRole: "operator",
      type: "viewed",
      action: "Saved route selected",
      detail: `Selected route: ${route.name}`,
      screen: "operator/routes"
    });
  };

  const currentRoute = ALTERNATIVE_ROUTES[selectedRoute];

  return (
    <AppShell role="operator" user={operatorUser}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text)", marginBottom: "4px" }}>
          Route Planner
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          Plan optimized delivery routes with real-time risk assessment
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Route Planner Card */}
          <div className="card">
            <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
              New Route
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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
                onClick={handleCalculate}
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

          {/* Weather Card */}
          <div className="card">
            <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
              Weather Conditions
            </h2>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--text)" }}>32°C</div>
                <div style={{ fontSize: "14px", color: "var(--muted)" }}>Partly Cloudy</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", textAlign: "right" }}>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>Wind: 12 km/h NE</div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>Visibility: 10 km</div>
                <span className="badge badge-green" style={{ alignSelf: "flex-end" }}>Good for Flight</span>
              </div>
            </div>
          </div>

          {/* Saved Routes */}
          <div className="card">
            <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
              Saved Routes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {SAVED_ROUTES.map((route) => (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => selectSavedRoute(route)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    background: "var(--highlight)",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "var(--bg-alt)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--highlight)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)" }}>{route.name}</span>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--accent)" }}>${route.cost}</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--muted)" }}>
                    <span>{route.distance}</span>
                    <span>{route.duration}</span>
                    <span className="badge badge-green" style={{ fontSize: "11px", padding: "2px 6px" }}>{route.riskScore}% Safe</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Route Details */}
          <div className="card">
            <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
              Route Details
            </h2>
            {calculated ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "4px" }}>Distance</div>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text)" }}>{currentRoute.distance}</div>
                  </div>
                  <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
                    <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "4px" }}>Duration</div>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text)" }}>{currentRoute.duration}</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "var(--highlight)", borderRadius: "10px", alignItems: "center" }}>
                  <span style={{ color: "var(--muted)" }}>Risk Score</span>
                  <span className="badge badge-green" style={{ fontSize: "16px", padding: "4px 10px" }}>{currentRoute.riskScore}%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px", background: "var(--ai-bg)", borderRadius: "10px" }}>
                  <span style={{ color: "var(--text)", fontWeight: "800" }}>Estimated Cost</span>
                  <span style={{ color: "var(--accent)", fontSize: "20px", fontWeight: "800" }}>
                    ${currentRoute.cost}
                  </span>
                </div>
                <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
                  <div style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Max Altitude
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)" }}>
                    120 meters (compatible with local regulations)
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#059669",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                  onClick={() => logActivity({
                    userName: operatorUser.name,
                    userRole: "operator",
                    type: "started",
                    action: "Route confirmed",
                    detail: `Initiated route from ${origin} to ${destination}`,
                    screen: "operator/routes"
                  })}
                >
                  Confirm & Start
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)" }}>
                Enter origin and destination to calculate route
              </div>
            )}
          </div>

          {/* Alternative Routes */}
          {calculated && (
            <div className="card">
              <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
                Alternative Routes
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ALTERNATIVE_ROUTES.map((route, idx) => (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setSelectedRoute(idx)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px",
                      borderRadius: "10px",
                      border: selectedRoute === idx ? "2px solid var(--accent)" : "1px solid var(--border)",
                      background: selectedRoute === idx ? "var(--ai-bg)" : "var(--bg)",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)" }}>{route.name}</span>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--accent)" }}>${route.cost}</span>
                    </div>
                    <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--muted)" }}>
                      <span>{route.distance}</span>
                      <span>{route.duration}</span>
                      <span className="badge badge-green" style={{ fontSize: "11px", padding: "2px 6px" }}>{route.riskScore}% Safe</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Routes */}
          <div className="card">
            <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
              Recent Routes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {RECENT_ROUTES.map((route) => (
                <div
                  key={route.id}
                  style={{
                    padding: "10px 12px",
                    background: "var(--highlight)",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text)" }}>{route.name}</span>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--accent)" }}>${route.cost}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                    {route.date} • {route.distance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
