// "use client";

// import { ThemeProvider } from "@/providers/ThemeProvider";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "@/providers/ReactQueryProvider";
// import { Toaster } from "@/components/ui/toaster";

// export default function ClientProviders({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider
//         attribute="class"
//         defaultTheme="system"
//         enableSystem
//         disableTransitionOnChange
//       >
//         {children}
//         <Toaster />
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// }

"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext"; // Importa tu UserProvider

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
        {/* Agrega el UserProvider para que el estado del usuario esté disponible en toda la app */}
        <UserProvider>
          {children}
        </UserProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
