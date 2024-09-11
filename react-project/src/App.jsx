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
      <div>
        <Carousel />
        <Header />
        <div>Lukas Larsed</div>
      </div>
    </>
  )
}

export default App
