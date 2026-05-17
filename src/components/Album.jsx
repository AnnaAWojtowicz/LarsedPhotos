import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecificCountryAlbum } from "../api/getSpecificCountryAlbum";
import "../styles/album.css";
import "../styles/lazyload.css";

export function Album() {
    const { albumId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [albumData, setAlbumData] = useState(null);

    useEffect(() => {
        // Fetch album photos here
        const fetchAlbum = async () => {
            try {
                const albumData = await getSpecificCountryAlbum(albumId);
                setAlbumData(albumData);
            } catch (error) {
                console.error("Error fetching album:", error);
            }
        };
        fetchAlbum();
    }, [albumId]);

    return (
        <div className="container route-page">
            <div className="decor-album" />

            <nav className="menu-container-2 album-back">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
                    <span className="menu-header-2">back</span>
                </a>
            </nav>

            {location.state?.title ? (
                <h1 className="album-title">{location.state.title}</h1>
            ) : (
                <h1>Album {albumId}</h1>
            )}

            {albumData && (
                <div className="album-photos">
                    {albumData.results.map((photo) => (
                        <Link key={photo.id} to={`/photo/${photo.id}`} state={{ photo }}>
                            <div className="image-container">
                                <img src={photo.url800} alt={photo.title} />
                                <div className="image-overlay">
                                    <p className="image-title">{photo.title}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
