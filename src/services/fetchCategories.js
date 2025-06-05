import axios from "axios";
import Config from "../Config";

export async function fetchCategories() {
  const response = await axios.get(Config.BACKEND_URL + "category/list");
  //   const json = await response.json();
  //   return json;
  return response.data;
}
