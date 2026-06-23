"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { DEMO_USERS } from "@/data/mockData";
import { appendActivityLog, clearActivityLog, loadActivityLog, type ActivityEntry } from "@/lib/activityLog";
import { getStoredRole } from "@/lib/session";

type LogInput = Omit<ActivityEntry, "id" | "timestamp" | "userName" | "userRole"> & {
  userName?: string;
  userRole?: string;
};

type AppContextValue = {
  logActivity: (entry: LogInput) => void;
  activityEntries: ActivityEntry[];
  refreshActivityLog: () => void;
  clearActivityLogStorage: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function getActor() {
  const role = getStoredRole();
  const user = DEMO_USERS.find((u) => u.role === role);
  return {
    userName: user?.name ?? "Anonymous User",
    userRole: user?.role ?? "guest",
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [activityEntries, setActivityEntries] = useState<ActivityEntry[]>([]);

  const refreshActivityLog = useCallback(() => {
    setActivityEntries(loadActivityLog());
  }, []);

  useEffect(() => {
    refreshActivityLog();
  }, [refreshActivityLog]);

  const logActivity = useCallback(
    (entry: LogInput) => {
      const actor = getActor();
      appendActivityLog({
        userName: entry.userName ?? actor.userName,
        userRole: entry.userRole ?? actor.userRole,
        type: entry.type,
        action: entry.action,
        detail: entry.detail,
        screen: entry.screen,
      });
      refreshActivityLog();
    },
    [refreshActivityLog]
  );

  const clearActivityLogStorage = useCallback(() => {
    clearActivityLog();
    refreshActivityLog();
  }, [refreshActivityLog]);

  return (
    <AppContext.Provider
      value={{
        logActivity,
        activityEntries,
        refreshActivityLog,
        clearActivityLogStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
