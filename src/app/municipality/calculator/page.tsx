"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

const COLORS = ["#1bd488", "#45828b", "#055b65"];

export default function MunicipalityCalculator() {
  const municipalUser = DEMO_USERS.find((u) => u.role === "municipality")!;
  
  const [flightVolume, setFlightVolume] = useState(500);
  const [avgFeePerFlight, setAvgFeePerFlight] = useState(25);
  const [premiumFlights, setPremiumFlights] = useState(100);
  const [premiumFee, setPremiumFee] = useState(50);
  const [corridorRentals, setCorridorRentals] = useState(5);
  const [corridorRentalPrice, setCorridorRentalPrice] = useState(500);

  const standardRevenue = (flightVolume - premiumFlights) * avgFeePerFlight;
  const premiumRevenue = premiumFlights * premiumFee;
  const corridorRevenue = corridorRentals * corridorRentalPrice;
  const monthlyRevenue = standardRevenue + premiumRevenue + corridorRevenue;
  const annualRevenue = monthlyRevenue * 12;

  const chartData = [
    { name: "Standard Flights", value: standardRevenue, fill: COLORS[0] },
    { name: "Premium Flights", value: premiumRevenue, fill: COLORS[1] },
    { name: "Corridor Rentals", value: corridorRevenue, fill: COLORS[2] },
  ];

  return (
    <AppShell role="municipality" user={municipalUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Projected Monthly</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>
            ${monthlyRevenue.toLocaleString()}
          </div>
          <div className="kpi-trend up">+14.5% MoM</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Projected Annual</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>
            ${annualRevenue.toLocaleString()}
          </div>
          <div className="kpi-trend up">+18.2% YoY</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: "24px" }}>
        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Revenue Calculator
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Premium Flights</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>{premiumFlights} flights</span>
              </div>
              <input
                type="range"
                min="0"
                max={flightVolume}
                value={premiumFlights}
                onChange={(e) => setPremiumFlights(parseInt(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Premium Flight Fee ($)</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>${premiumFee}</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                value={premiumFee}
                onChange={(e) => setPremiumFee(parseInt(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Corridor Rentals</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>{corridorRentals} rentals</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={corridorRentals}
                onChange={(e) => setCorridorRentals(parseInt(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: "var(--muted)" }}>Corridor Rental Price ($)</span>
                <span style={{ color: "var(--text)", fontWeight: "700" }}>${corridorRentalPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                value={corridorRentalPrice}
                onChange={(e) => setCorridorRentalPrice(parseInt(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
            Revenue Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                labelStyle={{ color: "var(--text)" }}
                itemStyle={{ color: "var(--text)" }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", background: COLORS[0], borderRadius: "3px" }} />
                <span style={{ color: "var(--muted)" }}>Standard Flights</span>
              </div>
              <span style={{ color: "var(--text)", fontWeight: "700" }}>
                ${standardRevenue.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", background: COLORS[1], borderRadius: "3px" }} />
                <span style={{ color: "var(--muted)" }}>Premium Flights</span>
              </div>
              <span style={{ color: "var(--text)", fontWeight: "700" }}>
                ${premiumRevenue.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", background: COLORS[2], borderRadius: "3px" }} />
                <span style={{ color: "var(--muted)" }}>Corridor Rentals</span>
              </div>
              <span style={{ color: "var(--text)", fontWeight: "700" }}>
                ${corridorRevenue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
