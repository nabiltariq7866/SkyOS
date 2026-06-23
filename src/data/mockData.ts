export const MOCK_STATS = {
  totalProperties: 50000,
  claimedParcels: 8000,
  activeListings: 500,
  unauthorizedFlights: 250,
  totalRevenue: 2840000,
  protocolFees: 142000,
  municipalEarnings: 994000,
  propertyOwnerPayouts: 1704000,
};

export const DEMO_USERS = [
  {
    id: "admin",
    name: "SkyTrade Executive",
    role: "admin",
    avatar: "SE",
    email: "executive@skytrade.com",
    redirectTo: "/admin",
  },
  {
    id: "municipality",
    name: "Lahore Municipal Officer",
    role: "municipality",
    avatar: "LM",
    email: "officer@lahore.pk",
    redirectTo: "/municipality",
  },
  {
    id: "operator",
    name: "DHL Drone Fleet Operator",
    role: "operator",
    avatar: "DF",
    email: "ops@dhl.com",
    redirectTo: "/operator",
  },
  {
    id: "owner",
    name: "Hafeez Center Property Owner",
    role: "owner",
    avatar: "HC",
    email: "owner@hafeezcenter.pk",
    redirectTo: "/owner",
  },
];

export const TRANSACTIONS = [
  { id: 1, type: "Rental", amount: 450, property: "Parcel #1234", status: "Completed", txHash: "0x1234...abcd" },
  { id: 2, type: "Rental", amount: 320, property: "Parcel #5678", status: "Pending", txHash: "0x5678...efgh" },
  { id: 3, type: "Sale", amount: 12500, property: "Parcel #9012", status: "Completed", txHash: "0x9012...ijkl" },
];

export const PERMITS = [
  { id: 1, operator: "DHL", route: "Route A", status: "Approved", riskScore: 85, date: "2026-06-20" },
  { id: 2, operator: "Foodpanda", route: "Route B", status: "Pending", riskScore: 72, date: "2026-06-21" },
  { id: 3, operator: "Careem", route: "Route C", status: "Rejected", riskScore: 45, date: "2026-06-21" },
];

export const FLIGHT_ALERTS = [
  { id: 1, location: "Gulberg III", type: "Unauthorized", severity: "High", time: "10:32 AM" },
  { id: 2, location: "DHA Phase 6", type: "Authorized", severity: "Low", time: "10:15 AM" },
  { id: 3, location: "Model Town", type: "Unauthorized", severity: "Medium", time: "09:45 AM" },
];

export const PROPERTIES = [
  { id: 1, address: "Hafeez Center, Gulberg III", status: "Claimed", value: 125000, monthlyRent: 2400 },
  { id: 2, address: "Emporium Mall, Johar Town", status: "Available", value: 180000, monthlyRent: 3600 },
  { id: 3, address: "Packages Mall, Walton Road", status: "Claimed", value: 150000, monthlyRent: 3000 },
];

export const NAV_ITEMS_ADMIN = [
  { id: "overview", label: "Executive Overview", icon: "overview", group: "Command Center", slug: "overview" },
  { id: "marketplace", label: "Marketplace Liquidity", icon: "marketplace", group: "Platform", slug: "marketplace" },
  { id: "revenue", label: "Revenue Analytics", icon: "revenue", group: "Platform", slug: "revenue" },
  { id: "compliance", label: "Compliance Engine", icon: "compliance", group: "Governance", slug: "compliance" },
];

export const NAV_ITEMS_MUNICIPALITY = [
  { id: "dashboard", label: "Municipal Dashboard", icon: "dashboard", group: "Governance", slug: "dashboard" },
  { id: "permits", label: "Permit Queue", icon: "permits", group: "Governance", slug: "permits" },
  { id: "alerts", label: "Flight Alerts", icon: "alerts", group: "Operations", slug: "alerts" },
  { id: "calculator", label: "Revenue Calculator", icon: "revenue", group: "Finance", slug: "calculator" },
];

export const NAV_ITEMS_OPERATOR = [
  { id: "dashboard", label: "Fleet Dashboard", icon: "dashboard", group: "Operations", slug: "dashboard" },
  { id: "routes", label: "Route Planning", icon: "routes", group: "Operations", slug: "routes" },
  { id: "permits", label: "Permit Status", icon: "permits", group: "Compliance", slug: "permits" },
  { id: "billing", label: "Billing & Invoices", icon: "billing", group: "Finance", slug: "billing" },
];

export const NAV_ITEMS_OWNER = [
  { id: "dashboard", label: "Property Dashboard", icon: "dashboard", group: "My Assets", slug: "dashboard" },
  { id: "properties", label: "My Properties", icon: "properties", group: "My Assets", slug: "properties" },
  { id: "earnings", label: "Earnings & Payouts", icon: "earnings", group: "Finance", slug: "earnings" },
  { id: "certificates", label: "Fractional Certificates", icon: "certificates", group: "Assets", slug: "certificates" },
];
