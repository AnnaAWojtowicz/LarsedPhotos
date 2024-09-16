import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Carousel } from './components/Carousel.jsx'
import { Header } from './components/Header.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <div className="left-section">
          <div className="decor"></div>
          <Carousel className="carousel" />
        </div>
        <div className="right-section">
          <div className="header-container">
            <Header />
          </div>
        </div>
      </div>
    </>
  );
}

export default App
