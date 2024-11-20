import React from "react";
import "../styles/home.css";
import { Carousel } from "./Carousel.jsx";
import { Header } from "./Header.jsx";

export function Home() {
    return (
        <>
            <div className="container">
                <div className="left-section">
                    <div className="decor"></div>
                    <Carousel className="carousel" />
                </div>
                <div className="right-section">
                    <div className="header-container">
                        <Header />
                    </div>
                </div>
            </div>
        </>
    );
}