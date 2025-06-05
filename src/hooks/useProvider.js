import axios from "axios";
import { useState } from "react";
import Config from "../Config";

export default function useProvider() {
  const [providers, setProviders] = useState([]);

  const getProvider = () => {
    axios.get(Config.BACKEND_URL + "provider/list").then((res) => {
      setProviders(res.data);
    });
  };
  return { providers, setProviders, getProvider };
}
