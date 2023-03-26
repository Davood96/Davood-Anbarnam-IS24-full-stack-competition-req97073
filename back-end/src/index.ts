import express, { Express, Request, Response } from "express";
import cors from "cors";
import { generateRandomData, ProductDBRecord } from "./schema/product";
import { ProductPatchDto, ProductPostDto } from "./dto/product";

const app: Express = express();
const PORT = 3000;

let data: Map<string, ProductDBRecord>;
let numProducts = 0;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).send("API Healthy");
});

app.get("/api/products", (_req: Request, res: Response) => {
  res.status(200).json([...data.values()]);
});

app.post("/api/products", (req: Request, res: Response) => {
  const newProduct = req.body as ProductPostDto;

  data.set(`${numProducts}`, { ...newProduct, productId: `${numProducts}` });
  numProducts += 1;

  res.status(201).send();
});

app.patch("/api/products/:productId", (req: Request, res: Response) => {
  const productId = req.params.productId;
  const currentProduct = data.get(productId);
  const patch = req.body as ProductPatchDto;
  if (currentProduct === undefined) {
    res.status(404).send("Product Not Found");
  } else {
    data.set(productId, {
      ...currentProduct,
      ...patch,
    });

    res.status(200).send();
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}/api`);
  if (!data) {
    data = new Map<string, ProductDBRecord>(
      generateRandomData(40).map((product) => [product.productId, product])
    );
    numProducts = 40;
  }
});
