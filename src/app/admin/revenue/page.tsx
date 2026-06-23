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
import { DEMO_USERS, MOCK_STATS } from "@/data/mockData";

const revenueData = [
  { month: "Jan", protocol: 12000, municipal: 84000, owners: 144000, total: 240000 },
  { month: "Feb", protocol: 13200, municipal: 92400, owners: 158400, total: 264000 },
  { month: "Mar", protocol: 14500, municipal: 101500, owners: 174000, total: 290000 },
  { month: "Apr", protocol: 14000, municipal: 98000, owners: 168000, total: 280000 },
  { month: "May", protocol: 15800, municipal: 110600, owners: 189600, total: 316000 },
  { month: "Jun", protocol: 17500, municipal: 122500, owners: 210000, total: 350000 },
];

export default function AdminRevenue() {
  const adminUser = DEMO_USERS.find((u) => u.role === "admin")!;

  return (
    <AppShell role="admin" user={adminUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Revenue</div>
          <div className="kpi-value">${MOCK_STATS.totalRevenue.toLocaleString()}</div>
          <div className="kpi-trend up">+22.4% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Protocol Fees</div>
          <div className="kpi-value">${MOCK_STATS.protocolFees.toLocaleString()}</div>
          <div className="kpi-trend up">+18.2% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Municipal Share</div>
          <div className="kpi-value">${(MOCK_STATS.totalRevenue * 0.35).toLocaleString()}</div>
          <div className="kpi-trend up">+21.5% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Property Owner Share</div>
          <div className="kpi-value">${(MOCK_STATS.totalRevenue * 0.6).toLocaleString()}</div>
          <div className="kpi-trend up">+23.1% YoY</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Revenue Breakdown
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "var(--muted)" }}>Airspace Rentals</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>$1.8M</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "63%" }} />
              </div>
            </div>
            <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "var(--muted)" }}>Parcel Sales</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>$850K</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "30%", background: "#45828b" }} />
              </div>
            </div>
            <div style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "var(--muted)" }}>API & Services</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>$190K</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "7%", background: "#055b65" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Monthly Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1bd488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1bd488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--muted)" 
                tick={{ fill: "var(--muted)", fontSize: 12 }} 
              />
              <YAxis 
                stroke="var(--muted)" 
                tick={{ fill: "var(--muted)", fontSize: 12 }} 
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: "var(--card)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "8px" 
                }} 
                labelStyle={{ color: "var(--text)" }}
                itemStyle={{ color: "var(--text)" }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#1bd488"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorTotal)"
                name="Total Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}
