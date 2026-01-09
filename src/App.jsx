import React, { Suspense, lazy } from 'react';
import './index.css';


import Header from './components/Header/Header';
import WhatsAppBtn from './components/WhatsAppBtn';

// Lazy Load (Below the fold)
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Pricing = lazy(() => import('./components/Pricing'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Simple loading fallback
const SectionLoader = () => (
  <div className="h-20 w-full flex items-center justify-center text-gray-400">
    Loading section...
  </div>
);

function App() {
  return (
    <div className="font-sans text-gray-800 antialiased relative">

      <Header />

    
      <Suspense fallback={<SectionLoader />}>
        <main>
          <About />
          <Services />
          <Portfolio />
          <Testimonials />
          <Pricing />
          <Contact />
        </main>
        <Footer />
      </Suspense>

      <WhatsAppBtn />
    </div>
  );
}

export default App;