import { useState, useEffect } from "react";
import { getData } from "../services/apiServices";

const useFetchData = (url, isTokenRequired = false) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getData(url, isTokenRequired);
      setItems(data.data || []);
    } catch (err) {
      setError("Failed to load items. Please try again.");
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { items, loading, error, fetchItems: fetchData };
};

export default useFetchData;
