import "../styles/home.css";
import "../App.css";
import { Carousel } from "./Carousel.jsx";
// import { Header } from "./Header.jsx";

export function Home() {
    return (
        <div className="container">
            <div className="decor"></div>
            <Carousel className="carousel" />
        </div>
    );
}