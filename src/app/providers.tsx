"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  // For hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
};
