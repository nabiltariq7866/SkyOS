"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, MOCK_STATS, TRANSACTIONS } from "@/data/mockData";

export default function AdminOverview() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Properties</div>
          <div className="kpi-value">{MOCK_STATS.totalProperties.toLocaleString()}</div>
          <div className="kpi-trend up">+2.4% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Claimed Parcels</div>
          <div className="kpi-value">{MOCK_STATS.claimedParcels.toLocaleString()}</div>
          <div className="kpi-trend up">+5.1% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Listings</div>
          <div className="kpi-value">{MOCK_STATS.activeListings.toLocaleString()}</div>
          <div className="kpi-trend up">+12 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Unauthorized Flights</div>
          <div className="kpi-value" style={{ color: "var(--red-500)" }}>
            {MOCK_STATS.unauthorizedFlights}
          </div>
          <div className="kpi-trend down">-8 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Protocol Revenue</div>
          <div className="kpi-value">${MOCK_STATS.protocolFees.toLocaleString()}</div>
          <div className="kpi-trend up">+18.2% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total GMV</div>
          <div className="kpi-value">${MOCK_STATS.totalRevenue.toLocaleString()}</div>
          <div className="kpi-trend up">+22.4% YoY</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Revenue Split
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Property Owners</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>60%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "60%", background: "var(--accent)" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Municipalities</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>35%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "35%", background: "#45828b" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Protocol Fees</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>5%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "5%", background: "#055b65" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Recent Transactions
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Property</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.id}>
                    <td style={{ fontWeight: "600" }}>{tx.type}</td>
                    <td>{tx.property}</td>
                    <td style={{ fontWeight: "700" }}>${tx.amount.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${tx.status === "Completed" ? "badge-green" : "badge-amber"}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          3D Airspace Command Center
        </h2>
        <div
          style={{
            width: "100%",
            height: "400px",
            background: "var(--highlight)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Dummy 3D map visual */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 400"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Dummy buildings/parcels */}
            <rect x="100" y="250" width="80" height="60" fill="var(--accent)" fillOpacity="0.3" rx="4" />
            <rect x="100" y="190" width="80" height="60" fill="var(--accent)" fillOpacity="0.5" rx="4" />
            <rect x="100" y="130" width="80" height="60" fill="var(--accent)" fillOpacity="0.7" rx="4" />

            <rect x="220" y="270" width="60" height="40" fill="#055b65" fillOpacity="0.25" rx="4" />
            <rect x="220" y="230" width="60" height="40" fill="#055b65" fillOpacity="0.45" rx="4" />

            <rect x="340" y="240" width="100" height="70" fill="var(--accent)" fillOpacity="0.25" rx="4" />
            <rect x="340" y="170" width="100" height="70" fill="var(--accent)" fillOpacity="0.45" rx="4" />
            <rect x="340" y="100" width="100" height="70" fill="var(--accent)" fillOpacity="0.65" rx="4" />

            <rect x="500" y="260" width="70" height="50" fill="#45828b" fillOpacity="0.35" rx="4" />
            <rect x="500" y="210" width="70" height="50" fill="#45828b" fillOpacity="0.55" rx="4" />

            <rect x="620" y="220" width="90" height="90" fill="var(--accent)" fillOpacity="0.2" rx="4" />
            <rect x="620" y="130" width="90" height="90" fill="var(--accent)" fillOpacity="0.4" rx="4" />

            {/* Corridor line */}
            <path d="M 140 150 Q 390 50 665 175" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="5,3" />

            {/* Drones */}
            <g transform="translate(200,120)">
              <circle cx="0" cy="0" r="6" fill="var(--accent)" />
              <circle cx="0" cy="0" r="12" fill="var(--accent)" fillOpacity="0.3" />
            </g>
            <g transform="translate(450,100)">
              <circle cx="0" cy="0" r="6" fill="var(--accent)" />
              <circle cx="0" cy="0" r="12" fill="var(--accent)" fillOpacity="0.3" />
            </g>
            <g transform="translate(580,140)">
              <circle cx="0" cy="0" r="6" fill="var(--red-500)" />
              <circle cx="0" cy="0" r="12" fill="var(--red-500)" fillOpacity="0.3" />
            </g>

            {/* Labels */}
            <text x="140" y="350" fill="var(--muted)" fontSize="12" fontWeight="600">High-Demand Corridor</text>
            <text x="390" y="350" fill="var(--muted)" fontSize="12" fontWeight="600">Active Drone</text>
            <text x="620" y="350" fill="var(--red-500)" fontSize="12" fontWeight="600">Unauthorized Flight</text>
          </svg>

          <div style={{ position: "absolute", zIndex: 10, color: "var(--text)", fontWeight: "700", fontSize: "18px" }}>
            3D Airspace Map (Dummy Data)
          </div>
        </div>
      </div>

      <div className="hero-banner">
        <h2 className="hero-banner-title" style={{ marginBottom: "8px" }}>
          AI Airspace Intelligence Engine Active
        </h2>
        <p className="hero-banner-muted" style={{ marginBottom: "16px" }}>
          Live monitoring of 50,000+ parcels, automated risk scoring, and real-time compliance checks
        </p>
      </div>
    </AppShell>
  );
}
