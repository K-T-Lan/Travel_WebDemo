import React, { useState } from 'react';
import { 
  Ticket, 
  Hotel, 
  Plane, 
  Bus, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  QrCode, 
  Trash2, 
  Download,
  AlertCircle,
  X
} from 'lucide-react';
import { Booking } from '../types';
import { formatCurrency, formatDateVi } from '../utils/formatters';

interface MyBookingsModalProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onExploreClick: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  bookings,
  onCancelBooking,
  onExploreClick
}) => {
  const [selectedBookingForQR, setSelectedBookingForQR] = useState<Booking | null>(null);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 tracking-tight">
          Chuyến Đi Của Tôi
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-1.5">
          Quản lý toàn bộ vé máy bay, vé xe limousine và phòng khách sạn đã đặt thành công.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-[28px] border border-slate-200/80 p-8 max-w-lg mx-auto shadow-2xs">
          <Ticket className="w-16 h-16 text-slate-300 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-slate-800 text-xl">Bạn chưa có chuyến đi nào</h3>
          <p className="text-slate-500 text-sm mt-1 mb-6">
            Hãy khám phá các điểm đến hấp dẫn và đặt vé, đặt phòng ngay để bắt đầu hành trình!
          </p>
          <button
            onClick={onExploreClick}
            className="px-6 py-3 bg-[#004D40] hover:bg-[#00382E] text-white rounded-full font-semibold text-sm transition-all cursor-pointer shadow-xs"
          >
            Khám phá điểm đến ngay
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row justify-between gap-5 items-start sm:items-center"
            >
              {/* Left detail */}
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#004D40] flex items-center justify-center shrink-0 border border-emerald-100">
                  {b.type === 'flight' ? (
                    <Plane className="w-7 h-7" />
                  ) : b.type === 'bus' ? (
                    <Bus className="w-7 h-7" />
                  ) : (
                    <Hotel className="w-7 h-7" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {b.id}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {b.status === 'confirmed' ? 'Đã xác nhận' : 'Hoàn tất'}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    {b.type === 'hotel' 
                      ? `${b.hotel?.name || 'Khách sạn'} (${b.roomType?.name || 'Phòng'})`
                      : `${b.transportTicket?.provider || 'Hãng vận tải'} (${b.transportTicket?.departure} ➔ ${b.transportTicket?.destination})`
                    }
                  </h3>

                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                    <span>Hành khách: <strong>{b.customerName}</strong> ({b.customerPhone})</span>
                    <span>•</span>
                    <span>{b.quantity || 1} {b.type === 'hotel' ? 'phòng' : 'vé'}</span>
                  </p>
                </div>
              </div>

              {/* Right price & action */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block">Tổng tiền đã thanh toán</span>
                  <span className="text-lg font-bold font-serif text-[#004D40]">{formatCurrency(b.totalPrice)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBookingForQR(b)}
                    className="p-2.5 rounded-full bg-slate-100 hover:bg-[#004D40] hover:text-white text-slate-700 transition-colors cursor-pointer"
                    title="Xem mã QR & Vé điện tử"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Bạn có chắc chắn muốn hủy đơn ${b.id}?`)) {
                        onCancelBooking(b.id);
                      }
                    }}
                    className="p-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                    title="Hủy đặt chỗ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR & E-Ticket Modal */}
      {selectedBookingForQR && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative bg-white w-full max-w-md rounded-[28px] shadow-2xl p-6 border border-slate-100 text-center">
            <button
              onClick={() => setSelectedBookingForQR(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#004D40] text-white flex items-center justify-center mx-auto mb-3">
              <Ticket className="w-6 h-6" />
            </div>

            <h3 className="font-serif font-bold text-slate-900 text-xl">Thẻ Lên Máy Bay / Nhận Phòng</h3>
            <p className="text-xs text-slate-500 mt-1">Xuất trình mã này cho nhân viên khi làm thủ tục</p>

            <div className="my-6 p-4 bg-[#FAF9F5] rounded-2xl border border-slate-200 inline-block">
              {/* Generated SVG QR Code illustration */}
              <div className="w-44 h-44 bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center justify-center mx-auto shadow-xs">
                <QrCode className="w-36 h-36 text-slate-900" />
              </div>
              <div className="mt-2 font-mono font-bold text-sm text-[#004D40] tracking-wider">
                {selectedBookingForQR.id}
              </div>
            </div>

            <div className="text-left bg-slate-50 p-4 rounded-xl text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Họ tên:</span>
                <span className="font-bold text-slate-900">{selectedBookingForQR.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Dịch vụ:</span>
                <span className="font-semibold text-slate-900">
                  {selectedBookingForQR.type === 'hotel' ? selectedBookingForQR.hotel?.name : selectedBookingForQR.transportTicket?.provider}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tổng chi phí:</span>
                <span className="font-bold text-emerald-700">{formatCurrency(selectedBookingForQR.totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Đã lưu vé điện tử ${selectedBookingForQR.id} vào máy!`);
                setSelectedBookingForQR(null);
              }}
              className="mt-5 w-full py-3 bg-[#004D40] hover:bg-[#00382E] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải Vé Điện Tử (PDF / Ảnh)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
