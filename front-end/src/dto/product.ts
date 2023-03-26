export interface ProductDto {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: "Agile" | "Waterfall";
}

export interface ProductPostDto {
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: "Agile" | "Waterfall";
}

export interface ProductPatchDto {
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  methodology: "Agile" | "Waterfall";
}

export const dateoToStr = (date: Date) =>
  `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? "0" : ""}${
    date.getMonth() + 1
  }/${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
