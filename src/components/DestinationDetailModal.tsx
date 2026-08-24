import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Sun, 
  Calendar, 
  Sparkles, 
  Hotel, 
  Plane, 
  Utensils, 
  CheckCircle2, 
  Ticket, 
  Share2, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { Destination } from '../types';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookHotel: (destinationName: string) => void;
  onBookTransport: (destinationName: string) => void;
  onPlanAI: (destinationName: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onBookHotel,
  onBookTransport,
  onPlanAI,
  isSaved,
  onToggleSave
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!destination) return null;

  const allImages = destination.gallery && destination.gallery.length > 0
    ? destination.gallery
    : [destination.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-[28px] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-100">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Main Hero Media Gallery */}
          <div className="relative h-72 sm:h-96 w-full bg-slate-900">
            <img
              src={allImages[activeImageIndex] || destination.image}
              alt={destination.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom Title on Hero */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-emerald-300">
                  {destination.regionLabel || `Miền ${destination.region}`}
                </span>
                <span className="text-xs font-medium bg-black/30 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-400" />
                  {destination.weather.temp} • {destination.weather.condition}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif">{destination.name}</h2>
              <p className="text-sm text-slate-200 mt-1 max-w-2xl">{destination.tagline || destination.description}</p>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {allImages.length > 1 && (
              <div className="absolute top-4 left-4 z-10 flex gap-1.5">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-white scale-105 shadow-md' : 'border-white/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#FAF9F5] rounded-2xl border border-slate-200/60 text-center">
              <div>
                <span className="text-xs text-slate-400 block">Thời điểm lý tưởng</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{destination.bestTimeToVisit}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Độ ẩm trung bình</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{destination.weather.humidity}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Đánh giá</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-700">★ {destination.rating} / 5.0</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Chi phí từ</span>
                <span className="text-xs sm:text-sm font-bold text-[#004D40]">{destination.priceFrom.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>

            {/* Long Description */}
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900 mb-2">Giới thiệu điểm đến</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {destination.longDescription || destination.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#004D40]" />
                <span>Trải nghiệm không thể bỏ lỡ</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#004D40] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Famous Food */}
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900 mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-600" />
                <span>Ẩm thực đặc sắc trứ danh</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {destination.famousFoods.map((food, index) => (
                  <span
                    key={index}
                    className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-xs sm:text-sm font-medium"
                  >
                    🍜 {food}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(destination.id)}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-600'
              }`}
              title="Lưu yêu thích"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
            </button>
            <div>
              <span className="text-xs text-slate-400 block">Giá vé / phòng từ</span>
              <span className="text-lg font-bold text-[#004D40]">
                {destination.priceFrom.toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                onClose();
                onPlanAI(destination.name);
              }}
              className="px-4 py-2.5 rounded-full bg-emerald-50 text-[#004D40] border border-emerald-300 hover:bg-emerald-100 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Lên lịch trình AI</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookTransport(destination.name);
              }}
              className="px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plane className="w-4 h-4" />
              <span>Đặt vé</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookHotel(destination.name);
              }}
              className="px-5 py-2.5 rounded-full bg-[#004D40] hover:bg-[#00382E] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Hotel className="w-4 h-4" />
              <span>Đặt phòng</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
