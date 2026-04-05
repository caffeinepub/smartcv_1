import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserPlan = "free" | "paid" | "premium";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updatePlan: (plan: UserPlan) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  id: "demo-001",
  name: "Alex Johnson",
  email: "alex@example.com",
  plan: "free",
};

function persistUser(u: User | null, setUser: (u: User | null) => void) {
  if (u) {
    localStorage.setItem("smartcv_user", JSON.stringify(u));
  } else {
    localStorage.removeItem("smartcv_user");
  }
  setUser(u);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("smartcv_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("smartcv_user");
      }
    }
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    if (email === "demo@smartcv.app" || email === "alex@example.com") {
      persistUser(DEMO_USER, setUser);
      return { success: true };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0].replace(/[^a-zA-Z]/g, " "),
      email,
      plan: "free",
    };
    persistUser(newUser, setUser);
    return { success: true };
  }, []);

  const signup = useCallback(
    async (name: string, email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 800));
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        plan: "free",
      };
      persistUser(newUser, setUser);
      return { success: true };
    },
    [],
  );

  const loginWithGoogle = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000));
    persistUser(DEMO_USER, setUser);
  }, []);

  const logout = useCallback(() => {
    persistUser(null, setUser);
  }, []);

  const updatePlan = useCallback((plan: UserPlan) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, plan };
      localStorage.setItem("smartcv_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        loginWithGoogle,
        logout,
        updatePlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
