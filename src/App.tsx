import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.tsx";
import { Home } from "./pages/Home.tsx";
import { FetchOld } from "./pages/FetchOld.tsx";
import { FetchRQ } from "./pages/FetchRQ.tsx";
import { Trial } from "./pages/Trial.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
        path: "trial",
        element: <Trial />,
      },
    ],
  },
]);

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
