import React, { useState } from 'react';
import { Ticket, Heart, ArrowRight, Sparkles, MapPin, Search } from 'lucide-react';
import { Destination } from '../types';
import { formatCurrency } from '../utils/formatters';

interface PopularDestinationsSectionProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  onViewAllClick: () => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const PopularDestinationsSection: React.FC<PopularDestinationsSectionProps> = ({
  destinations,
  onSelectDestination,
  onViewAllClick,
  savedIds,
  onToggleSave
}) => {
  // Grab the top 4 destinations for the featured row (matching the exact screenshot)
  const featuredDestinations = destinations.slice(0, 4);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-tight">
            Điểm đến được yêu thích
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Bốn hành trình kinh điển cho chuyến đi tiếp theo.
          </p>
        </div>

        <button
          onClick={onViewAllClick}
          className="self-start sm:self-auto px-5 py-2 rounded-full border border-slate-300 hover:border-slate-400 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 text-sm font-medium transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center gap-2"
        >
          <span>Xem tất cả điểm đến</span>
        </button>
      </div>

      {/* 4 Cards Grid precisely formatted like the image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredDestinations.map((dest) => {
          const isSaved = savedIds.includes(dest.id);

          return (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="bg-white rounded-[24px] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer border border-slate-100"
            >
              {/* Image with subtle hover zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                
                {/* Heart wishlist toggle button */}
                <button
                  type="button"
                  onClick={(e) => onToggleSave(dest.id, e)}
                  aria-label="Lưu vào danh sách yêu thích"
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isSaved
                      ? 'bg-white text-rose-500 shadow-md'
                      : 'bg-black/20 text-white hover:bg-white hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  {/* Region label e.g. MIỀN TRUNG, MIỀN BẮC, MIỀN NAM */}
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {dest.regionLabel || (dest.region === 'Trung' ? 'MIỀN TRUNG' : dest.region === 'Bắc' ? 'MIỀN BẮC' : dest.region === 'Nam' ? 'MIỀN NAM' : 'QUỐC TẾ')}
                  </span>

                  {/* Destination Name */}
                  <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-[#004D40] transition-colors mb-1">
                    {dest.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-slate-500 text-sm mb-4 line-clamp-1">
                    {dest.tagline || dest.description}
                  </p>
                </div>

                {/* Price tag with Ticket Icon */}
                <div className="pt-2 border-t border-slate-100/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#004D40]">
                    <Ticket className="w-4 h-4 text-[#004D40] stroke-[2.2]" />
                    <span>từ {dest.priceFrom.toLocaleString('vi-VN')} ₫</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-[#004D40] group-hover:translate-x-0.5 transition-all">
                    Chi tiết &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
