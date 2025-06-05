import axios from "axios";
import Config from "../Config";

export async function listUser() {
  const res = await axios.get(Config.BACKEND_URL + "user/list");
  return res.data;
}
