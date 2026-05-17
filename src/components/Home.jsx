import "../styles/home.css";
import "../App.css";
import { Menu } from "./Menu.jsx";
import { LazyLoad } from "./LazyLoad.jsx";

export function Home() {
    return (
        <div className="container route-page">
            <div className="decor"></div>
            <LazyLoad />
            <Menu />
        </div>
    );
}