"use client";

import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";

export default function OperatorBilling() {
  const operatorUser = DEMO_USERS.find((u) => u.role === "operator")!;

  const invoices = [
    { id: "INV-001", date: "Jun 20, 2026", amount: 850, status: "Paid" },
    { id: "INV-002", date: "Jun 15, 2026", amount: 420, status: "Pending" },
    { id: "INV-003", date: "Jun 10, 2026", amount: 680, status: "Paid" },
  ];

  return (
    <AppShell role="operator" user={operatorUser}>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Current Balance</div>
          <div className="kpi-value" style={{ color: "var(--accent)" }}>$2,340</div>
          <div className="kpi-trend down">-12% from last month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Spent</div>
          <div className="kpi-value">$12,580</div>
          <div className="kpi-trend up">+18% YoY</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Pending Invoices</div>
          <div className="kpi-value" style={{ color: "var(--amber-500)" }}>2</div>
          <div className="kpi-trend up">+1 this week</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. Monthly Cost</div>
          <div className="kpi-value">$1,450</div>
          <div className="kpi-trend down">-5% from last month</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text)", marginBottom: "16px" }}>
          Invoices
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td style={{ fontWeight: "600" }}>{invoice.id}</td>
                  <td>{invoice.date}</td>
                  <td style={{ fontWeight: "700" }}>${invoice.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${invoice.status === "Paid" ? "badge-green" : "badge-amber"}`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
