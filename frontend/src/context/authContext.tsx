"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { API_URL } from "../../config/urls";
import { useRouter } from "next/navigation";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
  const isAuthenticated = user !== null;

  useEffect(() => {
    checkAuthentication();
  }, []);

  // TODO: Give a better fail message
  async function checkAuthentication() {
    if (user !== null) return;

    toast.promise(api.get<User>(`${API_URL}/auth/me`)
      .then((response) => {
        setUser(response.data);
      })
      , {
        pending: 'Checking authentication...',
        error: {
          render({ data }) {
            console.error('Authentication failed:', (data as AxiosError).message);
            router.push('/login');
            return (data as AxiosError).message;
          }
        },
      });
  }

  async function login(signInDto: signInDto) {
    toast.promise(api.post<User>(`${API_URL}/auth/login`, signInDto), {
      pending: 'Logging in...',
      success: {
        render({ data: response }) {
          setUser(response.data);
          router.push('/');
          return 'Login successful';
        }
      },
      error: {
        render({ data }) {
          console.error('Login failed:', (data as AxiosError).message);
          return (data as AxiosError).message;
        }
      }
    });
  }

  async function logout() {
    toast.promise(api.post(`${API_URL}/auth/logout`), {
      pending: 'Logging out...',
      success: {
        render() {
          setUser(null);
          router.push('/login');
          return 'Logout successful';
        }
      },
      error: {
        render({ data }) {
          console.error('Logout failed:', (data as AxiosError).message);
          return (data as AxiosError).message;
        }
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, checkAuthentication }}
    >
      {children}
    </AuthContext.Provider>
  );
}
