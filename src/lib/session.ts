export type SessionUser = {
  id: string;
  name: string;
  role: "admin" | "municipality" | "operator" | "owner";
  avatar: string;
  email: string;
  redirectTo: string;
};

export const setSessionCookies = (user: SessionUser) => {
  document.cookie = `skytrade_session=mock_jwt; path=/; max-age=86400`;
  document.cookie = `skytrade_role=${user.role}; path=/; max-age=86400`;
};

export const clearSessionCookies = () => {
  document.cookie = "skytrade_session=; path=/; max-age=0";
  document.cookie = "skytrade_role=; path=/; max-age=0";
};

export const getStoredRole = (): SessionUser["role"] | null => {
  const match = document.cookie.match(/(?:^|;\s*)skytrade_role=([^;]+)/);
  return (match?.[1] as SessionUser["role"]) || null;
};
