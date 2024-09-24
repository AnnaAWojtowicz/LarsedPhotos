import React from 'react';
import "../styles/countryImg.css";
import img5 from "../img/img5.jpg";
import mapImg from "../img/mapImg.png";
import { SymbolButton } from './SymbolButton';


export function CountryImg(props) {
    return (
        <>
            <div className='row img-section'>
                <div className='col-9'>
                    <img src={img5} className="big-photo-country" alt="..." />
                </div>
                <div className='col-3 d-flex flex-column justify-content-center'>
                    <div className='symbols-country-img-container d-flex flex-column align-items-stretch justify-content-center flex-grow-1'>
                        <div className='symbol-details-group'>
                            <button className="material-symbols-outlined symbol-country-img">
                                camera
                            </button>
                            <span className="symbols-img-details-text">{props.camera}</span>
                        </div>
                        <div className="d-flex align-items-center symbol-details-group">
                            <button className="material-symbols-outlined symbol-country-img">
                                map
                            </button>
                            <span className="symbols-img-details">
                                <span className="symbols-img-details-text"><img src={mapImg} alt="a map" className="symbols-img-details-map" /></span>
                                <span className="symbols-img-details-text map-text">{props.map}</span>
                            </span>
                        </div>
                        <div className='symbol-details-group'>
                            <button className="material-symbols-outlined symbol-country-img">
                                tag
                            </button>
                            <span className="symbols-img-details-text">{props.tag}</span>
                        </div>
                        {/* <SymbolButton symbol="camera" camera={props.camera} />
                        <SymbolButton symbol="map" map={props.map} mapImg={props.mapImg} />
                        <SymbolButton symbol="tag" tags={props.tag} /> */}


                    </div>
                    <div className='container-text-country-img'>{props.descriptionImg}</div>
                </div>
            </div>

        </>
    );
}