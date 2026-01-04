import { useState, useEffect } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { getPhotos } from '../api/homeApi.js';
import { svgPlaceholder } from '../constants/placeholders.js';

export function LazyLoad() {

    const [isLoading, setIsLoading] = useState(false);
    const [allPhotos, setAllPhotos] = useState([]);

    useEffect(() => {
        const fetchAllImages = async () => {
            setIsLoading(true);
            try {
                const data = await getPhotos();
                setAllPhotos(data.results);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllImages();
    }, []);


    return(
        <div className="carousel">
            {allPhotos.map((photo, index) =>(
                <LazyLoadImage 
                    key={photo.id} 
                    src={photo.url800}
                    width={photo.dimension800.width} 
                    height={photo.dimension800.height}
                    alt={photo.title || `Photo ${index}`}
                    threshold = {1}
                    effect='black-and-white'
                    placeholderSrc={svgPlaceholder}
                />
            ))}
        </div>
    );
}