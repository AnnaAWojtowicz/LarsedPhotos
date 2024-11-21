
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home.jsx'
import SpecificCountryAlbum from './components/SpecificCountryAlbum.jsx'



function App() {

  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<SpecificCountryAlbum />} />
      </Routes>
    </Router>
  );
}

export default App
