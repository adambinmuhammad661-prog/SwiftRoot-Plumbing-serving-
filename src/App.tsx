import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EmergencySection from './components/EmergencySection';
import Services from './components/Services';
import MapArea from './components/MapArea';
import ReviewsCarousel from './components/ReviewsCarousel';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [prefilledServiceId, setPrefilledServiceId] = useState<string | null>(null);

  // Synchronize themes on first mount
  useEffect(() => {
    // Check local preferences if desired (defaulting to pristine light mode to optimize readability)
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  const handleOpenBooking = (serviceId: string | null = null) => {
    setPrefilledServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPrefilledServiceId(null);
  };

  const handleScrollTo = (elementId: string) => {
    const target = document.getElementById(elementId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={isDark ? 'dark bg-slate-950 text-slate-50 min-h-screen transition-colors duration-200 selection:bg-red-500/30' : 'bg-slate-50 text-slate-950 min-h-screen transition-colors duration-200 selection:bg-red-200'}>
      
      {/* Dynamic Header */}
      <Navbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        onOpenBooking={() => handleOpenBooking(null)} 
        onScrollTo={handleScrollTo} 
      />

      {/* Main Single-Screen Structure */}
      <main className="font-sans antialiased">
        <Hero 
          onOpenBooking={() => handleOpenBooking(null)} 
          onScrollTo={handleScrollTo} 
        />
        
        {/* Core Sections */}
        <Services onOpenBooking={handleOpenBooking} />
        <EmergencySection />
        <MapArea />
        <ReviewsCarousel />
      </main>

      {/* Interactive Booking Modal Element */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        prefilledServiceId={prefilledServiceId} 
      />

      {/* Structured Footer */}
      <Footer 
        onScrollTo={handleScrollTo} 
        onOpenBooking={() => handleOpenBooking(null)} 
      />

    </div>
  );
}
