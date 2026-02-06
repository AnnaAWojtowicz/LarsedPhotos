import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePhotos } from '../context/PhotosContext.jsx';
import { getSpecificImgDetails } from '../api/getSpecificImgDetails.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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

    // Show drone icon for drone photo instead of camera icon
    const getCamerasymbol = () => {
        return photoExifData.results[0].camera.brand === "DJI" ? "drone_2" : "photo_camera";
    }

    // When the focalLength is not available
    const getAvailableFocalLength = () => {
        const defaultFocalLength = photoExifData.results[0].lens.focalLength;
        const standardFocalLenght = photoExifData.results[0].lens.focalLengthIn35mmFormat;

        return defaultFocalLength ?? standardFocalLenght;
    }

    const position = [51.505, -0.09]

    return (
        <>
            {loading && <p>Loading...</p>}
            <div className='photo-data-display'>
                {myPhoto &&
                    <div className='title-and-photo'>
                        <div className='photo-title'>{myPhoto.title}</div>
                        <img src={myPhoto.url800} alt={myPhoto.title} />
                    </div>
                }
                {photoExifData &&
                    <>
                        <div className='exif'>
                            <div className='exif-symbol-group'>
                                <div className='material-symbols-outlined exif-symbols'>{getCamerasymbol()}</div>
                                <div className='exif-double'>
                                    <div className='exif-data'>{photoExifData.results[0].camera.fullName}</div>
                                    {photoExifData.results[0].camera.brand !== "DJI" && //only show if not a drone shot
                                        <div className='exif-data'>{photoExifData.results[0].lens.lens}</div>
                                    }
                                </div>
                            </div>
                            <div className='exif-symbol-group'>
                                <div className='material-symbols-outlined exif-symbols'>shutter_speed</div>
                                <div className='exif-data'>{photoExifData.results[0].exposure.exposureTime}s</div>
                            </div>
                            <div className='exif-symbol-group'>
                                <div className='material-symbols-outlined exif-symbols'>camera</div>
                                <div className='exif-data'>{photoExifData.results[0].exposure.aperture}s</div>
                            </div>
                            <div className='exif-symbol-group'>
                                <div className='material-symbols-outlined exif-symbols'>straighten</div>
                                <div className='exif-data'>{getAvailableFocalLength()}</div>
                            </div>
                        </div>
                        <div className='photo-map'>
                            <p>Location</p>
                            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </>
                }
                <div className='photo-map'>
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            {!loading && !myPhoto && <p>Photo not found</p>}
        </>
    )
}