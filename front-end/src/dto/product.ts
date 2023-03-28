export const MAX_DEVS_PER_PRODUCT = 5;
export interface ProductDto {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: string[]; // Max 5
  scrumMasterName: string;
  startDate: string;
  methodology: "Agile" | "Waterfall";
}

export interface ProductPostDto {
  productName: string;
  productOwnerName: string;
  Developers: string[]; // Max 5
  scrumMasterName: string;
  startDate: string;
  methodology: "Agile" | "Waterfall";
}

export interface ProductPatchDto {
  productName: string;
  productOwnerName: string;
  Developers: string[]; // Max 5
  scrumMasterName: string;
  methodology: "Agile" | "Waterfall";
}

/**
 *
 * Formats a date object into YYYY/MM/DD
 *
 */
export const dateoToStr = (date: Date) =>
  `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? "0" : ""}${
    date.getMonth() + 1
  }/${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
