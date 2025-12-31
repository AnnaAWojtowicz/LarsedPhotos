import React, { useEffect, useRef, useState } from 'react';
import '../styles/carousel.css';
import { getPhotos } from '../api/homeApi';

export function Carousel() {
    const [images, setImages] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getPhotos();
                setImages(data.results.map(photo => photo.url800));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);




    return (
        <div className="carousel" ref={carouselRef}>
            {images.map((src, index) => (
                <img key={index} src={src} alt={`image ${index + 1}`} className="carousel-image" />
            ))}
        </div>
    );
}

