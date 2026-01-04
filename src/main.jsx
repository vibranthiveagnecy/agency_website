import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
)
