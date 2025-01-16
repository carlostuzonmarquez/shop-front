import { useState } from "react";
import { fetchCategories } from "../services/fetchCategories";


export function useCategories() {
    const [categories, setCategories] = useState([])


    const getCategories = async () => {
        setCategories(await fetchCategories());
    }

    return { getCategories, categories, setCategories }

}