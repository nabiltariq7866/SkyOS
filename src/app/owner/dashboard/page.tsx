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

const earningsData = [
  { month: "Jan", total: 3800 },
  { month: "Feb", total: 4200 },
  { month: "Mar", total: 4800 },
  { month: "Apr", total: 4500 },
  { month: "May", total: 5100 },
  { month: "Jun", total: 5400 },
];

const propertyData = [
  { name: "Property A", value: 1800, fill: "#1bd488" },
  { name: "Property B", value: 2100, fill: "#45828b" },
  { name: "Property C", value: 1500, fill: "#055b65" },
];

const recentTransactions = [
  { id: 1, type: "Rental Income", property: "Property A", amount: 900, status: "Received" },
  { id: 2, type: "Rental Income", property: "Property B", amount: 1050, status: "Received" },
  { id: 3, type: "Certificate Dividend", property: "Property C", amount: 375, status: "Pending" },
];

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

      <div className="grid-2" style={{ marginBottom: "24px" }}>
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Monthly Earnings
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#colorEarnings)"
                name="Earnings"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Property Breakdown
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {propertyData.map((property) => (
              <div key={property.name} style={{ padding: "12px", background: "var(--highlight)", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--muted)" }}>{property.name}</span>
                  <span style={{ color: "var(--text)", fontWeight: "700" }}>
                    ${property.value.toLocaleString()}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${(property.value / 2100) * 100}%`, 
                      background: property.fill 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Recent Transactions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {recentTransactions.map((tx) => (
            <div key={tx.id} style={{
              padding: "12px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--card-secondary)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)" }}>
                  {tx.type}
                </div>
                <span className={`badge ${tx.status === "Received" ? "badge-green" : "badge-amber"}`}>
                  {tx.status}
                </span>
              </div>
              <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--muted)" }}>
                <span>{tx.property}</span>
                <span style={{ fontWeight: "700", color: "var(--text)" }}>
                  ${tx.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
