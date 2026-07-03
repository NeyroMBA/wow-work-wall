import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IndexV2 from "./pages/IndexV2.tsx";
import IndexV3Page from "./pages/IndexV3.tsx";
import IndexV4 from "./pages/IndexV4.tsx";
import IndexV5 from "./pages/IndexV5.tsx";
import IndexV6 from "./pages/IndexV6.tsx";
import IndexV7 from "./pages/IndexV7.tsx";
import AcceleratorPage from "./pages/AcceleratorPage.tsx";
import Wall from "./pages/Wall.tsx";
import Pravda from "./pages/Pravda.tsx";
import Security from "./pages/Security.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexV5 />} />
          <Route path="/gallery" element={<IndexV5 />} />
          <Route path="/original" element={<Index />} />
          <Route path="/v2" element={<IndexV2 />} />
          <Route path="/v3" element={<IndexV3Page />} />
          <Route path="/v4" element={<IndexV4 />} />
          <Route path="/v5" element={<IndexV5 />} />
          <Route path="/v6" element={<IndexV6 />} />
          <Route path="/v7" element={<IndexV7 />} />
          <Route path="/accelerator" element={<AcceleratorPage />} />
          <Route path="/wall" element={<Wall />} />
          <Route path="/pravda" element={<Pravda />} />
          <Route path="/security" element={<Security />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
