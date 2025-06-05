import Config from "../Config";

export async function fetchProducts() {
  const response = await fetch(Config.BACKEND_URL + "product/all");
  const json = await response.json();
  return json;
}
