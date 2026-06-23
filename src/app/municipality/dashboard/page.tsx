"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

const flightData = [
  { day: "Mon", active: 32, unauthorized: 2 },
  { day: "Tue", active: 38, unauthorized: 1 },
  { day: "Wed", active: 45, unauthorized: 3 },
  { day: "Thu", active: 41, unauthorized: 0 },
  { day: "Fri", active: 52, unauthorized: 2 },
  { day: "Sat", active: 47, unauthorized: 1 },
  { day: "Sun", active: 43, unauthorized: 2 },
];

const revenueData = [
  { month: "Jan", total: 8500 },
  { month: "Feb", total: 9200 },
  { month: "Mar", total: 10800 },
  { month: "Apr", total: 10500 },
  { month: "May", total: 11200 },
  { month: "Jun", total: 12500 },
];

const recentPermits = [
  { id: 1, operator: "Foodpanda", type: "Delivery", status: "Pending", risk: "Medium", date: "Today" },
  { id: 2, operator: "Careem", type: "Delivery", status: "Approved", risk: "Low", date: "Today" },
  { id: 3, operator: "DHL", type: "Logistics", status: "Approved", risk: "Low", date: "Yesterday" },
  { id: 4, operator: "Swiggy", type: "Delivery", status: "Pending", risk: "High", date: "Yesterday" },
];

const recentAlerts = [
  { id: 1, type: "Unauthorized Flight", location: "Gulberg III", severity: "High", time: "10:32 AM" },
  { id: 2, type: "Zone Violation", location: "DHA Phase 6", severity: "Medium", time: "09:15 AM" },
  { id: 3, type: "Low Battery", location: "Model Town", severity: "Low", time: "08:45 AM" },
];

export default function MunicipalityDashboard() {
  const municipalUser = DEMO_USERS.find((u) => u.role === "municipality")!;

  return (
    <AppShell role="municipality" user={municipalUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Pending Permits</div>
          <div className="kpi-value">12</div>
          <div className="kpi-trend up">+3 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Flights</div>
          <div className="kpi-value">47</div>
          <div className="kpi-trend up">+8 from yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Alerts</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>
            5
          </div>
          <div className="kpi-trend down">-2 resolved</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Revenue</div>
          <div className="kpi-value">$12,500</div>
          <div className="kpi-trend up">+14.5% MoM</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: "24px" }}>
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Flight Activity
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={flightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} />
              <YAxis stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                labelStyle={{ color: "var(--text)" }}
                itemStyle={{ color: "var(--text)" }}
              />
              <Bar dataKey="active" fill="#1bd488" radius={[8, 8, 0, 0]} name="Active Flights" />
              <Bar dataKey="unauthorized" fill="#ef4444" radius={[8, 8, 0, 0]} name="Unauthorized Flights" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
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
              <Line type="monotone" dataKey="total" stroke="#1bd488" strokeWidth={3} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Recent Permits
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentPermits.map((permit) => (
              <div key={permit.id} style={{
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--card-secondary)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)" }}>
                    {permit.operator}
                  </div>
                  <span className={`badge ${permit.status === "Approved" ? "badge-green" : "badge-amber"}`}>
                    {permit.status}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--muted)" }}>
                  <span>{permit.type}</span>
                  <span>Risk: {permit.risk}</span>
                  <span>{permit.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Recent Alerts
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentAlerts.map((alert) => (
              <div key={alert.id} style={{
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--card-secondary)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)" }}>
                    {alert.type}
                  </div>
                  <span className={`badge ${alert.severity === "High" ? "badge-red" : alert.severity === "Medium" ? "badge-amber" : "badge-green"}`}>
                    {alert.severity}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--muted)" }}>
                  <span>{alert.location}</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
