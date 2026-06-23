"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS, MOCK_STATS, PROPERTIES } from "@/data/mockData";

const marketplaceData = [
  { month: "Jan", listings: 180, volume: 8.2 },
  { month: "Feb", listings: 195, volume: 9.1 },
  { month: "Mar", listings: 210, volume: 10.5 },
  { month: "Apr", listings: 205, volume: 10.2 },
  { month: "May", listings: 225, volume: 11.8 },
  { month: "Jun", listings: 240, volume: 12.5 },
];

export default function AdminMarketplace() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Listings</div>
          <div className="kpi-value">{MOCK_STATS.activeListings.toLocaleString()}</div>
          <div className="kpi-trend up">+15 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Volume</div>
          <div className="kpi-value">$12.5M</div>
          <div className="kpi-trend up">+8.3% this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. Price</div>
          <div className="kpi-value">$24,500</div>
          <div className="kpi-trend up">+3.2% this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Liquidity Score</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>87/100</div>
          <div className="kpi-trend up">+2 points</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Marketplace Growth
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={marketplaceData}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1bd488" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1bd488" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} />
            <YAxis 
              yAxisId="left"
              stroke="var(--muted)" 
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              orientation="left"
            />
            <YAxis 
              yAxisId="right"
              stroke="var(--muted)" 
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              orientation="right"
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip 
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
              labelStyle={{ color: "var(--text)" }}
              itemStyle={{ color: "var(--text)" }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="#1bd488"
              strokeWidth={3}
              fill="url(#colorVolume)"
              name="Volume (M)"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="listings"
              stroke="#45828b"
              strokeWidth={2}
              name="Listings"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Marketplace Listings
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
          {PROPERTIES.map((property) => (
            <div
              key={property.id}
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "var(--highlight)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div style={{ fontWeight: "700", color: "var(--text)" }}>{property.address}</div>
                <span className={`badge ${property.status === "Claimed" ? "badge-green" : "badge-amber"}`}>
                  {property.status}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Value</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>${property.value.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginTop: "4px" }}>
                <span style={{ color: "var(--muted)" }}>Monthly Rent</span>
                <span style={{ fontWeight: "700", color: "var(--accent)" }}>${property.monthlyRent.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
