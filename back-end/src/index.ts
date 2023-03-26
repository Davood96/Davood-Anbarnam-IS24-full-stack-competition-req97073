import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const port = 3000;

interface ProductDBRecord {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

interface ProductPostDto {
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: string;
}

interface ProductPatchDto {
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  methodology: string;
}

const mockData: ProductDBRecord[] = [
  {
    productId: "VALUE",
    productName: "VALUE",
    productOwnerName: "VALUE",
    Developers: ["NAME_1", "NAME_2", "NAME_3", "NAME_4", "NAME_5"],
    scrumMasterName: "VALUE",
    startDate: "YYYY/MM/DD",
    methodology: "Waterfall",
  },
];

const generateRandomData = (n: number): ProductDBRecord[] => {
  const DEV_NAMES = ["Batman", "Robin", "Nightwing", "Oracle", "Red Hood"];
  const SCRUM_MASTERS = [
    "Superman",
    "Flash",
    "Batman",
    "Cyborg",
    "Wonder Woman",
  ];
  const PRODUCT_NAMES = ["Grapple Hook", "Batwing", "Batmobile", "Batcave"];
  const PRODUCT_OWNERS = ["Batman", "Alfred", "Superman", "Wonder Woman"];
  const METHODOLOGIES = ["Waterfall", "Agile"];

  const dateToStr = (date: Date) =>
    `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    }/${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;

  const result: ProductDBRecord[] = [];

  for (let i = 0; i < n; i += 1) {
    const numDevs = Math.floor(Math.random() * 6);
    const Developers = DEV_NAMES.slice(0, numDevs);
    const scrumMasterName =
      SCRUM_MASTERS[Math.floor(Math.random() * SCRUM_MASTERS.length)];
    const productName = `${
      PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)]
    } - v${i}`;
    const productOwnerName =
      PRODUCT_OWNERS[Math.floor(Math.random() * PRODUCT_OWNERS.length)];
    const methodology =
      METHODOLOGIES[Math.floor(Math.random() * METHODOLOGIES.length)];
    const startDate = dateToStr(
      new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      )
    );

    result.push({
      productId: `${i}`,
      productOwnerName,
      startDate,
      Developers,
      methodology,
      scrumMasterName,
      productName,
    });
  }

  return result;
};

let data: Map<string, ProductDBRecord>;
let numProducts = 0;

app.use(cors());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/products", (req: Request, res: Response) => {
  res.status(200).json({ products: [...data.values()] });
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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}/api`);
  if (!data) {
    data = new Map<string, ProductDBRecord>(
      generateRandomData(40).map((product) => [product.productId, product])
    );
    numProducts = 40;
  }
});
