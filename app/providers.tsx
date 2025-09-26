"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "@/components/ui/sonner";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NextUIProvider>
        {children}
        <Toaster richColors position="top-center" />
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default AppProviders;


