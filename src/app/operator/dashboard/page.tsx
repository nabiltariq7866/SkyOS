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

const flightStats = [
  { day: "Mon", completed: 18, distance: 85 },
  { day: "Tue", completed: 22, distance: 98 },
  { day: "Wed", completed: 25, distance: 110 },
  { day: "Thu", completed: 20, distance: 90 },
  { day: "Fri", completed: 28, distance: 125 },
  { day: "Sat", completed: 26, distance: 115 },
  { day: "Sun", completed: 24, distance: 105 },
];

const costData = [
  { month: "Jan", total: 3500 },
  { month: "Feb", total: 3800 },
  { month: "Mar", total: 4100 },
  { month: "Apr", total: 3900 },
  { month: "May", total: 4300 },
  { month: "Jun", total: 4500 },
];

const recentFlights = [
  { id: 1, drone: "Drone-01", route: "Gulberg → Model Town", status: "Completed", time: "10:30 AM" },
  { id: 2, drone: "Drone-03", route: "DHA → Bahria", status: "In Flight", time: "10:15 AM" },
  { id: 3, drone: "Drone-02", route: "Liberty → Gulberg", status: "Completed", time: "09:45 AM" },
  { id: 4, drone: "Drone-04", route: "Johar → DHA", status: "Pending", time: "11:00 AM" },
];

export default function OperatorDashboard() {
  const operatorUser = DEMO_USERS.find((u) => u.role === "operator")!;

  return (
    <AppShell role="operator" user={operatorUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Drones</div>
          <div className="kpi-value">24</div>
          <div className="kpi-trend up">+3 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Completed Flights</div>
          <div className="kpi-value">142</div>
          <div className="kpi-trend up">+18 today</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. Cost per Flight</div>
          <div className="kpi-value">$38</div>
          <div className="kpi-trend down">-5.2% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Pending Permits</div>
          <div className="kpi-value">4</div>
          <div className="kpi-trend up">+1 today</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: "24px" }}>
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Weekly Flight Activity
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={flightStats}>
              <defs>
                <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1bd488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1bd488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} />
              <YAxis stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                labelStyle={{ color: "var(--text)" }}
                itemStyle={{ color: "var(--text)" }}
              />
              <Area
                type="monotone"
                dataKey="distance"
                stroke="#1bd488"
                strokeWidth={3}
                fill="url(#colorDistance)"
                name="Distance (km)"
              />
              <Line type="monotone" dataKey="completed" stroke="#45828b" strokeWidth={2} name="Completed Flights" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Monthly Costs
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={costData}>
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
              <Line type="monotone" dataKey="total" stroke="#1bd488" strokeWidth={3} name="Total Cost" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Recent Flights
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {recentFlights.map((flight) => (
            <div key={flight.id} style={{
              padding: "12px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--card-secondary)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text)" }}>
                  {flight.drone}
                </div>
                <span className={`badge ${flight.status === "Completed" ? "badge-green" : flight.status === "In Flight" ? "badge-amber" : "badge-blue"}`}>
                  {flight.status}
                </span>
              </div>
              <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--muted)" }}>
                <span>{flight.route}</span>
                <span>{flight.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
