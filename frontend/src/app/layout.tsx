import "./globals.css";
import { cn } from "@/lib/utils";
import { inter } from "@/src/app/fonts";
import { AuthProvider } from "../context/authContext";
import type { Metadata } from "next";
import { QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "../context/ToastContext";
import { queryClient } from "../lib/react-query";

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
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
