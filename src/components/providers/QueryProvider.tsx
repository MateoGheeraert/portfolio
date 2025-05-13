"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0, // Consider data stale immediately
            refetchOnWindowFocus: true, // Refetch when window gets focus
            refetchOnMount: true, // Always refetch on component mount
            retry: 1, // Retry failed requests once
            gcTime: 5 * 60 * 1000, // Cache for 5 minutes (but data will still be considered stale)
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
