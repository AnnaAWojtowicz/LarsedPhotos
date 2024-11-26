import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getSpecificCountryAlbum } from '../api/getSpecificCountryAlbum.jsx';
import "../styles/country.css";
import img5 from "../img/img5.jpg";
import mapImg from "../img/mapImg.png";
import { Header } from "./Header.jsx";
import { CountryImg } from './CountryImg.jsx';



function SpecificCountryAlbum() {
    const { id } = useParams();
    const location = useLocation();
    const { album, countryName } = location.state || {};

    const [albumData, setAlbumData] = useState(album);

    useEffect(() => {
        if (!albumData) {
            const fetchAlbum = async () => {
                try {
                    const data = await getSpecificCountryAlbum(id);
                    setAlbumData(data);
                } catch (error) {
                    console.error('Error fetching specific country album:', error);
                }
            };
            fetchAlbum();
        }
    }, [id, albumData]);

    if (!albumData) {
        return <div>Loading...</div>;
    }

    // specific image to present the country

    const specificImage = albumData.results[0];
    const landscapeName = countryName === "Landscapes" ? "Land-<br />scapes" : countryName;

    return (
        <>
            <div className="container-country">
                <div className='row'>
                    <div className='col-12 d-flex justify-content-end header-country'><Header /></div>
                    <div className='col-12 golden-line'></div>
                    <div className='col-9'>
                        <img src={specificImage.url2048} className="big-photo-country" alt={specificImage.title} />
                    </div>
                    <div className='col-9'>
                        <div className="name-country" title={countryName}>
                            {landscapeName === "Land-<br />scapes" ? (
                                <>
                                    Land-<br />scapes
                                </>
                            ) : (
                                countryName
                            )}
                        </div>
                        {/* <div className="text-country" description="sth">Canada is a country in the northern part of North America. Its ten provinces and three territories extend from the Atlantic to the Pacific and northward into the Arctic Ocean, covering 9.98 million square kilometres, making it the world's second-largest country by total area. Its southern and western border with the United States, stretching 8,891 kilometres (5,525 mi), is the world's longest bi-national land border. Canada's capital is Ottawa, and its three largest metropolitan areas are Toronto, Montreal, and Vancouver.</div> */}
                    </div>

                    <div className='col-12 golden-line'></div>
                    <div className='col-12'>
                        {albumData.results.map((photo) => (
                            <CountryImg
                                key={photo.id}
                                imgId={photo.id}
                                img={photo.url2048}
                                descriptionImg={photo.title}
                                camera={photo.camera ? photo.camera.fullName : "Unknown Camera"}
                                tag={photo.tags}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpecificCountryAlbum;