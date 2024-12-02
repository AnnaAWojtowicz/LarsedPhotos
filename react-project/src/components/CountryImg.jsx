import React, { useEffect, useState, Suspense } from 'react';
import "../styles/countryImg.css";
import { SymbolButton } from './SymbolButton';
import { getSpecificImgDetails } from '../api/getSpecificImgDetails';
import 'leaflet/dist/leaflet.css';
const LazyMapContainer = React.lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
import { TileLayer, Marker } from 'react-leaflet';



export function CountryImg({ imgId, img, descriptionImg }) {
    const [imgDetails, setImgDetails] = useState([]);
    const [showCamera, setShowCamera] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showTag, setShowTag] = useState(false);

    useEffect(() => {
        const fetchImgDetails = async () => {
            try {
                const data = await getSpecificImgDetails(imgId);

                if (data.results && data.results.length > 0) {
                    setImgDetails(data.results);
                } else {
                    console.error('No results found');
                }
            } catch (error) {
                console.error('Error fetching specific image details:', error);
            }
        };

        fetchImgDetails();
    }, [imgId]);


    function showInNewWindow() {
        window.open(img, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className="country-img">
            {imgDetails.length > 0 ? (
                imgDetails.map((imageDetail, index) => {
                    const latitude = imageDetail?.location?.latitude;
                    const longitude = imageDetail?.location?.longitude;
                    const position = latitude && longitude ? [parseFloat(latitude), parseFloat(longitude)] : [0, 0];

                    return (
                        <div key={index} className='row img-section'>
                            <div className='col-9'>
                                <img
                                    src={img}
                                    className="big-photo-country"
                                    alt={descriptionImg}
                                    onClick={showInNewWindow}
                                />
                            </div>
                            <div className='col-3 d-flex flex-column justify-content-center'>
                                <div className='symbols-country-img-container d-flex flex-column align-items-stretch justify-content-center flex-grow-1'>
                                    {/* Symbol Button - Open Image in New Window */}
                                    <div className='symbol-details-group'>
                                        <SymbolButton onClick={showInNewWindow} icon="new_window" className="symbol-button" />
                                    </div>

                                    {/* Symbol Button - Show Camera Details */}
                                    <div className='symbol-details-group'>
                                        <SymbolButton onClick={() => setShowCamera(!showCamera)} icon="camera" />
                                        {showCamera && (
                                            <div className="symbols-img-details-text">
                                                <p>Camera: {imageDetail.camera?.fullName || "Unknown Camera"}</p>
                                                <p>Lens: {imageDetail.lens?.lensModel || "Unknown Lens"}</p>
                                                <p>Exposure Time: {imageDetail.exposure?.exposureTime || "Unknown Exposure Time"}</p>
                                                <p>Aperture: {imageDetail.exposure?.aperture || "Unknown Aperture"}</p>
                                                <p>ISO: {imageDetail.exposure?.iso || "Unknown ISO"}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex align-items-center symbol-details-group">
                                        <SymbolButton onClick={() => setShowMap(!showMap)} icon="map" className="symbol-button" />
                                        {showMap && latitude && longitude && (
                                            <div className="symbols-img-details">
                                                <span className="symbols-img-details-text">
                                                    <Suspense fallback={<div>Loading Map...</div>}>
                                                        <LazyMapContainer center={position} zoom={10} style={{ width: '10rem', height: '10rem' }}
                                                            zoomControl={false}
                                                            attributionControl={false}>
                                                            <TileLayer
                                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                            />
                                                            <Marker position={position}>
                                                            </Marker>
                                                        </LazyMapContainer>
                                                    </Suspense>
                                                </span>
                                                <div className="symbols-img-details-text map-text">{imageDetail.location?.country}, {imageDetail.location?.region}</div>
                                                <div className="symbols-img-details-text map-text">{latitude}, {longitude}</div>
                                            </div>
                                        )}
                                    </div>


                                    {/* Symbol Button - Show Tags */}
                                    <div className='symbol-details-group'>
                                        <SymbolButton onClick={() => setShowTag(!showTag)} icon="tag" className="symbol-button" />
                                        {showTag && imageDetail?.tags?.length > 0 && (
                                            <div className="symbols-img-details-text">
                                                {imageDetail.tags.map((tag, tagIndex) => (
                                                    <span key={tagIndex} className="tag-item">#{tag} </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Image Description */}
                                <div className='container-text-country-img'>{descriptionImg}</div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>Loading image details...</p>
            )}
        </div>
    );
}
