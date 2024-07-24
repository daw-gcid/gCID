import "./globals.css";
import { cn } from "@/lib/utils";
import { inter } from "@/src/app/fonts";
import { AuthProvider } from "../context/authContext";
import type { Metadata } from "next";
import ToastProvider from "../context/ToastContext";

export const metadata: Metadata = {
  title: "GCID",
  description: "GCID - Conectando quem precisa com quem tem a solução",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="pt-br" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable
          )}
        >
          <ToastProvider>{children}</ToastProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
