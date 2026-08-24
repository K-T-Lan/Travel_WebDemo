import React, { useState, useMemo } from 'react';
import { 
  Plane, 
  Bus, 
  Train, 
  Search, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Wifi, 
  Coffee, 
  Check, 
  Filter, 
  Luggage,
  Calendar,
  Sparkles,
  Ticket
} from 'lucide-react';
import { TransportTicket } from '../types';
import { formatCurrency } from '../utils/formatters';

interface TransportsSectionProps {
  tickets: TransportTicket[];
  onBookTicket: (ticket: TransportTicket) => void;
  prefillDestination?: string;
}

export const TransportsSection: React.FC<TransportsSectionProps> = ({
  tickets,
  onBookTicket,
  prefillDestination = ''
}) => {
  const [selectedType, setSelectedType] = useState<'all' | 'flight' | 'bus' | 'train'>('all');
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState(prefillDestination);
  const [selectedDate, setSelectedDate] = useState('2026-06-15');

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchType = selectedType === 'all' || t.type === selectedType;
      const matchDep = !departureCity || t.departure.toLowerCase().includes(departureCity.toLowerCase());
      const matchDest = !destinationCity || t.destination.toLowerCase().includes(destinationCity.toLowerCase());
      return matchType && matchDep && matchDest;
    });
  }, [tickets, selectedType, departureCity, destinationCity]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-tight">
          Đặt Vé Máy Bay & Xe Limousine
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-1.5">
          So sánh giá vé máy bay, xe khách cao cấp và tàu hỏa với ưu đãi tốt nhất.
        </p>
      </div>

      {/* Search & Filter Box */}
      <div className="bg-white p-5 sm:p-6 rounded-[24px] shadow-xs border border-slate-200/80 mb-8">
        {/* Mode Tabs */}
        <div className="flex gap-2 border-b border-slate-100 pb-4 mb-4">
          {[
            { id: 'all', label: 'Tất cả phương tiện', icon: Ticket },
            { id: 'flight', label: 'Máy bay', icon: Plane },
            { id: 'bus', label: 'Xe Limousine', icon: Bus },
            { id: 'train', label: 'Tàu hỏa', icon: Train }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#004D40] text-white shadow-xs'
                    : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Điểm đi</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Hà Nội, TP. Hồ Chí Minh..."
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:border-[#004D40] text-sm text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Điểm đến</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004D40]" />
              <input
                type="text"
                placeholder="Đà Nẵng, Phú Quốc, Sa Pa..."
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:border-[#004D40] text-sm text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Ngày đi</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/80 rounded-xl border border-slate-200 focus:outline-none focus:border-[#004D40] text-sm text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h4 className="font-serif font-bold text-slate-800 text-lg">Không tìm thấy vé phù hợp</h4>
            <p className="text-slate-500 text-sm mt-1">Hãy thử xóa bộ lọc điểm đi / điểm đến để xem toàn bộ danh sách vé có sẵn.</p>
            <button
              onClick={() => {
                setDepartureCity('');
                setDestinationCity('');
                setSelectedType('all');
              }}
              className="mt-4 px-5 py-2 bg-[#004D40] text-white rounded-full text-xs font-semibold cursor-pointer"
            >
              Xem tất cả vé
            </button>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-[20px] p-4 sm:p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Provider Info */}
              <div className="flex items-center gap-3 min-w-[200px]">
                <img
                  src={ticket.image}
                  alt={ticket.provider}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    {ticket.type === 'flight' ? (
                      <Plane className="w-3.5 h-3.5 text-sky-600" />
                    ) : (
                      <Bus className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{ticket.provider}</span>
                  </div>
                  <span className="text-xs text-slate-500">{ticket.code} • {ticket.classType}</span>
                </div>
              </div>

              {/* Time & Route */}
              <div className="flex-1 flex items-center justify-between sm:justify-center gap-4 sm:gap-8 px-2 sm:px-6 py-2 bg-slate-50/60 rounded-xl">
                <div className="text-left">
                  <span className="text-base sm:text-lg font-bold text-slate-900 block">{ticket.departureTime}</span>
                  <span className="text-xs text-slate-500 font-medium">{ticket.departure}</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[11px] text-slate-400 font-medium">{ticket.duration}</span>
                  <div className="w-20 sm:w-28 h-0.5 bg-slate-300 relative my-1">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#004D40]" />
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">Bay thẳng</span>
                </div>

                <div className="text-right">
                  <span className="text-base sm:text-lg font-bold text-slate-900 block">{ticket.arrivalTime}</span>
                  <span className="text-xs text-slate-500 font-medium">{ticket.destination}</span>
                </div>
              </div>

              {/* Amenities & Price & Action */}
              <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <div className="text-xs text-slate-400">Giá 1 vé từ</div>
                  <div className="text-lg sm:text-xl font-bold font-serif text-[#004D40]">
                    {formatCurrency(ticket.price)}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium">Còn {ticket.availableSeats} ghế trống</div>
                </div>

                <button
                  onClick={() => onBookTicket(ticket)}
                  className="px-5 py-2.5 bg-[#004D40] hover:bg-[#00382E] text-white rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  Chọn vé
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
