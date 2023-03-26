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
