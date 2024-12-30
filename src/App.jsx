import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cart, Error, Favorites, HomeLayout, Landing, Products } from "./pages";

import { ErrorElement } from "./components";

// actions
import ProductDetails from "./pages/ProductDetails";
import "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
        errorElement: <ErrorElement />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "Favorites",
        element: <Favorites />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
