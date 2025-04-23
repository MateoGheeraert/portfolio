"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

export interface ProvidersProps {
  children: React.ReactNode;
}

const theme = createTheme({
  primaryColor: "blue",
  colors: {
    blue: [
      "#e6f7ff",
      "#bae7ff",
      "#91d5ff",
      "#69c0ff",
      "#40a9ff",
      "#1890ff",
      "#096dd9",
      "#0050b3",
      "#003a8c",
      "#002766",
    ],
  },
});

export const Providers = ({ children }: ProvidersProps) => {
  // For hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <MantineProvider theme={theme} classNamesPrefix='mantine'>
      {children}
    </MantineProvider>
  );
};
