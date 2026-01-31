import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCountriesApi } from '../api/getCountriesApi.js';

const CountriesContext = createContext(null);

export function CountriesProvider({ children }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        if (countries.length > 0) return undefined;

        const loadCountries = async () => {
            setLoading(true);
            try {
                const data = await getCountriesApi();
                const results = data?.results ?? data?.countries ?? data ?? [];
                if (isMounted) {
                    setCountries(results);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadCountries();

        return () => {
            isMounted = false;
        };
    }, [countries.length]);

    const value = useMemo(() => ({
        countries,
        loading,
        error,
        setCountries
    }), [countries, loading, error]);

    return (
        <CountriesContext.Provider value={value}>
            {children}
        </CountriesContext.Provider>
    );
}

CountriesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useCountries() {
    const context = useContext(CountriesContext);
    if (!context) {
        throw new Error('useCountries must be used within a CountriesProvider');
    }
    return context;
}
