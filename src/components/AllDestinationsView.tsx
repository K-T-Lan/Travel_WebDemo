import React, { useState, useMemo } from 'react';
import { Search, MapPin, Ticket, Heart, Filter, ArrowLeft, Sparkles, Sun, Compass } from 'lucide-react';
import { Destination, DestinationCategory } from '../types';

interface AllDestinationsViewProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenAIPlanner: (dest?: string) => void;
}

export const AllDestinationsView: React.FC<AllDestinationsViewProps> = ({
  destinations,
  onSelectDestination,
  savedIds,
  onToggleSave,
  onOpenAIPlanner
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('all');

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchRegion = selectedRegion === 'all' || dest.region === selectedRegion;
      const matchCat = selectedCategory === 'all' || dest.category === selectedCategory;

      return matchSearch && matchRegion && matchCat;
    });
  }, [destinations, searchQuery, selectedRegion, selectedCategory]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-tight">
              Khám Phá Điểm Đến
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5">
              Tìm kiếm hành trình lý tưởng trên khắp dải đất hình chữ S và Đông Nam Á.
            </p>
          </div>

          <button
            onClick={() => onOpenAIPlanner()}
            className="self-start sm:self-auto bg-emerald-50 hover:bg-emerald-100 text-[#004D40] border border-emerald-300 font-semibold px-4 py-2 rounded-full text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Nhờ AI gợi ý lịch trình</span>
          </button>
        </div>

        {/* Search Bar & Region Filters */}
        <div className="mt-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm điểm đến (Hội An, Sa Pa, Đà Nẵng...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full border border-slate-200 focus:outline-none focus:border-[#004D40] text-sm text-slate-800 shadow-2xs"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { label: 'Tất cả vùng', value: 'all' },
              { label: 'Miền Bắc', value: 'Bắc' },
              { label: 'Miền Trung', value: 'Trung' },
              { label: 'Miền Nam', value: 'Nam' },
              { label: 'Quốc tế', value: 'Quốc tế' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedRegion(tab.value)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  selectedRegion === tab.value
                    ? 'bg-[#004D40] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {[
            { id: 'all', label: 'Tất cả phong cách' },
            { id: 'beach', label: '🏝️ Biển đảo' },
            { id: 'mountain', label: '⛰️ Săn mây & Núi rừng' },
            { id: 'culture', label: '🏮 Văn hóa & Di sản' },
            { id: 'city', label: '🏙️ Thành phố & Ẩm thực' },
            { id: 'luxury', label: '✨ Nghỉ dưỡng cao cấp' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as DestinationCategory)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Results */}
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 max-w-md mx-auto">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">Không tìm thấy địa điểm phù hợp</h3>
          <p className="text-sm text-slate-500 mt-1">Hãy thử tìm với từ khóa khác hoặc xóa bộ lọc vùng miền.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedCategory('all');
            }}
            className="mt-4 px-5 py-2 bg-[#004D40] text-white text-sm font-medium rounded-full cursor-pointer hover:bg-[#00382E]"
          >
            Xem lại tất cả
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => {
            const isSaved = savedIds.includes(dest.id);

            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="bg-white rounded-[24px] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer border border-slate-100"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={(e) => onToggleSave(dest.id, e)}
                    aria-label="Lưu điểm đến"
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-white text-rose-500 shadow-md'
                        : 'bg-black/20 text-white hover:bg-white hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                  </button>
                  <div className="absolute bottom-2.5 left-2.5 bg-black/40 backdrop-blur-md text-white text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                    <Sun className="w-3 h-3 text-amber-400" />
                    <span>{dest.weather.temp} • {dest.weather.condition}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {dest.regionLabel || (dest.region === 'Trung' ? 'MIỀN TRUNG' : dest.region === 'Bắc' ? 'MIỀN BẮC' : dest.region === 'Nam' ? 'MIỀN NAM' : 'QUỐC TẾ')}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-[#004D40] transition-colors mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                      {dest.tagline || dest.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-[#004D40]">
                      <Ticket className="w-4 h-4 text-[#004D40] stroke-[2.2]" />
                      <span>từ {dest.priceFrom.toLocaleString('vi-VN')} ₫</span>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-[#004D40] transition-colors">
                      Khám phá &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
