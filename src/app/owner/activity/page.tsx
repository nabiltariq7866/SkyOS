"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DEMO_USERS } from "@/data/mockData";
import { useApp } from "@/context/AppProvider";
import { ACTIVITY_TYPE_LABELS } from "@/lib/activityLog";

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  created: { bg: "#e6fbf2", color: "#055b65" },
  updated: { bg: "#e8f4f2", color: "#45828b" },
  generated: { bg: "#e0eef0", color: "#45828b" },
  logged_in: { bg: "#e6fbf2", color: "#059669" },
  logged_out: { bg: "#fffbeb", color: "#d97706" },
  completed: { bg: "#e6fbf2", color: "#055b65" },
  viewed: { bg: "#e0e5e9", color: "#45828b" },
  searched: { bg: "#e6fbf2", color: "#1bd488" },
  started: { bg: "#fffbeb", color: "#d97706" },
  processed: { bg: "#d4e8ea", color: "#055b65" },
  annotated: { bg: "#e8f4f2", color: "#1bd488" },
  synced: { bg: "#e0eef0", color: "#45828b" },
  approved: { bg: "#e6fbf2", color: "#059669" },
  issued: { bg: "#e6fbf2", color: "#055b65" },
  rejected: { bg: "#fff1f1", color: "#ef4444" },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function OwnerActivityPage() {
  const ownerUser = DEMO_USERS.find((u) => u.role === "owner")!;
  const { activityEntries, refreshActivityLog } = useApp();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    let list = activityEntries.filter((e) => e.userRole === "owner");
    if (typeFilter !== "all") list = list.filter((e) => e.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.userName.toLowerCase().includes(q) ||
          e.action.toLowerCase().includes(q) ||
          e.detail.toLowerCase().includes(q) ||
          e.screen?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activityEntries, search, typeFilter]);

  return (
    <AppShell role="owner" user={ownerUser}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text)", marginBottom: "8px" }}>
          Activity Log
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          Your property actions and transactions
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "20px", padding: "16px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user, action, detail…"
          style={{ flex: 1, minWidth: "200px", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: "13px" }}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: "13px" }}>
          <option value="all">All types</option>
          {Object.entries(ACTIVITY_TYPE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <button onClick={refreshActivityLog} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)", fontSize: "13px", cursor: "pointer" }}>
          Refresh
        </button>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>No activity entries match your filters</div>
        ) : (
          filtered.map((e) => {
            const colors = TYPE_COLORS[e.type] ?? { bg: "#e0e5e9", color: "#45828b" };
            return (
              <div key={e.id} style={{ display: "flex", gap: "14px", padding: "14px 18px", borderBottom: "1px solid var(--border)", alignItems: "flex-start" }}>
                <span style={{ fontSize: "10px", fontWeight: "700", padding: "4px 8px", borderRadius: "6px", background: colors.bg, color: colors.color, whiteSpace: "nowrap" }}>
                  {ACTIVITY_TYPE_LABELS[e.type] ?? e.type}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text)" }}>{e.action}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>{e.detail}</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>
                    {formatTime(e.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
