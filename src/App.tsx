import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.tsx";
import { Home } from "./pages/Home.tsx";
import { FetchOld } from "./pages/FetchOld.tsx";
import { FetchRQ } from "./pages/FetchRQ.tsx";
import { Trial } from "./pages/Trial.tsx";

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
  return <RouterProvider router={router} />;
};

export default App;
