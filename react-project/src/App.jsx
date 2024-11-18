import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Carousel } from './components/Carousel.jsx'
import { Header } from './components/Header.jsx'
import { Home } from './components/Home.jsx'
import { Country } from './components/Country.jsx'



function App() {

  return (
    <>
      <Home />
      <Country />
    </>
  );
}

export default App
