import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/carousel.css';
import { getPhotos } from '../api/homeApi';

function LazyImage({ photoData }) {
    const [imageSrc, setImageSrc] = useState(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setImageSrc(photoData.url800);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '50px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [photoData.url800]);

    return (
        <img
            ref={imgRef}
            src={imageSrc}
            alt={photoData.title}
            className="carousel-image"
        />
    );
}

LazyImage.propTypes = {
    photoData: PropTypes.shape({
        url800: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export function Carousel() {
    const [allPhotos, setAllPhotos] = useState([]);
    const [displayedPhotos, setDisplayedPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const carouselRef = useRef(null);
    const lastScrollTimeRef = useRef(0);

    const IMAGES_PER_BATCH = 2;
    const SCROLL_THROTTLE_MS = 500;

    // Fetch all images from api
    useEffect(() => {
        const fetchAllImages = async () => {
            setIsLoading(true);
            try {
                const data = await getPhotos();
                console.log(`Fetched total: ${data.results.length} images`);
                setAllPhotos(data.results);
                // Show initial batch
                setDisplayedPhotos(data.results.slice(0, IMAGES_PER_BATCH));
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllImages();
    }, []);

    // Lazy scrolling with throttling
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const handleScroll = () => {
            const now = Date.now();
            
            // Only process scroll if enough time has passed
            if (now - lastScrollTimeRef.current < SCROLL_THROTTLE_MS) {
                return;
            }
            
            if (carousel.scrollTop + carousel.clientHeight >= carousel.scrollHeight - 200) {
                lastScrollTimeRef.current = now;
                
                // Load more images if available
                setDisplayedPhotos(prev => {
                    const nextCount = Math.min(prev.length + IMAGES_PER_BATCH, allPhotos.length);
                    if (nextCount > prev.length) {
                        return allPhotos.slice(0, nextCount);
                    }
                    return prev;
                });
            }
        };

        carousel.addEventListener('scroll', handleScroll);
        return () => carousel.removeEventListener('scroll', handleScroll);
    }, [allPhotos]);

    return (
        <div className="carousel" ref={carouselRef}>
            {displayedPhotos.map((photo) => (
                <LazyImage key={photo.id} photoData={photo} />
            ))}
            {isLoading && <div className="loading">Loading images...</div>}
            {displayedPhotos.length < allPhotos.length && !isLoading && (
                <div className="loading">{allPhotos.length - displayedPhotos.length} more images available</div>
            )}
        </div>
    );
}

