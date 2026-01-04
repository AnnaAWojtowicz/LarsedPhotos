import { useState, useEffect } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getPhotos } from '../api/homeApi.js';

export function LazyLoad() {

    const [isLoading, setIsLoading] = useState(false);
    const [allPhotos, setAllPhotos] = useState([]);

    const svgPlaceholder = 
        `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
    <rect width="100%" height="100%" fill="#f0f0f0" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ccc">
      Loading...
    </text>
  </svg>
`)}`;



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
                    effect="blur"
                    threshold = {1}
                    placeholderSrc={svgPlaceholder}
                />
            ))}
        </div>
    );
}