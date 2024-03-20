"use client";

import { ReactNode, createContext, use, useEffect, useState } from "react";
import Router from "next/router";
import { API_URL } from "../../config/urls";
import { useRouter } from "next/navigation";

type signInDto = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (signInDto: signInDto) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthentication(): Promise<void>;
};

type User = {
  name: string;
  email: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuthentication() {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();

        setUser(data);
        setIsAuthenticated(true);
      } else {
        router.push("/login");
      }
    } catch (error) {
      // router.push('/login');
    }
  }

  async function login(signInDto: signInDto) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(signInDto),
      });
      if (response.ok) {
        // const data = await response.json();
        setIsAuthenticated(true);
        router.push("/");
      } else {
        const data = await response.json();
        console.error("Sign-in failed:", data.message);
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  }

  async function logout() {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        //destroy-session
        Router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, checkAuthentication }}
    >
      {children}
    </AuthContext.Provider>
  );
}
