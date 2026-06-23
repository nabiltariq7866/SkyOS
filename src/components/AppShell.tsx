"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { NavIcon } from "@/components/NavIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  NAV_ITEMS_ADMIN,
  NAV_ITEMS_MUNICIPALITY,
  NAV_ITEMS_OPERATOR,
  NAV_ITEMS_OWNER,
  DEMO_USERS,
} from "@/data/mockData";
import { clearSessionCookies } from "@/lib/session";

type Role = "admin" | "municipality" | "operator" | "owner";

const navItemsByRole: Record<Role, typeof NAV_ITEMS_ADMIN> = {
  admin: NAV_ITEMS_ADMIN,
  municipality: NAV_ITEMS_MUNICIPALITY,
  operator: NAV_ITEMS_OPERATOR,
  owner: NAV_ITEMS_OWNER,
};

export function AppShell({
  children,
  role,
  user,
}: {
  children: ReactNode;
  role: Role;
  user: (typeof DEMO_USERS)[0];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [proMode, setProMode] = useState(true);

  const navItems = navItemsByRole[role];
  const groups = [...new Set(navItems.map((n) => n.group))];

  const handleLogout = () => {
    clearSessionCookies();
    router.push("/login");
  };

  const isActive = (slug: string) => {
    return pathname === `/${role}/${slug}` || (pathname === `/${role}` && slug === navItems[0].slug);
  };

  return (
    <div className="app-layout">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} aria-label="Main navigation">
        <div className="sidebar-brand">
          <div className="sidebar-brand-full">
            <div className="sidebar-eyebrow">Demo v1.0</div>
            <div className="sidebar-title">SkyOS</div>
          </div>
          <div className="sidebar-brand-compact" title="SkyOS">
            <NavIcon name="brand" size={22} />
          </div>
        </div>

        <nav className="sidebar-nav">
          {groups.map((g) => (
            <div key={g}>
              {!collapsed && <div className="nav-section-label">{g}</div>}
              {navItems.filter((n) => n.group === g).map((item) => (
                <Link
                  key={item.id}
                  href={`/${role}/${item.slug}`}
                  title={collapsed ? item.label : undefined}
                  className={`nav-link ${isActive(item.slug) ? "active" : ""}`}
                >
                  <span className="nav-icon">
                    <NavIcon name={item.icon as any} size={18} />
                  </span>
                  {!collapsed && <span className="nav-label">{item.label}</span>}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-expanded">
            <div className="pro-mode-row">
              <span>Pro Mode</span>
              <button
                type="button"
                className={`pro-mode-toggle ${proMode ? "on" : "off"}`}
                onClick={() => setProMode(!proMode)}
                aria-label="Toggle Pro Mode"
              >
                <span className="pro-mode-knob" style={{ left: proMode ? 20 : 3 }} />
              </button>
            </div>
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">{user.avatar}</div>
              <div>
                <div className="sidebar-user-name">{user.name}</div>
                <div className="sidebar-user-email">{user.email}</div>
              </div>
            </div>
          </div>
          <button type="button" className="sidebar-toggle" onClick={() => setCollapsed((c) => !c)} aria-label="Toggle sidebar">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span className="sidebar-toggle-label">Collapse</span>}
          </button>
        </div>
      </aside>

      <div className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
        <header className="top-bar">
          <div className="top-bar-left">
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)" }}>
              {role === "admin"
                ? "Executive Dashboard"
                : role === "municipality"
                ? "Municipal Governance"
                : role === "operator"
                ? "Fleet Operations"
                : "Property Owner Portal"}
            </div>
          </div>
          <div className="top-bar-right">
            <ThemeToggle showLabel />
            <span className="user-pill">{user.name}</span>
            <span style={{ fontSize: 12, color: "var(--muted)", whiteSpace: "nowrap" }}>Jun 2026</span>
            <button type="button" className="top-bar-btn" onClick={() => {}}>Export</button>
            <button type="button" className="top-bar-btn top-bar-btn-ghost" onClick={handleLogout}>Sign out</button>
          </div>
        </header>

        <div className="page-body">{children}</div>
      </div>
    </div>
  );
}
