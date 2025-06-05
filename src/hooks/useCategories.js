import { useState } from "react";
import { fetchCategories } from "../services/fetchCategories";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    setCategories(await fetchCategories());
  };

  return { getCategories, categories, setCategories };
}
