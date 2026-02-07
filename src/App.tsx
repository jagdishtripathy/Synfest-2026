import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Footer from './components/Footer';
import HomeHero from './components/home/Hero';
import About from './components/home/About';
import Leadership from './components/home/Leadership';
import Showcase from './components/Showcase';
import EventsLink from './components/home/EventsLink';
import Events from './pages/Events';
import Contact from './pages/Contact';

function Home() {
  return (
    <>
      <HomeHero />
      <About />
      <Leadership />
      <Showcase />
      <EventsLink />
    </>
  );
}

import { VideoProvider } from './context/VideoContext';

function App() {
  return (
    <VideoProvider>
      <Router>
        <SmoothScroll>
          <div className="min-h-screen bg-[#0a0a0a] text-white">
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
