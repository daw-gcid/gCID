import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../context/authContext";
import ToastProvider from "../context/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GCID - Conectando quem precisa com quem tem a solução",
  description: "GCID - Conectando quem precisa com quem tem a solução",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <AuthProvider>
      <html lang="pt-br">
        <body className={inter.className}>
          <ToastProvider>
          <NavBar />
            {children }
          </ToastProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
