import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { CreateProductComponent } from "./CreateProductComponent";
import { EditProductComponent } from "./EditProductComponent";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <h1>404. Page Not Found :(</h1>,
//     children: [
//       {
//         path: "products/:productId",
//         element: <h1>Edit a Product</h1>,
//       },
//       {
//         path: "products",
//         element: <h1>Add a Product</h1>,
//       },
//     ],
//   },
// ]);

const domNode = document.getElementById("navigation") as HTMLElement;
const root = ReactDOM.createRoot(domNode);

{
  /* <RouterProvider router={router} /> */
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="products/:productId"
          element={
            <>
              <h1>Edit a Product</h1>
              <EditProductComponent />
            </>
          }
        />
        <Route
          path="products"
          element={
            <>
              <h1>Add a Product</h1>
              <CreateProductComponent />
            </>
          }
        />
        <Route path="*" element={<h1>404. Page Not Found :(</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
