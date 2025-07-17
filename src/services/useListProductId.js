import axios from "axios";
import { useEffect, useState } from "react";
import Config from "../Config";
import { useParams } from "react-router-dom";

export default function useListProductId() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  const loadDetails = () => {
    if (!id) return;
    axios.get(`${Config.BACKEND_URL}product/${id}`).then((res) => {
      setDetails(res.data);
    });
  };

  useEffect(() => {
    loadDetails(); // 🔁 Se llama cuando cambia el id
  }, [id]);

  return { details, setDetails };
}
