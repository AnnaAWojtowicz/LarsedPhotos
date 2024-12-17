
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './components/Home.jsx'
import SpecificCountryAlbum from './components/SpecificCountryAlbum.jsx'



function AppWrapper() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:id" element={<SpecificCountryAlbum key={location.key} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
