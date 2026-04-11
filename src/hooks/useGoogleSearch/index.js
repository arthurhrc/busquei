import { useState, useEffect } from "react";
import { API_KEY, CONTEXT_KEY } from "../../keys";

const useGoogleSearch = (term, startIndex = 1, searchType = 'web') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!term) return;

        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const typeParam = searchType === 'image' ? '&searchType=image' : '';

            fetch(
                `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${encodeURIComponent(term)}&lr=lang_pt&start=${startIndex}${typeParam}`,
                { signal: controller.signal }
            )
                .then((response) => response.json())
                .then((result) => {
                    if (result.error) {
                        setError(new Error(result.error.message));
                        setData(null);
                    } else {
                        setData(result);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    if (err.name === 'AbortError') return;
                    setError(err);
                    setLoading(false);
                });
        };

        fetchData();

        return () => controller.abort();
    }, [term, startIndex, searchType]);

    return { data, loading, error };
};

export default useGoogleSearch;
