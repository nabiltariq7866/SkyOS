const STORAGE_KEY = "skyos_activity_log";
const MAX_ENTRIES = 400;

export type ActivityEntry = {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  type: string;
  action: string;
  detail: string;
  screen?: string;
};

const SEED_LOGS: ActivityEntry[] = [
  {
    id: "seed-100",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    userName: "SkyTrade Executive",
    userRole: "admin",
    type: "logged_in",
    action: "Daily system check initiated",
    detail: "Morning review of platform metrics and alerts",
    screen: "admin/overview",
  },
  {
    id: "seed-99",
    timestamp: new Date(Date.now() - 3600000 * 22).toISOString(),
    userName: "Lahore Municipal Officer",
    userRole: "municipality",
    type: "created",
    action: "Flight permit approved",
    detail: "Permit #PT-4781 issued to Foodpanda for Johar Town → Gulberg route",
    screen: "municipality/permits",
  },
  {
    id: "seed-98",
    timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
    userName: "Hafeez Center Property Owner",
    userRole: "owner",
    type: "viewed",
    action: "Viewed property dashboard",
    detail: "Checked current bookings and pending transactions",
    screen: "owner/dashboard",
  },
  {
    id: "seed-97",
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    userName: "DHL Drone Fleet Operator",
    userRole: "operator",
    type: "completed",
    action: "Express delivery flight completed",
    detail: "Drone DHL-02: 8 parcels delivered, 12.4km flown in 18 minutes",
    screen: "operator/dashboard",
  },
  {
    id: "seed-96",
    timestamp: new Date(Date.now() - 3600000 * 16).toISOString(),
    userName: "Lahore Municipal Officer",
    userRole: "municipality",
    type: "viewed",
    action: "Reviewed flight alert",
    detail: "Alert #AL-8891: Restricted zone violation near Jinnah Hospital",
    screen: "municipality/alerts",
  },
  {
    id: "seed-95",
    timestamp: new Date(Date.now() - 3600000 * 14).toISOString(),
    userName: "SkyTrade Executive",
    userRole: "admin",
    type: "processed",
    action: "Airspace parcel claim processed",
    detail: "Packages Mall rooftop space — Claim #7122 approved",
    screen: "admin/marketplace",
  },
  {
    id: "seed-94",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    userName: "DHL Drone Fleet Operator",
    userRole: "operator",
    type: "searched",
    action: "Route optimization requested",
    detail: "Planned route from DHA Phase 6 to Emporium Mall",
    screen: "operator/routes",
  },
  {
    id: "seed-93",
    timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
    userName: "Hafeez Center Property Owner",
    userRole: "owner",
    type: "viewed",
    action: "Earnings statement accessed",
    detail: "May payout: $4,800 — 8.2% growth from April",
    screen: "owner/earnings",
  },
  {
    id: "seed-92",
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    userName: "SkyTrade Executive",
    userRole: "admin",
    type: "viewed",
    action: "Executive overview opened",
    detail: "Reviewed protocol revenue, marketplace liquidity, and city adoption",
    screen: "admin/overview",
  },
  {
    id: "seed-91",
    timestamp: new Date(Date.now() - 3600000 * 7.5).toISOString(),
    userName: "Lahore Municipal Officer",
    userRole: "municipality",
    type: "approved",
    action: "Restricted zone request denied",
    detail: "Operator requested access to Liberty Roundabout — rejected",
    screen: "municipality/permits",
  },
  {
    id: "seed-90",
    timestamp: new Date(Date.now() - 3600000 * 7).toISOString(),
    userName: "DHL Drone Fleet Operator",
    userRole: "operator",
    type: "viewed",
    action: "Permit status checked",
    detail: "Permit #PT-4801 active, expires in 48 hours",
    screen: "operator/permits",
  },
  {
    id: "seed-89",
    timestamp: new Date(Date.now() - 3600000 * 6.5).toISOString(),
    userName: "SkyTrade Executive",
    userRole: "admin",
    type: "viewed",
    action: "Marketplace activity reviewed",
    detail: "23 new listings added today, 15 claims pending",
    screen: "admin/marketplace",
  },
  {
    id: "seed-88",
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
    userName: "SkyTrade Executive",
    userRole: "admin",
    type: "processed",
    action: "Airspace parcel claim approved",
    detail: "Hafeez Center rooftop airspace — Claim #7218 validated",
    screen: "admin/marketplace",
  },
  {
    id: "seed-87",
    timestamp: new Date(Date.now() - 3600000 * 5.5).toISOString(),
    userName: "Hafeez Center Property Owner",
    userRole: "owner",
    type: "viewed",
    action: "Property listings checked",
    detail: "3 active listings, 2 pending bookings",
    screen: "owner/properties",
  },
  {
    id: "seed-86",
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    userName: "Lahore Municipal Officer",
    userRole: "municipality",
    type: "created",
    action: "Flight permit issued",
    detail: "Permit #PT-4892 issued to DHL for Gulberg → Model Town route",
    screen: "municipality/permits",
  },
  {
    id: "seed-85",
    timestamp: new Date(Date.now() - 3600000 * 4.5).toISOString(),
    userName: "DHL Drone Fleet Operator",
    userRole: "operator",
    type: "started",
    action: "Delivery mission initiated",
    detail: "Drone DHL-03 dispatched to DHA Phase 5",
    screen: "operator/dashboard",
  },
  {
    id: "seed-84",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    userName: "DHL Drone Fleet Operator",
    userRole: "operator",
    type: "completed",
    action: "Delivery flight completed",
    detail: "Drone DHL-01 — 12 parcels delivered, 18km flown",
    screen: "operator/dashboard",
  },
  {
    id: "seed-83",
    timestamp: new Date(Date.now() - 3600000 * 3.5).toISOString(),
    userName: "Lahore Municipal Officer",
    userRole: "municipality",
    type: "viewed",
    action: "Revenue calculator opened",
    detail: "Projected monthly earnings: $15,000 with 500 flights",
    screen: "municipality/calculator",
  },
  {
    id: "seed-82",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    userName: "Hafeez Center Property Owner",
    userRole: "owner",
    type: "viewed",
    action: "Viewed earnings report",
    detail: "June earnings: $5,400 — +12.5% MoM growth",
    screen: "owner/earnings",
  },
  {
    id: "seed-81",
    timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    userName: "Lahore Municipal Officer",
    userRole: "municipality",
    type: "logged_in",
    action: "Logged in to municipal portal",
    detail: "Session started from IP 192.168.1.45",
    screen: "municipality/dashboard",
  },
  {
    id: "seed-80",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    userName: "DHL Drone Fleet Operator",
    userRole: "operator",
    type: "searched",
    action: "Searched for optimal routes",
    detail: "Route planner used — 5 alternative paths found for DHA corridor",
    screen: "operator/routes",
  },
  {
    id: "seed-79",
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    userName: "SkyTrade Executive",
    userRole: "admin",
    type: "viewed",
    action: "Insurance policies checked",
    detail: "12 active policies, 2 pending renewals",
    screen: "admin/insurance",
  },
  {
    id: "seed-78",
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    userName: "DHL Drone Fleet Operator",
    userRole: "operator",
    type: "viewed",
    action: "Invoice history reviewed",
    detail: "Last 3 invoices total: $890",
    screen: "operator/billing",
  },
  {
    id: "seed-77",
    timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    userName: "Lahore Municipal Officer",
    userRole: "municipality",
    type: "viewed",
    action: "Viewed unauthorized flight alert",
    detail: "Alert #AL-9012 — Unauthorized drone in restricted zone Sector 7",
    screen: "municipality/alerts",
  },
  {
    id: "seed-76",
    timestamp: new Date(Date.now() - 60000 * 30).toISOString(),
    userName: "DHL Drone Fleet Operator",
    userRole: "operator",
    type: "logged_in",
    action: "Fleet operations session started",
    detail: "Operator logged in from office IP 10.0.0.12",
    screen: "operator/dashboard",
  },
];

export const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
  completed: "Completed",
  generated: "Generated",
  logged_in: "Logged in",
  logged_out: "Logged out",
  searched: "Searched",
  synced: "Synced",
  processed: "Processed",
  viewed: "Viewed",
  started: "Started",
  annotated: "Annotated",
  approved: "Approved",
  issued: "Issued",
  rejected: "Rejected",
};

export function loadActivityLog(): ActivityEntry[] {
  if (typeof window === "undefined") return [...SEED_LOGS];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_LOGS));
      return [...SEED_LOGS];
    }
    const parsed = JSON.parse(raw) as ActivityEntry[];
    return Array.isArray(parsed) ? parsed : [...SEED_LOGS];
  } catch {
    return [...SEED_LOGS];
  }
}

function saveActivityLog(entries: ActivityEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
}

export function appendActivityLog(entry: Omit<ActivityEntry, "id" | "timestamp">) {
  const full: ActivityEntry = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
  };
  const existing = loadActivityLog();
  saveActivityLog([full, ...existing]);
  return full;
}

export function clearActivityLog() {
  saveActivityLog([]);
}
