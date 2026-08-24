import React from 'react';
import { Compass, Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'destinations' | 'transports' | 'hotels' | 'my-trips') => void;
  onOpenAIPlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAIPlanner }) => {
  return (
    <footer className="bg-[#FAF9F5] border-t border-slate-200/80 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200/80">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#004D40] text-white flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold font-serif text-slate-900">VietWander</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Nền tảng du lịch tinh tế, tối giản. Mang lại trải nghiệm khám phá, đặt vé máy bay, đặt phòng khách sạn và lịch trình AI nhanh chóng, an tâm.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-base mb-3">Khám Phá</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button onClick={() => onSelectTab('destinations')} className="hover:text-[#004D40] cursor-pointer">
                  Điểm đến miền Bắc (Sa Pa, Hà Giang)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('destinations')} className="hover:text-[#004D40] cursor-pointer">
                  Điểm đến miền Trung (Hội An, Đà Nẵng)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('destinations')} className="hover:text-[#004D40] cursor-pointer">
                  Điểm đến miền Nam (Phú Quốc, Côn Đảo)
                </button>
              </li>
              <li>
                <button onClick={onOpenAIPlanner} className="text-[#004D40] font-semibold hover:underline cursor-pointer">
                  ✨ Lập lịch trình du lịch AI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-base mb-3">Dịch Vụ</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button onClick={() => onSelectTab('transports')} className="hover:text-[#004D40] cursor-pointer">
                  Vé máy bay nội địa & quốc tế
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('transports')} className="hover:text-[#004D40] cursor-pointer">
                  Xe Limousine cao cấp
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('hotels')} className="hover:text-[#004D40] cursor-pointer">
                  Khách sạn & Resort 4-5 sao
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('my-trips')} className="hover:text-[#004D40] cursor-pointer">
                  Tra cứu vé & hóa đơn điện tử
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-base mb-3">Hỗ Trợ 24/7</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#004D40]" />
                <span>Hotline: 1900 6868</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#004D40]" />
                <span>support@vietwander.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#004D40]" />
                <span>Bảo hiểm chuyến đi tiêu chuẩn</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 VietWander. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-1">
            Được chế tác với phong cách tối giản & tinh tế
          </p>
        </div>
      </div>
    </footer>
  );
};
