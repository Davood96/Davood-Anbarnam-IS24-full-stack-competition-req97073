import React from "react";
import { Link } from "react-router-dom";
import fetch from "node-fetch";

interface ProductDto {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

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
      <Link to={`/products/${item.productId}`} state={item}>
        <span>&#9998;</span>
      </Link>
    </div>
  );
};

export const App: React.FC<Record<string, never>> = () => {
  console.log("HERE!");
  const [products, setProducts] = React.useState<ProductDto[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = (await (
        await fetch("http://localhost:3000/api/products")
      ).json()) as { products: ProductDto[] };
      return data;
    };
    fetchData()
      .then((data) => {
        setProducts(data.products);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);
  return error ? (
    <>Something went wrong</>
  ) : (
    <>
      <span>Total Products: {products.length}</span>
      <Link to={`/products`}>Add New Product</Link>
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
