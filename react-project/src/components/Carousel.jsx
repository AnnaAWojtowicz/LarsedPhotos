import React, { useEffect, useRef, useState } from 'react';
import '../styles/carousel.css';
import { getPhotos } from '../api/homeApi';

// const images = [
//     '/src/img/img1.jpg',
//     '/src/img/img2.jpg',
//     '/src/img/img3.jpg',
//     '/src/img/img4.jpg',
//     '/src/img/img5.jpg',
// ];

export function Carousel() {
    const [images, setImages] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getPhotos();
                setImages(data.results.map(photo => photo.url640));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);


    useEffect(() => {
        const carousel = carouselRef.current;
        let scrollAmount = 0;

        const scrollStep = () => {
            if (carousel.scrollTop >= carousel.scrollHeight - carousel.clientHeight) {
                carousel.scrollTop = 0;
                scrollAmount = 0;
            } else {
                scrollAmount += 1;
                carousel.scrollTop = scrollAmount;
            }
        };

        const intervalId = setInterval(scrollStep, 20);

        return () => clearInterval(intervalId);
    }, [images]);

    return (
        <div className="carousel" ref={carouselRef}>
            {images.map((src, index) => (
                <img key={index} src={src} alt={`image ${index + 1}`} className="carousel-image" />
            ))}
        </div>
    );
}

