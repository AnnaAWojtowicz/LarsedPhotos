import React from 'react';
import "../styles/country.css";
import img5 from "../img/img5.jpg";
import mapImg from "../img/mapImg.png";
import { Header } from "./Header.jsx";
import { CountryImg } from './CountryImg.jsx';


export function Country(props) {
    return (
        <>
            <div className="container-country">
                <div className='row'>
                    <div className='col-12 d-flex justify-content-end header-country'><Header /></div>
                    <div className='col-12 golden-line'></div>
                    <div className='col-9'>
                        <img src={img5} className="big-photo-country" alt="..." />
                    </div>
                    <div className='col-9'>
                        <div className="name-country" title="Canada">Canada</div>
                        <div className="text-country" description="sth">Canada is a country in the northern part of North America. Its ten provinces and three territories extend from the Atlantic to the Pacific and northward into the Arctic Ocean, covering 9.98 million square kilometres, making it the world's second-largest country by total area. Its southern and western border with the United States, stretching 8,891 kilometres (5,525 mi), is the world's longest bi-national land border. Canada's capital is Ottawa, and its three largest metropolitan areas are Toronto, Montreal, and Vancouver.</div>
                    </div>

                    <div className='col-12 golden-line'></div>
                    <div className='col-12'>
                        <CountryImg
                            camera="Canon EF70-300mm f/4-5.6 IS USM"
                            map="sth sth"
                            mapImg={mapImg}
                            tag={["#Toronto1", "#Toronto2"]}
                            descriptionImg="The picture was taken on a quiet hillside overlooking a sprawling valley, just as the sun began to set." />
                        <CountryImg />
                        <CountryImg />
                        <CountryImg />
                        <CountryImg />
                    </div>
                </div>
            </div>
        </>
    )
}