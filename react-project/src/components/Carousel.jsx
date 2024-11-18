import React, { useEffect, useRef } from 'react';
import '../styles/carousel.css';
import { homeApi } from '../api/homeApi';

const images = [
    '/src/img/img1.jpg',
    '/src/img/img2.jpg',
    '/src/img/img3.jpg',
    '/src/img/img4.jpg',
    '/src/img/img5.jpg',
];

export function Carousel() {
    const [images, setImages] = useState([]);
    const carouselRef = useRef(null);

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
    }, []);

    return (
        <div className="carousel" ref={carouselRef}>
            {images.map((src, index) => (
                <img key={index} src={src} alt={`Carousel ${index}`} className="carousel-image" />
            ))}
        </div>
    );
}

