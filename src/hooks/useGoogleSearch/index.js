import { useState, useEffect } from "react";
import { API_KEY, CONTEXT_KEY } from "../../keys";

const useGoogleSearch = (term, startIndex = 1) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!term) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}&lr=lang_pt&start=${startIndex}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };

    fetchData();
  }, [term, startIndex]);

  return { data, loading, error };
};

export default useGoogleSearch;
