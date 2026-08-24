import React, { useState, useMemo } from 'react';
import { 
  Hotel, 
  MapPin, 
  Star, 
  Wifi, 
  Coffee, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { Hotel as HotelType, RoomType } from '../types';
import { formatCurrency } from '../utils/formatters';

interface HotelsSectionProps {
  hotels: HotelType[];
  onSelectRoomToBook: (hotel: HotelType, room: RoomType) => void;
  prefillDestination?: string;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({
  hotels,
  onSelectRoomToBook,
  prefillDestination = ''
}) => {
  const [selectedCity, setSelectedCity] = useState(prefillDestination);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotelDetail, setSelectedHotelDetail] = useState<HotelType | null>(null);

  const filteredHotels = useMemo(() => {
    return hotels.filter((h) => {
      const matchCity = !selectedCity || h.city.toLowerCase().includes(selectedCity.toLowerCase()) || h.location.toLowerCase().includes(selectedCity.toLowerCase());
      const matchSearch = !searchQuery || h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchSearch;
    });
  }, [hotels, selectedCity, searchQuery]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-tight">
          Khách Sạn & Khu Nghỉ Dưỡng
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-1.5">
          Tận hưởng không gian nghỉ dưỡng tuyệt vời tại những khách sạn và resort sang trọng nhất.
        </p>
      </div>

      {/* Filter and City Tabs */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm tên khách sạn hoặc địa danh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-slate-200 focus:outline-none focus:border-[#004D40] text-sm text-slate-800 shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { label: 'Tất cả điểm', value: '' },
            { label: 'Hội An', value: 'Hội An' },
            { label: 'Đà Nẵng', value: 'Đà Nẵng' },
            { label: 'Phú Quốc', value: 'Phú Quốc' },
            { label: 'Sa Pa', value: 'Sa Pa' },
            { label: 'Hà Giang', value: 'Hà Giang' }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setSelectedCity(item.value)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                selectedCity === item.value
                  ? 'bg-[#004D40] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all flex flex-col sm:flex-row"
          >
            {/* Image */}
            <div className="sm:w-2/5 relative h-56 sm:h-auto bg-slate-100 shrink-0">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-amber-600 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{hotel.rating}</span>
                <span className="text-slate-400 font-normal">({hotel.reviewsCount})</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#004D40]" />
                  <span>{hotel.location}</span>
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-lg sm:text-xl line-clamp-1">
                  {hotel.name}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 line-clamp-2">
                  {hotel.description}
                </p>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hotel.amenities.slice(0, 3).map((a, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      ✓ {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Giá từ</span>
                  <div className="text-lg sm:text-xl font-bold font-serif text-[#004D40]">
                    {formatCurrency(hotel.pricePerNight)}
                    <span className="text-xs font-normal text-slate-500"> / đêm</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedHotelDetail(hotel)}
                  className="px-4 py-2 bg-[#004D40] hover:bg-[#00382E] text-white rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Chọn phòng</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Room Selection Modal */}
      {selectedHotelDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="relative bg-white w-full max-w-3xl rounded-[28px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-100">
            {/* Header */}
            <div className="px-6 py-4 bg-[#FAF9F5] border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-xl">{selectedHotelDetail.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#004D40]" />
                  {selectedHotelDetail.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedHotelDetail(null)}
                className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Room List */}
            <div className="p-6 overflow-y-auto space-y-4">
              <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Danh Sách Loại Phòng</h4>
              {selectedHotelDetail.roomTypes.map((room) => (
                <div
                  key={room.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-[#004D40] bg-white flex flex-col sm:flex-row gap-4 items-center justify-between transition-all"
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full sm:w-36 h-28 rounded-xl object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h5 className="font-bold text-slate-900 text-base font-serif">{room.name}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{room.area} • {room.bedType} • {room.capacity}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {room.perks.map((p, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium">
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:border-slate-100 sm:pl-4 min-w-[140px]">
                    <div className="text-lg font-bold font-serif text-[#004D40]">
                      {formatCurrency(room.pricePerNight)}
                    </div>
                    <span className="text-[11px] text-slate-400 block mb-2">1 đêm, chưa gồm mã giảm</span>
                    <button
                      onClick={() => {
                        const hotelToBook = selectedHotelDetail;
                        setSelectedHotelDetail(null);
                        onSelectRoomToBook(hotelToBook, room);
                      }}
                      className="w-full py-2 px-4 bg-[#004D40] hover:bg-[#00382E] text-white rounded-full text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Đặt phòng này
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
