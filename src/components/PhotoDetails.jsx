import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPhotos } from '../api/homeApi.js';

export function PhotoDetails() {
    const { photoId } = useParams();
    const location = useLocation();
    const [myPhoto, setMyPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If photo url passed from state 
        if (location.state?.photo) {
            setMyPhoto(location.state.photo);
            setLoading(false);
            return;
        }

        // Fetch data again if location state is missing.
        // Use id from url params as request parameter
        const loadAllPhotos = async () => {
            try {
                const photos = await getPhotos();
                const foundPhoto = photos.results.find(x => x.id === photoId);
                setMyPhoto(foundPhoto);
            } catch (error) {
                console.error('Error loading photos:', error);
            } finally {
                setLoading(false);
            }
        }

        loadAllPhotos();
    }, [photoId, location.state]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {myPhoto && <><h1>{myPhoto.title}</h1><img src={myPhoto.url800} alt={myPhoto.title} /></>}
            {!loading && !myPhoto && <p>Photo not found</p>}
        </>
    )
}