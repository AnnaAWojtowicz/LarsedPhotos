import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './components/Home.jsx'
import SpecificCountryAlbum from './components/SpecificCountryAlbum.jsx'
import { LazyLoad } from './components/LazyLoad.jsx';
import { SingleImageView } from './components/SingleImageView.jsx';

function AppWrapper() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:id" element={<SpecificCountryAlbum key={location.key} />} />
      <Route path='/lazy' element={<LazyLoad />} />
      <Route path='/image/:id' element={<SingleImageView />} />
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
