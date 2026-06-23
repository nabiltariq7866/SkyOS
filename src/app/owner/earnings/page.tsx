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
import { DEMO_USERS } from "@/data/mockData";

const monthlyEarningsData = [
  { month: "Jan", total: 3800 },
  { month: "Feb", total: 4200 },
  { month: "Mar", total: 4800 },
  { month: "Apr", total: 4500 },
  { month: "May", total: 5100 },
  { month: "Jun", total: 5400 },
];

export default function OwnerEarnings() {
  const ownerUser = DEMO_USERS.find((u) => u.role === "owner")!;

  const earnings = [
    { date: "Jun 20, 2026", amount: 1200, property: "Hafeez Center" },
    { date: "Jun 15, 2026", amount: 800, property: "Packages Mall" },
    { date: "Jun 10, 2026", amount: 1000, property: "Hafeez Center" },
    { date: "Jun 05, 2026", amount: 900, property: "Packages Mall" },
    { date: "May 30, 2026", amount: 1100, property: "Hafeez Center" },
  ];

  return (
    <AppShell role="owner" user={ownerUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Earnings</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>$18,250</div>
          <div className="kpi-trend up">+15.3% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">This Month</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>$5,400</div>
          <div className="kpi-trend up">+12.5% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Last Month</div>
          <div className="kpi-value">$4,800</div>
          <div className="kpi-trend up">+8.2% from prior</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. Monthly</div>
          <div className="kpi-value">$4,562</div>
          <div className="kpi-trend up">+10.1% YoY</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Monthly Earnings Trend
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyEarningsData}>
            <defs>
              <linearGradient id="colorEarningsPage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1bd488" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1bd488" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} />
            <YAxis 
              stroke="var(--muted)" 
              tick={{ fill: "var(--muted)", fontSize: 12 }} 
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
              labelStyle={{ color: "var(--text)" }}
              itemStyle={{ color: "var(--text)" }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#1bd488"
              strokeWidth={3}
              fill="url(#colorEarningsPage)"
              name="Earnings"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Recent Earnings
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {earnings.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                borderRadius: "10px",
                background: "var(--highlight)",
              }}
            >
              <div>
                <div style={{ fontWeight: "700", color: "var(--text)" }}>{item.property}</div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>{item.date}</div>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--accent)" }}>
                +${item.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
