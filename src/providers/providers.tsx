"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/providers/ReactQueryProvider";
<<<<<<< HEAD
=======
import { Toaster } from "@/components/ui/toaster";
>>>>>>> 19bc938835e3e74dbbf191d582104b5ae9371a5b

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
<<<<<<< HEAD
      </ThemeProvider>
    </QueryClientProvider>
  );
}
=======
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
>>>>>>> 19bc938835e3e74dbbf191d582104b5ae9371a5b
