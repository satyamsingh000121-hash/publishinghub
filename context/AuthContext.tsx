"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  phoneNumber?: string | null;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkSession: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useCallback((newUser: AuthUser | null) => {
    setUserState(newUser);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("auth-state-changed", { detail: { user: newUser, source: "context" } })
      );
    }
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json?.data?.id) {
          setUserState(json.data);
          return;
        }
      }
      setUserState(null);
    } catch {
      setUserState(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();

    const handleAuthEvent = (e: any) => {
      // Avoid re-dispatch loops
      if (e.detail?.source === "context") return;

      if (e.detail && "user" in e.detail) {
        setUserState(e.detail.user);
        setIsLoading(false);
      } else {
        checkSession();
      }
    };

    window.addEventListener("auth-state-changed", handleAuthEvent);
    return () => window.removeEventListener("auth-state-changed", handleAuthEvent);
  }, [checkSession]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("[AuthContext] Logout failed:", err);
    } finally {
      setUserState(null);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("auth-state-changed", { detail: { user: null } })
        );
      }
    }
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user?.id,
    checkSession,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      checkSession: async () => {},
      setUser: () => {},
      logout: async () => {},
    };
  }
  return context;
}
