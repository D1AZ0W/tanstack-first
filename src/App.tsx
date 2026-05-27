import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.tsx";
import { Home } from "./pages/Home.tsx";
import { FetchOld } from "./pages/FetchOld.tsx";
import { FetchRQ } from "./pages/FetchRQ.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QuickStart } from "./pages/QuickStart.tsx";
import { FetchIndv } from "./components/UI/FetchIndv.tsx";
import { Infinite } from "./pages/Infinite.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "old",
        element: <FetchOld />,
      },
      {
        path: "new",
        element: <FetchRQ />,
      },
      {
        path: "quickstart",
        element: <QuickStart />,
      },
      {
        path: "new/:id",
        element: <FetchIndv />,
      },
      {
        path: "infinite",
        element: <Infinite />,
      },
    ],
  },
]);

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
