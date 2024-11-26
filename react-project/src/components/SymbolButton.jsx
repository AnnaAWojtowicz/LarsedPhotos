import React from "react";
import "../styles/countryImg.css";



export function SymbolButton({ onClick, icon, children }) {
    return (
        // <div className="symbol-details-group">
        //     <button className="material-symbols-outlined symbol-country-img">{symbol}</button>
        //     {symbol === "new_window"(
        //         <span key={index} className="symbols-img-details-text">
        //             {tag}
        //         </span>
        //     )}
        //     {symbol === "camera" && (
        //         <span className="symbols-img-details-text">{camera}</span>
        //     )}
        //     {symbol === "map" && (
        //         <span className="symbols-img-details">
        //             <span className="symbols-img-details-text">
        //                 <img src="" alt="a map" className="symbols-img-details-map" />
        //             </span>
        //             <span className="symbols-img-details-text map-text">{map}</span>
        //         </span>
        //     )}
        //     {symbol === "tag" && tags && tags.map((tag, index) => (
        //         <span key={index} className="symbols-img-details-text">
        //             {tag}
        //         </span>
        //     ))}

        // </div>

        <button onClick={onClick} className="material-symbols-outlined symbol-country-img symbol-button">
            {icon}
            {children}
        </button>


    );
}

