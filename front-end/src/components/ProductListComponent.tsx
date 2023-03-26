import React from "react";
import { Link } from "react-router-dom";
import fetch from "node-fetch";
import { ProductDto } from "../dto/product";

const Cell: React.FC<{ data: string; style?: React.CSSProperties }> = (
  props
) => {
  return (
    <div
      style={{
        ...props.style,
        padding: "4px",
        textAlign: "center",
        textOverflow: "ellipsis",
        overflowX: "hidden",
        width: "150px",
      }}
    >
      {props.data}
    </div>
  );
};

const Row: React.FC<{ dto: ProductDto; rowNum: number }> = (props) => {
  const item = props.dto;
  return (
    <div
      style={{
        width: "max-content",
        display: "flex",
        alignItems: "center",
        backgroundColor: props.rowNum % 2 === 0 ? "#5a55552e" : undefined,
      }}
    >
      <Cell data={item.productId} />
      <Cell data={item.productName} />
      <Cell data={item.productOwnerName} />
      <div>
        {item.Developers.length > 0 ? (
          item.Developers.map((dev) => <Cell data={dev} />)
        ) : (
          <Cell data={""} />
        )}
      </div>
      <Cell data={item.scrumMasterName} />
      <Cell data={item.startDate} />
      <Cell data={item.methodology} />
      <Link
        to={`/products/${item.productId}`}
        state={item}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <button style={{ cursor: "pointer" }}>Edit</button>
      </Link>
    </div>
  );
};

export const ProductListComponent: React.FC<Record<string, never>> = () => {
  const [products, setProducts] = React.useState<ProductDto[]>([]);
  const [error, setError] = React.useState<boolean>(false);

  const fetchData = async (): Promise<ProductDto[]> => {
    const res = await fetch("http://localhost:3000/api/products");
    if (res.ok) {
      return res.json() as Promise<ProductDto[]>;
    }
    return Promise.reject("GET failed");
  };

  React.useEffect(() => {
    fetchData()
      .then((data) => {
        setProducts(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);
  return error ? (
    <h1>Something went wrong</h1>
  ) : (
    <>
      <div>Total Products: {products.length}</div>
      <Link
        to={`/products`}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <button style={{ cursor: "pointer" }}>Add New Product</button>
      </Link>
      <div style={{ display: "flex", width: "100%" }}>
        {[
          "Product Number",
          "Product Name",
          "Product Owner",
          "Developers",
          "Scrum Master",
          "Start Date",
          "Methodology",
        ].map((val) => (
          <Cell data={val} style={{ fontWeight: "bold" }} />
        ))}
      </div>

      {products.map((item, index) => (
        <Row dto={item} rowNum={index} />
      ))}
    </>
  );
};
