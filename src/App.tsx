import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/layout/SmoothScroll';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomeHero from './components/home/Hero';
import About from './components/home/About';
import Leadership from './components/home/Leadership';
import Showcase from './components/home/Showcase';
// import Sponsors from './components/home/Sponsors';
import EventsLink from './components/home/EventsLink';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Loader from './components/common/Loader';

function Home() {
  return (
    <>
      <HomeHero />
      <About />
      <Leadership />
      <Showcase />
      {/* <Sponsors /> */}
      <EventsLink />
    </>
  );
}

import { VideoProvider } from './context/VideoContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <VideoProvider>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Router>
        <SmoothScroll>
          <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary selection:text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </VideoProvider>
  );
}

export default App;
