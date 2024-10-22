import { useState, useEffect } from 'react';

export function useFetchData(fetchFunction) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchFunction();
                setData(response);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [fetchFunction]);

    return { data, error };
}
