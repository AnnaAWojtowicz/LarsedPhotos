import React from 'react';
import "../styles/country.css";
import img5 from "../img/img5.jpg";
import { Header } from "./Header.jsx";

export function Country() {
    return (
        <>
            <div className="container-country">
                <div className='row'>
                    <div className='col-12 d-flex justify-content-end header-country'><Header /></div>
                    <div className='col-12 golden-line'></div>
                    <div className='col-9'>
                        <img src={img5} className="big-photo-country" alt="..." />
                    </div>
                    <div className='col-9'>
                        <div className="name-country">Canada</div>
                    </div>

                    <div className='col-12 golden-line'></div>
                </div>



            </div>
        </>
    )
}