import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Plane, 
  Compass, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Award,
  Zap
} from 'lucide-react';

interface HeroSearchProps {
  onSearch: (type: 'explore' | 'hotels' | 'transports', query: string, destination?: string) => void;
  onOpenAIPlannerWithDest: (dest: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, onOpenAIPlannerWithDest }) => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'transports' | 'explore' | 'ai'>('hotels');
  
  // Search state
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('Hà Nội');
  const [checkInDate, setCheckInDate] = useState('2026-09-01');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-04');
  const [guestsCount, setGuestsCount] = useState('2 người lớn, 1 phòng');
  const [transportType, setTransportType] = useState<'all' | 'flight' | 'bus' | 'train'>('all');

  const popularTags = [
    { name: 'Đà Nẵng', tag: 'da-nang' },
    { name: 'Phú Quốc', tag: 'phu-quoc' },
    { name: 'Sa Pa', tag: 'sapa' },
    { name: 'Hà Giang', tag: 'ha-giang' },
    { name: 'Hội An', tag: 'hoi-an' },
    { name: 'Đà Lạt', tag: 'da-lat' },
    { name: 'Nha Trang', tag: 'nha-trang' },
    { name: 'Bangkok', tag: 'bangkok' }
  ];

  const handleExecuteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'ai') {
      onOpenAIPlannerWithDest(destination || 'Đà Nẵng');
    } else {
      onSearch(activeTab, destination, destination);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Background imagery subtle overlay */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=80')` }}
      />

      <div className="relative max-w-5xl mx-auto text-center space-y-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Đặt vé nhanh chóng • Giữ chỗ tức thì • Giá tốt nhất thị trường</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Hành Trình Mơ Ước, <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
            Khám Phá Dễ Dàng Cùng VietTravel
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
          Hơn 5.000+ khách sạn, vé máy bay giá rẻ, xe Limousine chất lượng cao và trợ lý AI lên lịch trình du lịch thông minh chỉ trong 5 giây.
        </p>

        {/* Main Search Container */}
        <div className="mt-8 bg-white rounded-3xl p-3 sm:p-5 shadow-2xl text-slate-900 border border-slate-100/20 max-w-4xl mx-auto">
          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-4 border-b border-slate-100">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'hotels'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Hotel className="w-4 h-4" />
              Đặt Khách Sạn & Resort
            </button>

            <button
              onClick={() => setActiveTab('transports')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'transports'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Plane className="w-4 h-4" />
              Vé Máy Bay & Xe Khách
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'explore'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              Điểm Đến & Tour
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              Gợi Ý Lịch Trình AI
            </button>
          </div>

          {/* Dynamic Form based on Tab */}
          <form onSubmit={handleExecuteSearch} className="pt-4">
            {activeTab === 'hotels' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                {/* Destination Input */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-colors">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    Bạn muốn đi đâu?
                  </label>
                  <input
                    type="text"
                    placeholder="Đà Nẵng, Phú Quốc, Sa Pa..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none placeholder-slate-400"
                  />
                </div>

                {/* Check-in */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-colors">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Ngày nhận phòng
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-900 text-sm focus:outline-none"
                  />
                </div>

                {/* Check-out */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-colors">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Ngày trả phòng
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-900 text-sm focus:outline-none"
                  />
                </div>

                {/* Guests */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-colors">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    Số khách & Phòng
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-900 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="1 người lớn, 1 phòng">1 Khách, 1 Phòng</option>
                    <option value="2 người lớn, 1 phòng">2 Khách, 1 Phòng</option>
                    <option value="2 người lớn, 2 trẻ em">Gia đình (4 Khách), 1 Phòng</option>
                    <option value="Nhóm bạn 5-8 người">Nhóm đông (5-8 Khách)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'transports' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Điểm khởi hành
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Hà Nội, TP.HCM..."
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Điểm đến
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Đà Nẵng, Sa Pa, Phú Quốc..."
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Ngày khởi hành
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-900 text-sm focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Phương tiện
                  </label>
                  <select
                    value={transportType}
                    onChange={(e) => setTransportType(e.target.value as any)}
                    className="w-full bg-transparent font-semibold text-slate-900 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="all">Tất cả phương tiện</option>
                    <option value="flight">Máy bay (Vietnam Airlines, Vietjet)</option>
                    <option value="bus">Xe Limousine giường nằm</option>
                    <option value="train">Tàu hỏa hỏa tốc</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'explore' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="sm:col-span-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    Tìm kiếm địa danh, bãi biển, núi rừng hoặc thành phố
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Nhập tên địa điểm (VD: Hà Giang, Cầu Vàng, Đảo Ngọc...)"
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                  />
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Loại hình trải nghiệm
                  </label>
                  <select className="w-full bg-transparent font-semibold text-slate-900 text-sm focus:outline-none cursor-pointer">
                    <option value="all">Tất cả trải nghiệm</option>
                    <option value="beach">Du lịch Biển & Lặn San Hô</option>
                    <option value="mountain">Săn Mây Núi Rừng & Trekking</option>
                    <option value="culture">Văn Hóa Di Sản UNESCO</option>
                    <option value="luxury">Nghỉ Dưỡng Resort 5 Sao</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-left">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Trợ Lý Du Lịch Gemini AI - Lập Lịch Trình Tự Động Trong Vài Giây</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Nhập nơi bạn muốn tới (VD: 3 ngày 2 đêm tại Đà Lạt cùng người yêu...)"
                    className="flex-1 bg-white px-4 py-2.5 rounded-xl border border-slate-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    <span>Lên Kế Hoạch Ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Search Submit Button for standard tabs */}
            {activeTab !== 'ai' && (
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Bảo đảm hoàn tiền 100% nếu có sự cố vé hoặc phòng</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-8 py-3 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Tìm Kiếm Chuyến Đi</span>
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Điểm đến hot hôm nay:</span>
          {popularTags.map((item) => (
            <button
              key={item.tag}
              onClick={() => {
                setDestination(item.name);
                onSearch(activeTab === 'ai' ? 'explore' : activeTab, item.name, item.name);
              }}
              className="bg-slate-800/80 hover:bg-emerald-600 hover:text-white text-slate-200 px-3 py-1 rounded-full border border-slate-700 transition-all cursor-pointer text-xs"
            >
              📍 {item.name}
            </button>
          ))}
        </div>

        {/* 3 Trust pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left max-w-4xl mx-auto">
          <div className="bg-slate-800/40 backdrop-blur-xs border border-slate-700/50 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Cam Kết Giá Tốt Nhất</p>
              <p className="text-[11px] text-slate-400">Hàng ngàn ưu đãi giảm tới 35%</p>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xs border border-slate-700/50 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Xác Nhận Tức Thì</p>
              <p className="text-[11px] text-slate-400">Có mã vé & QR điện tử ngay lập tức</p>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xs border border-slate-700/50 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Trí Tuệ Nhân Tạo AI</p>
              <p className="text-[11px] text-slate-400">Lập kế hoạch du lịch chuẩn xác 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
