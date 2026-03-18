import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecificCountryAlbum } from "../api/getSpecificCountryAlbum";
import "../styles/album.css";

export function Album() {
  const { albumId } = useParams();
  const location = useLocation();
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
    <div className="container">
      <div className="decor-album" />

      {location.state?.title ? (
        <h1 className="album-title">{location.state.title}</h1>
      ) : (
        <h1>Album {albumId}</h1>
      )}

      {albumData && (
        <div className="album-photos">
          {albumData.results.map((photo) => (
            <Link key={photo.id} to={`/photo/${photo.id}`} state={{ photo }}>
              <img src={photo.url800} alt={photo.title} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
