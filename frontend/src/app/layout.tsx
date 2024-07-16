import type { Metadata } from "next";
import { inter } from "@/src/app/fonts";
import "./globals.css";
import { AuthProvider } from "../context/authContext";
import ToastProvider from "../context/ToastContext";

// const inter = Inter({ subsets: ["latin"] });

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
          {/* <NavBar /> */}
            {children }
          </ToastProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
