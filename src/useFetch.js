import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("./db.json")
      .then((response) => {
        setData(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
        setData("");
      });
  }, []);
  return {
    data,
    isPending,
    error,
  };
};
export default useFetch;
