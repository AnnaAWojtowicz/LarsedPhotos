import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getSpecificCountryAlbum } from '../api/getSpecificCountryAlbum.js';
import "../styles/country.css";
// import { Header } from "./Header.jsx";
import { CountryImg } from './CountryImg.jsx';
import { getSpecificTag } from '../api/getTags.js';



function SpecificCountryAlbum() {
    const { id } = useParams();
    const location = useLocation();
    const { countryName } = location.state || {};
    const navigate = useNavigate();

    const [allAlbumData, setAllAlbumData] = useState([]);
    const [allTagData, setAllTagData] = useState([]);
    const [displayedPhotos, setDisplayedPhotos] = useState([]);
    const [currentCountryName, setCurrentCountryName] = useState(countryName || id);
    const [chosenTag, setChosenTag] = useState("");
    const [loading, setLoading] = useState(false);
    const lastScrollTimeRef = useRef(0);

    const IMAGES_PER_BATCH = 5;
    const SCROLL_THROTTLE_MS = 500;

    const fetchImages = async (tag) => {
        try {
            setLoading(true);
            let data;
            if (tag) {
                data = await getSpecificTag(tag);
                setAllTagData(data.results);
                setDisplayedPhotos(data.results.slice(0, IMAGES_PER_BATCH));
                setCurrentCountryName(tag);
            } else {
                data = await getSpecificCountryAlbum(id);
                setAllAlbumData(data.results);
                setDisplayedPhotos(data.results.slice(0, IMAGES_PER_BATCH));
                setCurrentCountryName(countryName || id);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(chosenTag);
    }, [id, chosenTag]);

    // Lazy scroll with throttling
    useEffect(() => {
        const handleScroll = () => {
            const now = Date.now();
            
            // Only process scroll if enough time has passed
            if (now - lastScrollTimeRef.current < SCROLL_THROTTLE_MS) {
                return;
            }
            
            // Check if user has scrolled near bottom of page
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
                lastScrollTimeRef.current = now;
                
                const allPhotos = chosenTag ? allTagData : allAlbumData;
                
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [chosenTag, allAlbumData, allTagData]);

    const handleCountrySelect = (countryName) => {
        setChosenTag("");
        setCurrentCountryName(countryName);
        navigate(`/country/${countryName}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const allPhotos = chosenTag ? allTagData : allAlbumData;
    const landscapeName = chosenTag ? `#${chosenTag}` : currentCountryName;

    return (
        <div className="container-country">
            <div className="row">
                <div className="col-12 d-flex justify-content-end header-country">
                        <Header onCountrySelect={handleCountrySelect} />
                    </div>
                    <div className="col-12 golden-line"></div>
                    <div className="col-9">
                        <div className={`name-country ${chosenTag ? 'tag-title' : ''}`} title={landscapeName}>
                            {landscapeName === "Landscapes" ? (
                                <span className="landscape-break">
                                    Land-<span>scapes</span>
                                </span>
                            ) : (
                                landscapeName
                            )}
                        </div>
                    </div>

                    <div className="col-12 golden-line"></div>
                    <div className="col-12 images-container">
                        {displayedPhotos.map((photo) => (
                            <CountryImg
                                key={photo.id}
                                imgId={photo.id}
                                img={photo.url800}
                                descriptionImg={photo.title}
                                camera={photo.camera ? photo.camera.fullName : "Unknown Camera"}
                                tag={photo.tags}
                                onTagClick={setChosenTag}
                            />
                        ))}
                        {displayedPhotos.length < allPhotos.length && !loading && (
                            <div className="loading">{allPhotos.length - displayedPhotos.length} more images available</div>
                        )}
                    </div>
            </div>
        </div>
    );
}

export default SpecificCountryAlbum;