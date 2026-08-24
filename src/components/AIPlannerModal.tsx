import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Send, 
  Check, 
  Sun, 
  Compass, 
  Utensils, 
  Package, 
  Clock
} from 'lucide-react';
import { AIPlanTripResponse } from '../types';

interface AIPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export const AIPlannerModal: React.FC<AIPlannerModalProps> = ({
  isOpen,
  onClose,
  initialDestination = 'Hội An'
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState<'budget' | 'medium' | 'luxury'>('medium');
  const [interests, setInterests] = useState<string[]>(['Văn hóa', 'Ẩm thực', 'Chụp ảnh']);
  const [companions, setCompanions] = useState('2 người (cặp đôi)');

  const [isLoading, setIsLoading] = useState(false);
  const [planResult, setPlanResult] = useState<AIPlanTripResponse | null>(null);

  if (!isOpen) return null;

  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests(interests.filter(i => i !== tag));
    } else {
      setInterests([...interests, tag]);
    }
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setIsLoading(true);
    setPlanResult(null);

    try {
      const response = await fetch('/api/ai/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days,
          budget,
          interests,
          companions
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPlanResult(data);
      } else {
        throw new Error('Lỗi tạo lịch trình');
      }
    } catch (err) {
      console.error(err);
      // Client-side fallback if server offline
      setPlanResult({
        title: `Hành Trình Khám Phá ${destination} ${days} Ngày ${days - 1} Đêm`,
        destination: destination,
        duration: `${days} ngày`,
        estimatedBudget: budget === 'budget' ? '2.500.000 ₫ / người' : budget === 'luxury' ? '8.900.000 ₫ / người' : '4.500.000 ₫ / người',
        summary: `${destination} là điểm đến lý tưởng cho chuyến đi này với khí hậu trong lành, ẩm thực tuyệt hảo và nhiều góc check-in tuyệt đẹp.`,
        days: Array.from({ length: days }, (_, i) => ({
          day: i + 1,
          title: `Ngày ${i + 1}: Trải nghiệm nét đặc sắc tại ${destination}`,
          morning: `Thưởng thức bữa sáng đặc sản địa phương, dạo bước ngắm bình minh và chụp ảnh kỉ niệm.`,
          afternoon: `Tham quan các danh lam thắng cảnh nổi bật, trải nghiệm văn hóa bản địa và các hoạt động thư giãn.`,
          evening: `Thưởng thức bữa tối ẩm thực đêm, dạo phố và ngắm cảnh lung linh về đêm.`,
          foodTips: `Đừng quên thử các món ăn vặt và hải sản / đặc sản tươi ngon.`
        })),
        packingTips: ['Kem chống nắng & kính râm', 'Giày đi bộ êm chân', 'Trang phục thoải mái', 'Sạc dự phòng & máy ảnh'],
        bestTips: `Nên đặt vé phương tiện và phòng khách sạn trước 1-2 tuần để nhận giá ưu đãi tốt nhất từ VietWander.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white w-full max-w-3xl rounded-[28px] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#004D40] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-lg sm:text-xl">Lập Lịch Trình Thông Minh Với AI</h3>
              <p className="text-xs text-slate-500">Tối ưu hoá hành trình du lịch chỉ trong vài giây</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {!planResult ? (
            <form onSubmit={handleGeneratePlan} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Điểm đến mong muốn
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004D40]" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Nhập Hội An, Sa Pa, Đà Nẵng, Phú Quốc, Hà Giang..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Thời lượng chuyến đi
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                  >
                    <option value={2}>2 ngày 1 đêm (Cuối tuần)</option>
                    <option value={3}>3 ngày 2 đêm (Phổ biến)</option>
                    <option value={4}>4 ngày 3 đêm (Thong thả)</option>
                    <option value={5}>5 ngày 4 đêm (Khám phá sâu)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Mức ngân sách
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'budget', label: 'Tiết kiệm' },
                      { id: 'medium', label: 'Hợp lý' },
                      { id: 'luxury', label: 'Cao cấp' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBudget(b.id as any)}
                        className={`py-2 px-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                          budget === b.id
                            ? 'border-[#004D40] bg-emerald-50 text-[#004D40] font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Sở thích du lịch
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Văn hóa', 'Ẩm thực', 'Chụp ảnh sống ảo', 'Nghỉ dưỡng', 'Săn mây & Trekking', 'Biển đảo', 'Mua sắm & Cafe'].map((tag) => {
                    const active = interests.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterest(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          active
                            ? 'bg-[#004D40] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {active ? `✓ ${tag}` : `+ ${tag}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Đi cùng ai?
                </label>
                <select
                  value={companions}
                  onChange={(e) => setCompanions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                >
                  <option value="1 người (Du lịch một mình / Solo)">1 người (Du lịch một mình / Solo)</option>
                  <option value="2 người (Cặp đôi)">2 người (Cặp đôi)</option>
                  <option value="Nhóm bạn trẻ (3-5 người)">Nhóm bạn trẻ (3-5 người)</option>
                  <option value="Gia đình có trẻ em & người lớn tuổi">Gia đình có trẻ em & người lớn tuổi</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-full bg-[#004D40] hover:bg-[#00382E] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                    <span>Gemini AI đang thiết kế lịch trình hoàn hảo...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Tạo Lịch Trình Tự Động</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* AI Plan Results */
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#004D40] uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Lịch trình được thiết kế riêng bởi AI
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900">{planResult.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{planResult.summary}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-slate-700">
                  <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200">⏱️ {planResult.duration}</span>
                  <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200">💰 Ngân sách: {planResult.estimatedBudget}</span>
                </div>
              </div>

              {/* Day by Day Cards */}
              <div className="space-y-4">
                {planResult.days.map((day) => (
                  <div key={day.day} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <h5 className="font-serif font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#004D40] text-white text-xs flex items-center justify-center font-sans font-bold">
                        {day.day}
                      </span>
                      <span>{day.title}</span>
                    </h5>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-600 pl-8">
                      <div>
                        <strong className="text-amber-700">Buổi sáng:</strong> {day.morning}
                      </div>
                      <div>
                        <strong className="text-sky-700">Buổi chiều:</strong> {day.afternoon}
                      </div>
                      <div>
                        <strong className="text-indigo-700">Buổi tối:</strong> {day.evening}
                      </div>
                      {day.foodTips && (
                        <div className="p-2.5 bg-amber-50/60 rounded-xl text-amber-900 mt-2">
                          🍜 <strong>Món ngon gợi ý:</strong> {day.foodTips}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Packing tips */}
              {planResult.packingTips && (
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/60">
                  <h6 className="font-bold text-xs uppercase tracking-wider text-[#004D40] mb-2 flex items-center gap-1.5">
                    <Package className="w-4 h-4" />
                    Hành trang gợi ý nên mang theo
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {planResult.packingTips.map((tip, idx) => (
                      <span key={idx} className="text-xs bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-slate-700 font-medium">
                        ✓ {tip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setPlanResult(null)}
                  className="flex-1 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Tạo lại lịch trình khác
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-[#004D40] hover:bg-[#00382E] text-white rounded-full font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Áp dụng & Đặt vé ngay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
