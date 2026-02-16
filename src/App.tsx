import { useState, useEffect } from 'react';
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
import Terms from './pages/Terms';
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

  // CTF Challenge Implementation
  useEffect(() => {
    // Part 2: Console Log
    console.log(
      "%cHooreeyyyy! 👋 You found Part 2/3: mast3r_",
      "background: #222; color: #bada55; font-size: 16px; padding: 10px; border-radius: 5px;"
    );

    // Part 3: Local Storage
    localStorage.setItem("ctf_part_3", "2026}");
    console.info("🔧 App initialized. Local Storage Session cache loaded successfully.");
  }, []);

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
              <Route path="/terms" element={<Terms />} />
            </Routes>
            <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </VideoProvider>
  );
}

export default App;
