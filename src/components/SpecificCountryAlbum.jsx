import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getSpecificCountryAlbum } from '../api/getSpecificCountryAlbum.jsx';
import "../styles/country.css";
import { Header } from "./Header.jsx";
import { CountryImg } from './CountryImg.jsx';
import { getSpecificTag } from '../api/getTags.jsx';



function SpecificCountryAlbum() {
    const { id } = useParams();
    const location = useLocation();
    const { album, countryName } = location.state || {};
    const navigate = useNavigate();

    const [albumData, setAlbumData] = useState(album);
    const [currentCountryName, setCurrentCountryName] = useState(countryName || id);
    const [tagData, setTagData] = useState({ results: [] });
    const [chosenTag, setChosenTag] = useState("");
    const [loading, setLoading] = useState(false);


    const fetchImages = async (tag) => {
        try {
            setLoading(true);
            let data;
            if (tag) {
                data = await getSpecificTag(tag);
                setTagData(data);
                setCurrentCountryName(tag);
            } else {
                data = await getSpecificCountryAlbum(id);
                setAlbumData(data);
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


    const handleCountrySelect = (countryName) => {
        setChosenTag("");
        setCurrentCountryName(countryName);
        navigate(`/country/${countryName}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    const imagesToShow = chosenTag ? tagData.results : albumData.results;
    const landscapeName = chosenTag ? `#${chosenTag}` : currentCountryName;

    return (
        <>
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
                    <div className="col-12">
                        {(chosenTag ? tagData.results : albumData.results).map((photo) => (
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpecificCountryAlbum;