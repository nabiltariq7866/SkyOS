"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavIcon } from "@/components/NavIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DEMO_USERS } from "@/data/mockData";
import { setSessionCookies } from "@/lib/session";

export function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = (user: (typeof DEMO_USERS)[0]) => {
    setLoading(user.id);
    setTimeout(() => {
      setSessionCookies(user);
      router.push(user.redirectTo);
    }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "24px", display: "flex", flexDirection: "column" }}>
      {/* Top Bar: Left Brand, Right Theme Toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Left: Brand */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
          <div className="brand-icon" style={{ width: "48px", height: "48px", borderRadius: "14px" }}>
            <NavIcon name="brand" size={26} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text)" }}>SkyOS</div>
            <div style={{ fontSize: "10px", color: "var(--muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Airspace Intelligence & Governance
            </div>
          </div>
        </div>
        {/* Right: Theme Toggle */}
        <div className="login-theme-wrap">
          <ThemeToggle showLabel />
        </div>
      </div>

      {/* Center: Login Form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "520px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text)", margin: "0" }}>
              Welcome to SkyOS Operating System
            </h1>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "6px", maxWidth: "420px", margin: "6px auto 0" }}>
              Select your role to access the demo dashboard
            </p>
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {DEMO_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleLogin(user)}
                disabled={loading === user.id}
                style={{
                  width: "100%",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, transform 0.1s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "var(--gradient-brand)",
                    color: "var(--text-on-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "16px",
                    flexShrink: "0",
                  }}
                >
                  {loading === user.id ? (
                    <div style={{ animation: "spin 1s linear infinite", width: "20px", height: "20px", border: "2px solid transparent", borderTopColor: "currentColor", borderRadius: "50%" }} />
                  ) : (
                    user.avatar
                  )}
                </div>
                <div style={{ flex: "1" }}>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text)", marginBottom: "2px" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--muted)", textTransform: "capitalize" }}>
                    {user.role}
                  </div>
                </div>
                <div style={{ fontSize: "20px", color: "var(--accent)" }}>→</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
