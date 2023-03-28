export const MAX_DEVS_PER_PRODUCT = 5;
export interface ProductDBRecord {
  productId: string;
  productName: string;
  productOwnerName: string;
  Developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: "Agile" | "Waterfall";
}

/**
 *
 * Generates mock data to be used by endpoints
 *
 */
export const generateRandomData = (n: number): ProductDBRecord[] => {
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
  const METHODOLOGIES: ["Waterfall", "Agile"] = ["Waterfall", "Agile"];

  const dateToStr = (date: Date) =>
    `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    }/${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;

  const result: ProductDBRecord[] = [];

  for (let i = 0; i < n; i += 1) {
    const numDevs = Math.floor(Math.random() * (MAX_DEVS_PER_PRODUCT + 1));
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
