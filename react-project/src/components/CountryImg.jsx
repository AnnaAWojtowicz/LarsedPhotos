import React from 'react';
import "../styles/countryImg.css";
import img5 from "../img/img5.jpg";

export function CountryImg() {
    return (
        <>
            <div className='row img-section'>
                <div className='col-9'>
                    <img src={img5} className="big-photo-country" alt="..." />
                </div>
                <div className='col-3 d-flex flex-column justify-content-center'>
                    <div className='symbols-country-img d-flex flex-column align-items-start justify-content-center flex-grow-1'>
                        <div class="material-symbols-outlined symbol-country-img">
                            camera
                        </div>
                        <div class="material-symbols-outlined symbol-country-img">
                            map
                        </div>
                        <div class="material-symbols-outlined symbol-country-img">
                            tag
                        </div>
                    </div>
                    <div className='container-text-country-img'>The picture was taken on a quiet hillside overlooking a sprawling valley, just as the sun began to set.</div>
                </div>
            </div>
        </>
    );
}