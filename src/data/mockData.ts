import type { SessionUser } from "@/lib/session";

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

export const DEMO_USERS: SessionUser[] = [
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
  { id: "infrastructure", label: "Infrastructure Assets", icon: "infrastructure", group: "Assets", slug: "infrastructure" },
  { id: "insurance", label: "Drone Insurance", icon: "insurance", group: "Risk", slug: "insurance" },
  { id: "copilot", label: "AI Copilot", icon: "copilot", group: "AI", slug: "copilot" },
  { id: "activity", label: "Activity & Audit Log", icon: "activity", group: "Operations", slug: "activity" },
];

export const NAV_ITEMS_MUNICIPALITY = [
  { id: "dashboard", label: "Municipal Dashboard", icon: "dashboard", group: "Governance", slug: "dashboard" },
  { id: "permits", label: "Permit Queue", icon: "permits", group: "Governance", slug: "permits" },
  { id: "alerts", label: "Flight Alerts", icon: "alerts", group: "Operations", slug: "alerts" },
  { id: "calculator", label: "Revenue Calculator", icon: "revenue", group: "Finance", slug: "calculator" },
  { id: "copilot", label: "AI Copilot", icon: "copilot", group: "AI", slug: "copilot" },
  { id: "activity", label: "Activity Log", icon: "activity", group: "Operations", slug: "activity" },
];

export const NAV_ITEMS_OPERATOR = [
  { id: "dashboard", label: "Fleet Dashboard", icon: "dashboard", group: "Operations", slug: "dashboard" },
  { id: "routes", label: "Route Planning", icon: "routes", group: "Operations", slug: "routes" },
  { id: "permits", label: "Permit Status", icon: "permits", group: "Compliance", slug: "permits" },
  { id: "billing", label: "Billing & Invoices", icon: "billing", group: "Finance", slug: "billing" },
  { id: "insurance", label: "Drone Insurance", icon: "insurance", group: "Risk", slug: "insurance" },
  { id: "copilot", label: "AI Copilot", icon: "copilot", group: "AI", slug: "copilot" },
  { id: "activity", label: "Activity Log", icon: "activity", group: "Operations", slug: "activity" },
];

export const NAV_ITEMS_OWNER = [
  { id: "dashboard", label: "Property Dashboard", icon: "dashboard", group: "My Assets", slug: "dashboard" },
  { id: "properties", label: "My Properties", icon: "properties", group: "My Assets", slug: "properties" },
  { id: "infrastructure", label: "Infrastructure Assets", icon: "infrastructure", group: "My Assets", slug: "infrastructure" },
  { id: "earnings", label: "Earnings & Payouts", icon: "earnings", group: "Finance", slug: "earnings" },
  { id: "certificates", label: "Fractional Certificates", icon: "certificates", group: "Assets", slug: "certificates" },
  { id: "copilot", label: "AI Copilot", icon: "copilot", group: "AI", slug: "copilot" },
  { id: "activity", label: "Activity Log", icon: "activity", group: "Operations", slug: "activity" },
];

export const INFRASTRUCTURE_ASSETS = [
  { id: 1, type: "Telecom Tower", address: "Gulberg III, Lahore", leaseIncome: 15000, valuation: 250000, tokenization: "Ready", yield: "6.0%", riskScore: 85, status: "Active" },
  { id: 2, type: "Solar Panels", address: "DHA Phase 6, Lahore", leaseIncome: 8000, valuation: 120000, tokenization: "In Progress", yield: "6.7%", riskScore: 90, status: "Active" },
  { id: 3, type: "Billboard", address: "MM Alam Road, Lahore", leaseIncome: 12000, valuation: 180000, tokenization: "Pending", yield: "6.7%", riskScore: 75, status: "Active" },
  { id: 4, type: "Drone Deck", address: "Packages Mall, Lahore", leaseIncome: 5000, valuation: 80000, tokenization: "Ready", yield: "7.5%", riskScore: 92, status: "Available" },
];

export const INSURANCE_POLICIES = [
  { id: 1, operator: "DHL", type: "Per-Flight", coverage: "$50,000", premium: "$25", status: "Active" },
  { id: 2, operator: "Foodpanda", type: "Monthly", coverage: "$100,000", premium: "$350", status: "Active" },
  { id: 3, operator: "Careem", type: "Per-Flight", coverage: "$50,000", premium: "$25", status: "Expired" },
];

export const COPILOT_MESSAGES = {
  admin: [
    {
      id: 1,
      sender: "user",
      text: "How much revenue did we generate this month?",
    },
    {
      id: 2,
      sender: "ai",
      text: "Protocol revenue this month is $142,000, up 18.2% YoY. Property owners earned $1,704,000, and municipalities earned $994,000.",
    },
    {
      id: 3,
      sender: "user",
      text: "Which city has the highest corridor demand?",
    },
    {
      id: 4,
      sender: "ai",
      text: "Lahore shows the strongest demand, with 120 active route requests this week across the Gulberg‑DHA corridor.",
    },
  ],
  municipality: [
    {
      id: 1,
      sender: "user",
      text: "Which drone requests need review today?",
    },
    {
      id: 2,
      sender: "ai",
      text: "You have 3 pending permit requests: Foodpanda (Route B, risk score 72), Careem (Route C, risk score 45), and DHL (Route A, risk score 85, already approved).",
    },
    {
      id: 3,
      sender: "user",
      text: "Show me the latest flight alerts.",
    },
    {
      id: 4,
      sender: "ai",
      text: "Latest alerts: Unauthorized flight in Gulberg III (High, 10:32 AM), Authorized flight in DHA Phase 6 (Low, 10:15 AM), Unauthorized flight in Model Town (Medium, 09:45 AM).",
    },
  ],
  operator: [
    {
      id: 1,
      sender: "user",
      text: "What is the cheapest compliant route from Emporium to Hafeez Center?",
    },
    {
      id: 2,
      sender: "ai",
      text: "Cheapest route: Gulberg Corridor, costing $320 for a 30‑minute window. It avoids restricted zones and has permission from all 5 parcels.",
    },
    {
      id: 3,
      sender: "user",
      text: "Why was my last permit rejected?",
    },
    {
      id: 4,
      sender: "ai",
      text: "Your previous permit (Route C, Careem) was rejected because it crossed a high‑risk hospital zone without a time window exemption.",
    },
  ],
  owner: [
    {
      id: 1,
      sender: "user",
      text: "What is my airspace worth?",
    },
    {
      id: 2,
      sender: "ai",
      text: "Your Hafeez Center parcel is valued at $125,000, with a monthly rental income of $2,400. It’s in a high‑demand corridor!",
    },
    {
      id: 3,
      sender: "user",
      text: "How much did I earn this month?",
    },
    {
      id: 4,
      sender: "ai",
      text: "You earned $2,400 this month from 3 rental transactions, all settled to your wallet.",
    },
  ],
};
