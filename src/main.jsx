import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PhotosProvider } from './context/PhotosContext.jsx'
import { CountriesProvider } from './context/CountriesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PhotosProvider>
      <CountriesProvider>
        <App />
      </CountriesProvider>
    </PhotosProvider>
  </StrictMode>,
)
