import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Hotel, 
  Plane, 
  Ticket, 
  Sparkles, 
  User, 
  LogOut, 
  Menu, 
  X,
  Heart,
  UserPlus
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'destinations' | 'transports' | 'hotels' | 'my-trips';
  setActiveTab: (tab: 'destinations' | 'transports' | 'hotels' | 'my-trips') => void;
  user: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onLogout: () => void;
  onOpenAIPlanner: () => void;
  savedCount: number;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onLogout,
  onOpenAIPlanner,
  savedCount,
  bookingsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo matching the screenshot */}
          <div 
            onClick={() => setActiveTab('destinations')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-full bg-[#004D40] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold font-serif tracking-tight text-slate-900">
              VietWander
            </span>
          </div>

          {/* Center Navigation Menu matching screenshot: Điểm đến | Đặt vé | Đặt phòng | Chuyến của tôi */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setActiveTab('destinations')}
              className={`text-sm font-medium transition-colors cursor-pointer py-1 ${
                activeTab === 'destinations'
                  ? 'text-[#004D40] font-semibold border-b-2 border-[#004D40]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Điểm đến
            </button>

            <button
              onClick={() => setActiveTab('transports')}
              className={`text-sm font-medium transition-colors cursor-pointer py-1 ${
                activeTab === 'transports'
                  ? 'text-[#004D40] font-semibold border-b-2 border-[#004D40]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đặt vé
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`text-sm font-medium transition-colors cursor-pointer py-1 ${
                activeTab === 'hotels'
                  ? 'text-[#004D40] font-semibold border-b-2 border-[#004D40]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đặt phòng
            </button>

            <button
              onClick={() => setActiveTab('my-trips')}
              className={`text-sm font-medium transition-colors cursor-pointer py-1 relative ${
                activeTab === 'my-trips'
                  ? 'text-[#004D40] font-semibold border-b-2 border-[#004D40]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Chuyến của tôi</span>
              {bookingsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-[#004D40] text-white text-[11px] font-bold rounded-full">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* AI Assistant button */}
            <button
              onClick={onOpenAIPlanner}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-[#004D40] border border-emerald-200/80 hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Lịch trình AI</span>
            </button>
          </nav>

          {/* Right actions: Đăng nhập & Đăng ký pill button matching screenshot */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 py-1.5 px-3 rounded-full bg-white border border-slate-200 hover:border-[#004D40] transition-colors cursor-pointer shadow-xs"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-[#004D40]"
                  />
                  <span className="text-sm font-medium text-slate-800 hidden sm:inline">
                    {user.fullName}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Tài khoản</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setActiveTab('my-trips');
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Ticket className="w-4 h-4 text-[#004D40]" />
                      Vé & Đặt phòng ({bookingsCount})
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAIPlanner();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Lên lịch trình AI
                    </button>
                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 cursor-pointer transition-colors"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="bg-[#004D40] hover:bg-[#00382E] text-white text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Đăng ký</span>
                </button>
              </div>
            )}

            {/* Mobile burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-200/50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/70 space-y-2">
            <button
              onClick={() => {
                setActiveTab('destinations');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm font-medium rounded-lg ${
                activeTab === 'destinations' ? 'bg-[#004D40]/10 text-[#004D40] font-bold' : 'text-slate-700'
              }`}
            >
              Điểm đến
            </button>
            <button
              onClick={() => {
                setActiveTab('transports');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm font-medium rounded-lg ${
                activeTab === 'transports' ? 'bg-[#004D40]/10 text-[#004D40] font-bold' : 'text-slate-700'
              }`}
            >
              Đặt vé (Máy bay & Xe)
            </button>
            <button
              onClick={() => {
                setActiveTab('hotels');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm font-medium rounded-lg ${
                activeTab === 'hotels' ? 'bg-[#004D40]/10 text-[#004D40] font-bold' : 'text-slate-700'
              }`}
            >
              Đặt phòng khách sạn
            </button>
            <button
              onClick={() => {
                setActiveTab('my-trips');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm font-medium rounded-lg ${
                activeTab === 'my-trips' ? 'bg-[#004D40]/10 text-[#004D40] font-bold' : 'text-slate-700'
              }`}
            >
              Chuyến của tôi ({bookingsCount})
            </button>
            <button
              onClick={() => {
                onOpenAIPlanner();
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm font-medium rounded-lg bg-emerald-50 text-[#004D40] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Lịch trình du lịch AI
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
