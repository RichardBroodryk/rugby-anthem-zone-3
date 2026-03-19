export type Region = {
  code: string;
  name: string;
};

export function detectRegion(): Region {
  const locale = navigator.language || "en";

  if (locale.includes("za")) {
    return { code: "ZA", name: "South Africa" };
  }

  if (locale.includes("nz")) {
    return { code: "NZ", name: "New Zealand" };
  }

  if (locale.includes("au")) {
    return { code: "AU", name: "Australia" };
  }

  if (locale.includes("gb") || locale.includes("uk")) {
    return { code: "UK", name: "United Kingdom" };
  }

  if (locale.includes("fr")) {
    return { code: "FR", name: "France" };
  }

  if (locale.includes("ie")) {
    return { code: "IE", name: "Ireland" };
  }

  if (locale.includes("it")) {
    return { code: "IT", name: "Italy" };
  }

  if (locale.includes("jp")) {
    return { code: "JP", name: "Japan" };
  }

  if (locale.includes("ar")) {
    return { code: "AR", name: "Argentina" };
  }

  return { code: "GLOBAL", name: "Global" };
}