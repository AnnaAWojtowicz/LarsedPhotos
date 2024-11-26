import React, { useEffect, useState } from 'react';
import "../styles/countryImg.css";
import img5 from "../img/img5.jpg";
import mapImg from "../img/mapImg.png";
import { SymbolButton } from './SymbolButton';
import { getSpecificImgDetails } from '../api/getSpecificImgDetails';


export function CountryImg({ imgId, img, descriptionImg, camera, map, tag }) {

    const [imgDetails, setImgDetails] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showTag, setShowTag] = useState(false);

    useEffect(() => {
        const fetchImgDetails = async () => {
            try {
                const data = await getSpecificImgDetails(imgId);
                setImgDetails(data);
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
        // <>
        //     <div className='row img-section'>
        //         <div className='col-9'>
        //             <img src={img} className="big-photo-country" alt={descriptionImg} />
        //         </div>
        //         <div className='col-3 d-flex flex-column justify-content-center'>
        //             <div className='symbols-country-img-container d-flex flex-column align-items-stretch justify-content-center flex-grow-1'>
        //                 <div className='symbol-details-group'>
        //                     <button onClick={showInNewWindow} className="material-symbols-outlined symbol-country-img">
        //                         new_window
        //                     </button>
        //                 </div>
        //                 <div className='symbol-details-group'>
        //                     <button onClick={() => setShowCamera(!showCamera)} className="material-symbols-outlined symbol-country-img">
        //                         camera
        //                     </button>
        //                     <span className="symbols-img-details-text">{camera}</span>
        //                 </div>

        //                 <div className="d-flex align-items-center symbol-details-group">
        //             <button onClick={() => setShowMap(!showMap)} className="material-symbols-outlined symbol-country-img">
        //                 map
        //             </button>
        //             {showMap && (
        //                 <span className="symbols-img-details">
        //                     <span className="symbols-img-details-text">
        //                         <img src={mapImg || "/path/to/default/mapImg.png"} alt="a map" className="symbols-img-details-map" />
        //                     </span>
        //                     <span className="symbols-img-details-text map-text">{map}</span>
        //                 </span>
        //             )}
        //         </div>

        //                 <div className='symbol-details-group'>
        //                     <button onClick={() => setShowTag(!showTag)} className="material-symbols-outlined symbol-country-img">
        //                         tag
        //                     </button>
        //                     {showTag && (
        //                         <span className="symbols-img-details-text">{tag.join(', ')}</span>
        //                     )}
        //                 </div>
        //                 {imgDetails && (
        //                     <div className="img-details">

        //                         <p>Camera: {imgDetails.camera?.fullName || "Unknown Camera"}</p>
        //                         <p>Lens: {imgDetails.lens?.lensModel || "Unknown Lens"}</p>
        //                         <p>Exposure Time: {imgDetails.exposure?.exposureTime || "Unknown Exposure Time"}</p>
        //                         <p>Aperture: {imgDetails.exposure?.aperture || "Unknown Aperture"}</p>
        //                         <p>ISO: {imgDetails.exposure?.iso || "Unknown ISO"}</p>

        //                     </div>
        //                 )}

        //             </div>
        //             <div className='container-text-country-img'>{descriptionImg}</div>
        //         </div>
        //     </div>

        // </>

        <div className="country-img">
            <div className='row img-section'>
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
                        <div className='symbol-details-group'>
                            <SymbolButton onClick={showInNewWindow} icon="new_window" className="symbol-button" />
                        </div>
                        <div className='symbol-details-group'>
                            <SymbolButton onClick={() => setShowCamera(!showCamera)} icon="camera" className="symbol-button" />
                            {showCamera && (
                                <span className="symbols-img-details-text">{camera}</span>
                            )}
                        </div>
                        <div className="d-flex align-items-center symbol-details-group">
                            <SymbolButton onClick={() => setShowMap(!showMap)} icon="map" className="symbol-button" />
                            {showMap && (
                                <span className="symbols-img-details">
                                    <span className="symbols-img-details-text">
                                        <img src={mapImg || "/path/to/default/mapImg.png"} alt="a map" className="symbols-img-details-map" />
                                    </span>
                                    <span className="symbols-img-details-text map-text">{map}</span>
                                </span>
                            )}
                        </div>
                        <div className='symbol-details-group'>
                            <SymbolButton onClick={() => setShowTag(!showTag)} icon="tag" className="symbol-button" />
                            {showTag && (
                                <span className="symbols-img-details-text">{tag.join(', ')}</span>
                            )}
                        </div>
                    </div>
                    <div className='container-text-country-img'>{descriptionImg}</div>
                </div>
            </div>
            {/* {imgDetails && (
                    <div className="img-details">

                        <p>Camera: {imgDetails.camera?.fullName || "Unknown Camera"}</p>
                        <p>Lens: {imgDetails.lens?.lensModel || "Unknown Lens"}</p>
                        <p>Exposure Time: {imgDetails.exposure?.exposureTime || "Unknown Exposure Time"}</p>
                        <p>Aperture: {imgDetails.exposure?.aperture || "Unknown Aperture"}</p>
                        <p>ISO: {imgDetails.exposure?.iso || "Unknown ISO"}</p>

                    </div>
                )} */}


        </div>


    );
}