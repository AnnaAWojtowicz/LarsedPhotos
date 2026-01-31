import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getPhotos } from '../api/homeApi.js';

const PhotosContext = createContext(null);

export function PhotosProvider({ children }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        if (photos.length > 0) return undefined;

        const loadPhotos = async () => {
            setLoading(true);
            try {
                const data = await getPhotos();
                const results = data?.results ?? data?.photos ?? data ?? [];
                if (isMounted) {
                    setPhotos(results);
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

        loadPhotos();

        return () => {
            isMounted = false;
        };
    }, [photos.length]);

    const value = useMemo(() => ({
        photos,
        loading,
        error,
        setPhotos
    }), [photos, loading, error]);

    return (
        <PhotosContext.Provider value={value}>
            {children}
        </PhotosContext.Provider>
    );
}

PhotosProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function usePhotos() {
    const context = useContext(PhotosContext);
    if (!context) {
        throw new Error('usePhotos must be used within a PhotosProvider');
    }
    return context;
}
