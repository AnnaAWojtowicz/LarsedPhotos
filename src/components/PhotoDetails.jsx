import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePhotos } from '../context/PhotosContext.jsx';
import { getSpecificImgDetails } from '../api/getSpecificImgDetails.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../styles/photoDetails.css";

export function PhotoDetails() {
    const { photoId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [myPhoto, setMyPhoto] = useState(null);
    const { photos, loading } = usePhotos();
    const [photoExifData, setPhotoExifData] = useState(null);
    const [exifError, setExifError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


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

                const allValuesNull = (val) => {
                    if (val === null) return true;
                    if (typeof val !== 'object') return false;
                    if (Array.isArray(val)) return val.length === 0 || val.every(allValuesNull);
                    for (const k in val) {
                        if (Object.prototype.hasOwnProperty.call(val, k)) {
                            if (!allValuesNull(val[k])) return false;
                        }
                    }
                    return true;
                };

                const first = photoExif?.results?.[0];
                if (!first || allValuesNull(first)) {
                    setExifError(true);
                } else {
                    setExifError(false);
                }
            };
            getExifData();
        }
    }, [myPhoto]);

    // Show drone icon for drone photo instead of camera icon
    const getCamerasymbol = () => {
        const brand = photoExifData?.results?.[0]?.camera?.brand;
        return brand === "DJI" ? "drone_2" : "photo_camera";
    }

    // When the focalLength is not available
    const getAvailableFocalLength = () => {
        const lens = photoExifData?.results?.[0]?.lens;
        if (!lens) return "";
        return lens.focalLength ?? lens.focalLengthIn35mmFormat ?? "";
    }

    const position = photoExifData?.results?.[0]?.location
        ? [photoExifData.results[0].location.latitude, photoExifData.results[0].location.longitude]
        : [0, 0];

    const zoomLevel = photoExifData?.results?.[0]?.location
        ? photoExifData.results[0].location.accuracy
        : 16;

    const getLocationText = () => {
        const location = photoExifData?.results?.[0]?.location;
        if (!location) return "";
        const { neighbourhood, locality, county, region } = location;
        return [neighbourhood, locality, county, region].filter(Boolean).join(", ");
    }

    const tags = photoExifData?.results?.[0]?.tags ?
        photoExifData.results[0].tags.map((e, i) => (
            <div className='tag' key={i}>{e}</div>
        )) : null;

    const formatDate = iso => {
        if (!iso) return "";
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
        // for full month name use: month: "long"
    };


    return (
        <>
            <nav className="menu-container-2">
                <a href="#" onClick={() => { navigate(-1); setIsOpen(!isOpen); }}>
                    <span className={`menu-header-2 ${isOpen ? 'toggle' : ''}`}>back</span>
                </a>
            </nav >

            {loading && <p>Loading...</p>}
            <div className='photo-data-display'>
                {myPhoto &&
                    <div className='title-and-photo'>
                        <div className='decor' />
                        <div className='photo-title'>{myPhoto.title}</div>
                        <img src={myPhoto.url800} alt={myPhoto.title} />
                    </div>
                }
                {photoExifData && !exifError &&
                    <div className='exif'>
                        <div className='exif-header-group'>
                            <div className='exif-header-text'>exif</div>
                            <div className='exif-header-decor' />
                        </div>
                        <div className='camera-settings-map'>
                            <div className='exif-details'>
                                <div className='place-date margin-bottom'>
                                    <div className='exif-symbol-group'>
                                        <div className='material-symbols-outlined exif-symbols'>pin_drop</div>
                                        <div className='exif-data exif-location'>{getLocationText()}</div>
                                    </div>
                                    <div className='exif-symbol-group'>
                                        <div className='material-symbols-outlined exif-symbols'>event</div>
                                        <div className='exif-data'>{formatDate(photoExifData.results[0].createDate)}</div>
                                    </div>
                                </div>
                                <div className='exif-symbol-group margin-bottom'>
                                    <div className='material-symbols-outlined exif-symbols'>{getCamerasymbol()}</div>
                                    <div className='exif-double'>
                                        <div className='exif-data'>{photoExifData.results[0].camera.fullName}</div>
                                        {photoExifData.results[0].camera.brand !== "DJI" && //only show if not a drone shot
                                            <div className='exif-data'>{photoExifData.results[0].lens.lens}</div>
                                        }
                                    </div>
                                </div>
                                <div className='camere-settings'>
                                    <div className='exif-symbol-group'>
                                        <div className='material-symbols-outlined exif-symbols exif-symbols-larger'>shutter_speed</div>
                                        <div className='exif-data'>{photoExifData.results[0].exposure.exposureTime}s</div>
                                    </div>
                                    <div className='exif-symbol-group'>
                                        <div className='material-symbols-outlined exif-symbols'>camera</div>
                                        <div className='exif-data'>{photoExifData.results[0].exposure.aperture}s</div>
                                    </div>
                                    <div className='exif-symbol-group'>
                                        <div className='material-symbols-outlined exif-symbols'>farsight_digital</div>
                                        <div className='exif-data'>{getAvailableFocalLength()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='photo-map'>
                                <MapContainer
                                    center={position}
                                    zoom={zoomLevel}
                                    scrollWheelZoom={true}
                                    zoomControl={false}
                                    attributionControl={false}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={position}>
                                        <Popup>
                                            {position.join(", ")}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                        <div className='tags-collection'>
                            {tags}
                        </div>
                    </div>
                }

                {photoExifData && exifError &&
                    <div className='exif'>
                        <div className='exif-header-group'>
                            <div className='exif-header-text'>exif</div>
                            <div className='exif-header-decor' />
                        </div>
                        <div style={{ padding: '12px' }}>
                            <p>Error occured while fetching EXIF data for this photo.</p>
                        </div>
                    </div>
                }
            </div>
            {!loading && !myPhoto && <p>Photo not found</p>}
        </>
    )
}