import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductListComponent } from "./components/ProductListComponent";
import { CreateProductComponent } from "./components/CreateProductComponent";
import { EditProductComponent } from "./components/EditProductComponent";

const domNode = document.getElementById("navigation") as HTMLElement;
const root = ReactDOM.createRoot(domNode);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListComponent />} />
        <Route
          path="products/:productId"
          element={
            <>
              <EditProductComponent />
            </>
          }
        />
        <Route
          path="products"
          element={
            <>
              <CreateProductComponent />
            </>
          }
        />
        <Route path="*" element={<h1>404. Page Not Found :(</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
