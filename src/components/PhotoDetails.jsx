import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePhotos } from '../context/PhotosContext.jsx';
import { getSpecificImgDetails } from '../api/getSpecificImgDetails.js';
import "../styles/photoDetails.css";

export function PhotoDetails() {
    const { photoId } = useParams();
    const location = useLocation();
    const [myPhoto, setMyPhoto] = useState(null);
    const { photos, loading } = usePhotos();
    const [photoExifData, setPhotoExifData] = useState(null);

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

        console.log("myphoto", myPhoto);

    }, [photoId, location.state, photos]);

    useEffect(() => {
        if (myPhoto) {
            const getExifData = async () => {
                const photoExif = await getSpecificImgDetails(myPhoto.id);
                setPhotoExifData(photoExif);
            };
            getExifData();
        }
    }, [myPhoto]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {myPhoto && <><h1>{myPhoto.title}</h1><img src={myPhoto.url800} alt={myPhoto.title} /></>}
            {photoExifData &&
                <>
                    <div className='exif-symbol-group'>
                        <div className='material-symbols-outlined exif-symbols'>photo_camera</div>
                        <div className='exif-double'>
                            <div className='exif-data'>{photoExifData.results[0].camera.fullName}</div>
                            <div className='exif-data'>{photoExifData.results[0].lens.lens}</div>
                        </div>
                    </div>
                    {/* <span>Exposure time: {photoExifData.results[0].exposure.exposureTime} s</span>
                    <span>Aperture: {photoExifData.results[0].exposure.aperture}</span>
                    <span>ISO: {photoExifData.results[0].exposure.iso}</span> */}
                </>
            }
            {!loading && !myPhoto && <p>Photo not found</p>}
        </>
    )
}