"use client";

import {
  ReactNode,
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { API_URL } from "../../config/urls";
import { redirect, useRouter } from "next/navigation";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type signInDto = {
  email: string;
  password: string;
};

type signUpDto = {
  username: string;
  email: string;
  password: string;
  userType: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (signInDto: signInDto) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthentication(): void;
  signUp: (signUpDto: signUpDto) => Promise<void>;
};

export type User = {
  username: string;
  email: string;
  userType: number;
  image: string;
  status: number;
  id: string;
  cliente?: Cliente;
  instituto?: Instituto;
  talento?: Talento;
};

export type Cliente = {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
};

export type Instituto = {
  id: string;
  cnpj: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  descricao: string;
  ranking: number;
};

export type Talento = {
  id: string;
  nome: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  descricao: string;
  ranking: number;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = user !== null;
  const [loading, setloading] = useState(false);
  // const cookies = useCookies();

  useLayoutEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Give a better fail message
  function checkAuthentication() {
    if (user !== null) return;
    setloading(true);

    api
      .get<User>(`${API_URL}/auth/me`)
      .then((response) => {
        setUser(response.data);
        setloading(false);
      })
      .catch((error) => {
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/login"
        ) {
          return;
        }
        setloading(false);
        router.push("/login");
      });
  }

  async function login(signInDto: signInDto) {
    toast.promise(api.post<User>(`${API_URL}/auth/login`, signInDto), {
      pending: "Logging in...",
      success: {
        render({ data: response }) {
          // console.log(response.data);
          setUser(response.data);
          // cookies.set("user", JSON.stringify(response.data), {
          //   // Convert response.data to a string
          //   expires: 2,
          //   sameSite: "None",
          //   secure: true,
          // });
          if (response.data.status === 0) {
            if (response.data.userType === 1) {
              router.push("/signin/cliente");
            } else if (response.data.userType === 2) {
              router.push("/signin/instituto");
            } else if (response.data.userType === 3) {
              router.push("/signin/talento");
            }
          }else {
            if (response.data.userType === 1) {
              router.push("/client/projetos");
            } else if (response.data.userType === 2) {
              router.push("/instituto/projetos");
            } else if (response.data.userType === 3) {
              router.push("/talento");
            }
          }

          return "login realizado com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          if (data.message === "Request failed with status code 401") {
            return "Usuário ou senha inválidos";
          }else if(data.message === "Request failed with status code 400"){
            return "Usuário ou email inválidos";
          }

          console.error("Login failed:", (data as AxiosError).message);
          return (data as AxiosError).message;
        },
      },
    });
  }

  async function logout() {
    toast.promise(api.post(`${API_URL}/auth/logout`), {
      pending: "Logging out...",
      success: {
        render() {
          // setUser(null);
          // cookies.remove("user");
          router.push("/login");
          return "Logout successful";
        },
      },
      error: {
        render({ data }) {
          console.error("Logout failed:", (data as AxiosError).message);
          return (data as AxiosError).message;
        },
      },
    });
  }

  async function signUp(signUpDto: any) {
    toast.promise(api.post<User>(`${API_URL}/user/`, signUpDto), {
      pending: "Signing up...",
      success: {
        render({ data: response }) {
          setUser(response.data);
          // console.log(response.data);
          // cookies.set("user", JSON.stringify(response.data), {
          //   expires: 2,
          //   sameSite: "None",
          //   secure: true,
          // });
          window.location.reload();
          return "Sign up successful";
        },
      },
      error: {
        render({ data }) {
          console.error("Erro no cadastro:", (data as AxiosError).message);
          return (data as AxiosError).message;
        },
      },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        checkAuthentication,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
