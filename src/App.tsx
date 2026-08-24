import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PopularDestinationsSection } from './components/PopularDestinationsSection';
import { AllDestinationsView } from './components/AllDestinationsView';
import { TransportsSection } from './components/TransportsSection';
import { HotelsSection } from './components/HotelsSection';
import { MyBookingsModal } from './components/MyBookingsModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { BookingCheckoutModal } from './components/BookingCheckoutModal';
import { AIPlannerModal } from './components/AIPlannerModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import { 
  POPULAR_DESTINATIONS, 
  FEATURED_HOTELS, 
  TRANSPORT_TICKETS, 
  INITIAL_BOOKINGS 
} from './data/mockData';
import { 
  Destination, 
  Hotel, 
  RoomType, 
  TransportTicket, 
  Booking, 
  UserProfile 
} from './types';
import { Sparkles, MapPin, Plane, Hotel as HotelIcon, Compass } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'destinations' | 'transports' | 'hotels' | 'my-trips'>('destinations');
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  // User State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('vietwander_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('vietwander_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Saved / Wishlist IDs
  const [savedIds, setSavedIds] = useState<string[]>(['hoi-an', 'phu-quoc']);

  // Modals State
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({ open: false, mode: 'login' });
  const [aiPlanner, setAiPlanner] = useState<{ open: boolean; destination: string }>({ open: false, destination: 'Hội An' });
  
  // Checkout Modal State
  const [checkoutData, setCheckoutData] = useState<{
    open: boolean;
    itemType: 'transport' | 'hotel';
    transportTicket?: TransportTicket;
    hotel?: Hotel;
    selectedRoom?: RoomType;
  }>({
    open: false,
    itemType: 'transport'
  });

  // Target Destination Prefill for transport/hotel views
  const [prefillDestination, setPrefillDestination] = useState<string>('');

  // Persist user and bookings to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('vietwander_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vietwander_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vietwander_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Wishlist toggle handler
  const handleToggleSave = (destId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds(prev => 
      prev.includes(destId) ? prev.filter(id => id !== destId) : [...prev, destId]
    );
  };

  // Booking completion handler
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 flex flex-col font-sans selection:bg-[#004D40]/20 selection:text-[#004D40]">
      {/* Sticky Header Navbar matching screenshot */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'destinations') {
            setShowAllDestinations(false);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onOpenAuth={(mode = 'login') => setAuthModal({ open: true, mode })}
        onLogout={() => setUser(null)}
        onOpenAIPlanner={() => setAiPlanner({ open: true, destination: 'Hội An' })}
        savedCount={savedIds.length}
        bookingsCount={bookings.length}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'destinations' && (
          <>
            {!showAllDestinations ? (
              <>
                {/* Popular Destinations matching the user's reference image */}
                <PopularDestinationsSection
                  destinations={POPULAR_DESTINATIONS}
                  onSelectDestination={(dest) => setSelectedDestination(dest)}
                  onViewAllClick={() => setShowAllDestinations(true)}
                  savedIds={savedIds}
                  onToggleSave={handleToggleSave}
                />

                {/* Secondary Quick Action Banner in minimalist tone */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 max-w-xl text-center md:text-left">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#004D40] text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Trợ lý du lịch thông minh Gemini</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                        Chưa biết đi đâu cuối tuần này?
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Hãy để AI gợi ý lịch trình chi tiết từ địa điểm tham quan, món ngon đặc sản đến dự toán chi phí trong 5 giây.
                      </p>
                    </div>

                    <button
                      onClick={() => setAiPlanner({ open: true, destination: 'Hội An' })}
                      className="px-6 py-3.5 bg-[#004D40] hover:bg-[#00382E] text-white rounded-full font-bold text-sm shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Lên lịch trình cùng AI</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <AllDestinationsView
                destinations={POPULAR_DESTINATIONS}
                onSelectDestination={(dest) => setSelectedDestination(dest)}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
                onOpenAIPlanner={(dest) => setAiPlanner({ open: true, destination: dest || 'Đà Nẵng' })}
              />
            )}
          </>
        )}

        {activeTab === 'transports' && (
          <TransportsSection
            tickets={TRANSPORT_TICKETS}
            prefillDestination={prefillDestination}
            onBookTicket={(ticket) => {
              setCheckoutData({
                open: true,
                itemType: 'transport',
                transportTicket: ticket
              });
            }}
          />
        )}

        {activeTab === 'hotels' && (
          <HotelsSection
            hotels={FEATURED_HOTELS}
            prefillDestination={prefillDestination}
            onSelectRoomToBook={(hotel, room) => {
              setCheckoutData({
                open: true,
                itemType: 'hotel',
                hotel: hotel,
                selectedRoom: room
              });
            }}
          />
        )}

        {activeTab === 'my-trips' && (
          <MyBookingsModal
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onExploreClick={() => {
              setActiveTab('destinations');
              setShowAllDestinations(false);
            }}
          />
        )}
      </main>

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isSaved={selectedDestination ? savedIds.includes(selectedDestination.id) : false}
        onToggleSave={(id) => handleToggleSave(id)}
        onBookHotel={(destName) => {
          setPrefillDestination(destName);
          setActiveTab('hotels');
        }}
        onBookTransport={(destName) => {
          setPrefillDestination(destName);
          setActiveTab('transports');
        }}
        onPlanAI={(destName) => {
          setAiPlanner({ open: true, destination: destName });
        }}
      />

      {/* Checkout / Booking Confirmation Modal */}
      {checkoutData.open && (
        <BookingCheckoutModal
          itemType={checkoutData.itemType}
          transportTicket={checkoutData.transportTicket}
          hotel={checkoutData.hotel}
          selectedRoom={checkoutData.selectedRoom}
          user={user}
          onClose={() => setCheckoutData({ open: false, itemType: 'transport' })}
          onConfirmBooking={(booking) => {
            handleConfirmBooking(booking);
          }}
        />
      )}

      {/* AI Planner Modal */}
      <AIPlannerModal
        isOpen={aiPlanner.open}
        initialDestination={aiPlanner.destination}
        onClose={() => setAiPlanner({ open: false, destination: 'Hội An' })}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModal.open}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ open: false, mode: 'login' })}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
        }}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAIPlanner={() => setAiPlanner({ open: true, destination: 'Hội An' })}
      />
    </div>
  );
}
