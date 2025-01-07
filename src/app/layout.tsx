"use client";
import { useState } from "react";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation/Navigation";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const inter = Inter({
   variable: "--font-inter",
   subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
   variable: "--font-roboto-mono",
   subsets: ["latin"],
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [queryClient] = useState(() => new QueryClient());

   return (
      <html lang="en">
         <body className={`${inter.variable} ${robotoMono.variable} antialiased p-8`}>
            <Navigation />
            <QueryClientProvider client={queryClient}>
               {children}
            </QueryClientProvider>
         </body>
      </html>
   );
}