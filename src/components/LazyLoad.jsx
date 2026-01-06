import { useState, useEffect } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { getPhotos } from '../api/homeApi.js';
import { svgPlaceholder } from '../constants/placeholders.js';
import '../styles/lazyload.css'

export function LazyLoad() {

    const [isLoading, setIsLoading] = useState(false);
    const [allPhotos, setAllPhotos] = useState([]);
    const [rows, setRows] = useState([]);

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

    useEffect(() => {
        if (allPhotos.length === 0) return;

        const targetRowWidth = window.innerWidth * 0.7;
        const baseHeight = 300;
        const gap = 0;

        const calculatedRows = [];
        let currentRow = [];
        let currentRowWidth = 0;

        allPhotos.forEach((photo, index) => {
            const aspectRatio = photo.dimension800.width / photo.dimension800.height;
            const photoWidth = baseHeight * aspectRatio;

            if (currentRowWidth + photoWidth + (currentRow.length * gap) > targetRowWidth && currentRow.length > 0) {
                // Calculate exact height for this row
                const totalAspectRatio = currentRow.reduce((sum, p) => sum + (p.dimension800.width / p.dimension800.height), 0);
                const rowHeight = (targetRowWidth - (currentRow.length - 1) * gap) / totalAspectRatio;
                
                calculatedRows.push({
                    photos: currentRow,
                    height: Math.round(rowHeight)
                });

                currentRow = [photo];
                currentRowWidth = photoWidth;
            } else {
                currentRow.push(photo);
                currentRowWidth += photoWidth;
            }
        });

        // Add remaining photos as last row
        if (currentRow.length > 0) {
            const totalAspectRatio = currentRow.reduce((sum, p) => sum + (p.dimension800.width / p.dimension800.height), 0);
            const rowHeight = (targetRowWidth - (currentRow.length - 1) * gap) / totalAspectRatio;
            
            calculatedRows.push({
                photos: currentRow,
                height: Math.round(rowHeight)
            });
        }

        setRows(calculatedRows);
    }, [allPhotos]);

    return (
        <div className='lazy-column'>
            {rows.map((row, rowIndex) => {
                // Calculate all widths first
                const widths = row.photos.map(photo => 
                    Math.round((row.height / photo.dimension800.height) * photo.dimension800.width)
                );
                
                // Calculate total and adjust last image to fill exactly
                const totalWidth = widths.reduce((sum, w) => sum + w, 0);
                const targetWidth = window.innerWidth * 0.7;
                const difference = targetWidth - totalWidth;
                
                if (widths.length > 0) {
                    widths[widths.length - 1] += difference;
                }

                return (
                    <div key={rowIndex} className='lazy-row'>
                        {row.photos.map((photo, photoIndex) => (
                            <LazyLoadImage
                                key={photo.id}
                                src={photo.url800}
                                width={widths[photoIndex]}
                                height={row.height}
                                alt={photo.title || `Photo ${photoIndex}`}
                                threshold={1}
                                effect='black-and-white'
                                placeholderSrc={svgPlaceholder}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}