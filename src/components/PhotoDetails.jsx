import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePhotos } from '../context/PhotosContext.jsx';

export function PhotoDetails() {
    const { photoId } = useParams();
    const location = useLocation();
    const [myPhoto, setMyPhoto] = useState(null);
    const { photos, loading } = usePhotos();

    useEffect(() => {
        // If photo url passed from state 
        if (location.state?.photo) {
            setMyPhoto(location.state.photo);
            return;
        }

        if (photos.length > 0) {
            const foundPhoto = photos.find(x => x.id === photoId);
            setMyPhoto(foundPhoto ?? null);
        }
    }, [photoId, location.state, photos]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {myPhoto && <><h1>{myPhoto.title}</h1><img src={myPhoto.url800} alt={myPhoto.title} /></>}
            {!loading && !myPhoto && <p>Photo not found</p>}
        </>
    )
}