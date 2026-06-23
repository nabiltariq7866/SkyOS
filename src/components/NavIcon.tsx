import {
  LayoutDashboard,
  ShoppingCart,
  DollarSign,
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  MapPin,
  CreditCard,
  Building2,
  Wallet,
  Ticket,
  Globe,
} from "lucide-react";

type IconName =
  | "overview"
  | "marketplace"
  | "revenue"
  | "compliance"
  | "dashboard"
  | "permits"
  | "alerts"
  | "routes"
  | "billing"
  | "properties"
  | "earnings"
  | "certificates"
  | "brand";

export function NavIcon({ name, size = 18 }: { name: IconName; size?: number }) {
  const iconProps = { size, strokeWidth: 2 };

  switch (name) {
    case "overview":
      return <LayoutDashboard {...iconProps} />;
    case "marketplace":
      return <ShoppingCart {...iconProps} />;
    case "revenue":
      return <DollarSign {...iconProps} />;
    case "compliance":
      return <ShieldCheck {...iconProps} />;
    case "dashboard":
      return <LayoutDashboard {...iconProps} />;
    case "permits":
      return <FileCheck {...iconProps} />;
    case "alerts":
      return <AlertTriangle {...iconProps} />;
    case "routes":
      return <MapPin {...iconProps} />;
    case "billing":
      return <CreditCard {...iconProps} />;
    case "properties":
      return <Building2 {...iconProps} />;
    case "earnings":
      return <Wallet {...iconProps} />;
    case "certificates":
      return <Ticket {...iconProps} />;
    case "brand":
      return <Globe {...iconProps} />;
    default:
      return <LayoutDashboard {...iconProps} />;
  }
}
