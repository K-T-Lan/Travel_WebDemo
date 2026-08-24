import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Tag, 
  Ticket, 
  Hotel, 
  Plane, 
  Bus, 
  Calendar, 
  User, 
  Phone, 
  Mail,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TransportTicket, Hotel as HotelType, RoomType, Booking, PromoCode, UserProfile } from '../types';
import { formatCurrency, generateBookingCode } from '../utils/formatters';
import { PROMO_CODES } from '../data/mockData';

interface BookingCheckoutModalProps {
  itemType: 'transport' | 'hotel';
  transportTicket?: TransportTicket;
  hotel?: HotelType;
  selectedRoom?: RoomType;
  user: UserProfile | null;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingCheckoutModal: React.FC<BookingCheckoutModalProps> = ({
  itemType,
  transportTicket,
  hotel,
  selectedRoom,
  user,
  onClose,
  onConfirmBooking
}) => {
  // Booking Form State
  const [fullName, setFullName] = useState(user?.fullName || 'Nguyễn Văn Du');
  const [email, setEmail] = useState(user?.email || 'traveler@vietwander.com');
  const [phone, setPhone] = useState(user?.phone || '0901234567');
  const [quantity, setQuantity] = useState(1);
  const [nights, setNights] = useState(2);
  const [checkInDate, setCheckInDate] = useState('2026-06-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-06-17');
  const [travelDate, setTravelDate] = useState(transportTicket?.departureDate || '2026-06-15');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Promo code
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'card' | 'momo' | 'later'>('vietqr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);

  // Price Calculation
  const unitPrice = itemType === 'transport'
    ? (transportTicket?.price || 0)
    : (selectedRoom?.pricePerNight || hotel?.pricePerNight || 0);

  const baseTotal = itemType === 'transport' 
    ? unitPrice * quantity 
    : unitPrice * nights * quantity;

  const discountAmount = appliedPromo 
    ? (appliedPromo.type === 'percent' ? Math.min(baseTotal * (appliedPromo.value / 100), appliedPromo.maxDiscount || Infinity) : appliedPromo.value)
    : 0;

  const finalTotal = Math.max(0, baseTotal - discountAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    const found = PROMO_CODES.find(p => p.code === code && p.active);
    if (!found) {
      setPromoError('Mã khuyến mãi không hợp lệ hoặc đã hết hạn.');
      return;
    }
    if (baseTotal < found.minSpend) {
      setPromoError(`Đơn hàng cần tối thiểu ${formatCurrency(found.minSpend)} để áp dụng mã này.`);
      return;
    }
    setAppliedPromo(found);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Vui lòng điền đầy đủ thông tin liên hệ.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newBooking: Booking = {
        id: generateBookingCode(itemType === 'transport' ? (transportTicket?.type === 'flight' ? 'FLIGHT' : 'BUS') : 'HOTEL'),
        userId: user?.id || 'guest',
        type: itemType === 'transport' ? (transportTicket?.type === 'flight' ? 'flight' : 'bus') : 'hotel',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        totalPrice: finalTotal,
        paid: paymentMethod !== 'later',
        paymentMethod: paymentMethod === 'vietqr' ? 'VietQR Chuyển khoản' : paymentMethod === 'momo' ? 'Ví MoMo' : paymentMethod === 'card' ? 'Thẻ Quốc tế Visa/Mastercard' : 'Thanh toán khi nhận phòng',
        promoCodeApplied: appliedPromo?.code,
        discountAmount: discountAmount,
        specialRequests: specialRequests,
        transportTicket: transportTicket,
        hotel: hotel,
        roomType: selectedRoom,
        checkInDate: itemType === 'hotel' ? checkInDate : undefined,
        checkOutDate: itemType === 'hotel' ? checkOutDate : undefined,
        departureDate: itemType === 'transport' ? travelDate : undefined,
        quantity: quantity
      };

      setBookingSuccess(newBooking);
      onConfirmBooking(newBooking);
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white w-full max-w-2xl rounded-[28px] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#004D40] text-white flex items-center justify-center">
              {itemType === 'transport' ? <Plane className="w-4 h-4" /> : <Hotel className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">
                {bookingSuccess ? 'Đặt Chỗ Thành Công' : itemType === 'transport' ? 'Xác Nhận Đặt Vé' : 'Xác Nhận Đặt Phòng'}
              </h3>
              <p className="text-xs text-slate-500">Bảo mật thông tin & xác nhận tức thì</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {bookingSuccess ? (
            /* Success View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-[#004D40] rounded-full flex items-center justify-center mx-auto scale-110 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-2xl font-bold font-serif text-slate-900">Chúc mừng bạn đã đặt chỗ thành công!</h4>
                <p className="text-slate-500 text-sm mt-1">Mã xác nhận đơn hàng của bạn là:</p>
                <div className="mt-3 inline-block px-4 py-2 bg-emerald-50 text-[#004D40] font-mono font-bold text-lg rounded-xl border border-emerald-200">
                  {bookingSuccess.id}
                </div>
              </div>

              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-slate-200 text-left space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Khách hàng:</span>
                  <span className="font-semibold text-slate-900">{bookingSuccess.customerName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Email gửi vé điện tử:</span>
                  <span className="font-semibold text-slate-900">{bookingSuccess.customerEmail}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Dịch vụ:</span>
                  <span className="font-semibold text-slate-900">
                    {itemType === 'transport' 
                      ? `${transportTicket?.provider} (${transportTicket?.departure} ➔ ${transportTicket?.destination})`
                      : `${hotel?.name} - ${selectedRoom?.name || 'Phòng Deluxe'}`
                    }
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tổng thanh toán:</span>
                  <span className="font-bold text-emerald-700 text-base">{formatCurrency(bookingSuccess.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Hình thức:</span>
                  <span className="text-slate-800">{bookingSuccess.paymentMethod}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-5 bg-[#004D40] hover:bg-[#00382E] text-white rounded-full font-semibold text-sm transition-all cursor-pointer shadow-sm"
                >
                  Xem vé trong &quot;Chuyến của tôi&quot;
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {/* Product Summary Card */}
              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-slate-200/70 flex gap-4 items-center">
                <img
                  src={itemType === 'transport' ? transportTicket?.image : (selectedRoom?.image || hotel?.image)}
                  alt="thumbnail"
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#004D40] block">
                    {itemType === 'transport' ? (transportTicket?.type === 'flight' ? '✈️ Vé Máy Bay' : '🚌 Vé Xe Limousine') : '🏨 Khách Sạn & Resort'}
                  </span>
                  <h4 className="font-bold text-slate-900 text-base font-serif">
                    {itemType === 'transport' ? `${transportTicket?.departure} đi ${transportTicket?.destination}` : hotel?.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {itemType === 'transport' ? `${transportTicket?.provider} • ${transportTicket?.departureTime}` : `${selectedRoom?.name || 'Phòng tiêu chuẩn'} • ${hotel?.location}`}
                  </p>
                  <p className="text-xs font-semibold text-slate-700 mt-1">
                    Đơn giá: <span className="text-[#004D40]">{formatCurrency(unitPrice)}</span> / {itemType === 'transport' ? 'vé' : 'đêm'}
                  </p>
                </div>
              </div>

              {/* Quantity / Dates Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {itemType === 'transport' ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày khởi hành</label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Số lượng vé</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} vé người lớn</option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày nhận phòng (Check-in)</label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Số đêm lưu trú</label>
                      <select
                        value={nights}
                        onChange={(e) => setNights(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                      >
                        {[1, 2, 3, 4, 5, 7, 10].map(num => (
                          <option key={num} value={num}>{num} đêm ({num * 24}h)</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>

              {/* Customer Contact Info */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Thông tin liên hệ & nhận vé</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Họ và tên hành khách</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Số điện thoại</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0901234567"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email nhận vé & hóa đơn</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ban@example.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#004D40]" />
                    Mã ưu đãi giảm giá
                  </span>
                  <span className="text-slate-400 text-[11px] font-normal">Gợi ý: VIETNAMOI, HE2026</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Nhập VIETNAMOI hoặc HE2026"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-sm uppercase focus:outline-none focus:border-[#004D40]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>
                {promoError && <p className="text-xs text-rose-500 mt-1">{promoError}</p>}
                {appliedPromo && (
                  <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Đã áp dụng mã {appliedPromo.code}: {appliedPromo.description} (-{formatCurrency(discountAmount)})
                  </p>
                )}
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Phương thức thanh toán</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'vietqr' ? 'border-[#004D40] bg-emerald-50/60 ring-1 ring-[#004D40]' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#004D40]" />
                    <div>
                      <span className="text-xs font-bold block text-slate-800">VietQR Quét Mã</span>
                      <span className="text-[10px] text-slate-500">Mọi ngân hàng 24/7</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'card' ? 'border-[#004D40] bg-emerald-50/60 ring-1 ring-[#004D40]' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#004D40]" />
                    <div>
                      <span className="text-xs font-bold block text-slate-800">Thẻ Visa / Master</span>
                      <span className="text-[10px] text-slate-500">Bảo mật chuẩn quốc tế</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'momo' ? 'border-[#004D40] bg-emerald-50/60 ring-1 ring-[#004D40]' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-pink-600 text-white text-[10px] font-bold flex items-center justify-center">M</div>
                    <div>
                      <span className="text-xs font-bold block text-slate-800">Ví MoMo</span>
                      <span className="text-[10px] text-slate-500">Thanh toán tức thì</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('later')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      paymentMethod === 'later' ? 'border-[#004D40] bg-emerald-50/60 ring-1 ring-[#004D40]' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-slate-600" />
                    <div>
                      <span className="text-xs font-bold block text-slate-800">Thanh toán sau</span>
                      <span className="text-[10px] text-slate-500">Tại quầy / Nhận phòng</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính ({quantity} {itemType === 'transport' ? 'vé' : 'phòng'} x {itemType === 'hotel' ? `${nights} đêm` : '1 lượt'}):</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(baseTotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Mã giảm giá ({appliedPromo?.code}):</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Phí dịch vụ & VAT:</span>
                  <span className="text-emerald-700 font-semibold">Miễn phí</span>
                </div>
                <div className="border-t border-slate-200/80 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-xl text-[#004D40]">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-full bg-[#004D40] hover:bg-[#00382E] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Đang khởi tạo giao dịch...</span>
                ) : (
                  <>
                    <span>Hoàn Tất Đặt Chỗ ({formatCurrency(finalTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
