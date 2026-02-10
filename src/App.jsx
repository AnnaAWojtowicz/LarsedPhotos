import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './components/Home.jsx'
import SpecificCountryAlbum from './components/SpecificCountryAlbum.jsx'
import { PhotoDetails } from './components/PhotoDetails.jsx'
import { Album } from './components/Album.jsx';

function AppWrapper() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:id" element={<SpecificCountryAlbum key={location.key} />} />
      <Route path="/photo/:photoId" element={<PhotoDetails />} />
      <Route path="/album/:albumId" element={<Album />} />
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
