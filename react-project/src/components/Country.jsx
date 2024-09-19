import React from 'react';
import "../styles/country.css";
import img5 from "../img/img5.jpg";
import { Header } from "./Header.jsx";

export function Country() {
    return (
        <>
            <div className="container-country">
                <div className="header-container-country">
                    <Header />
                </div>
                <div className="left-section-country">
                    <img src={img5} className="big-photo-country" alt="..." />
                    <div className="name-country">Canada</div>
                </div>
                <div className="right-section-country">

                </div>
            </div>
        </>
    )
}