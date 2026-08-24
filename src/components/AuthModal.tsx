import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Check, ShieldCheck, Compass } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess
}) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      fullName: isLogin ? (fullName || 'Nguyễn Hà My') : fullName,
      email: email,
      phone: phone || '0987654321',
      avatar: selectedAvatar,
      savedDestinations: ['hoi-an', 'sapa'],
      createdAt: new Date().toISOString()
    };

    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickLogin = (demoName: string, demoEmail: string) => {
    const user: UserProfile = {
      id: 'usr_demo',
      fullName: demoName,
      email: demoEmail,
      phone: '0912345678',
      avatar: selectedAvatar,
      savedDestinations: ['hoi-an', 'da-nang'],
      createdAt: new Date().toISOString()
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative bg-white w-full max-w-md rounded-[28px] shadow-2xl overflow-hidden border border-slate-100 p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#004D40] text-white flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-xl text-slate-900">VietWander</span>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#FAF9F5] p-1 rounded-full border border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
              isLogin ? 'bg-[#004D40] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
              !isLogin ? 'bg-[#004D40] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đăng ký tài khoản
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Hà My"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                    required={!isLogin}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="traveler@vietwander.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#004D40]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#004D40] hover:bg-[#00382E] text-white font-bold rounded-full text-sm shadow-xs hover:shadow-md transition-all cursor-pointer mt-2"
          >
            {isLogin ? 'Đăng Nhập Ngay' : 'Hoàn Tất Đăng Ký'}
          </button>
        </form>

        {/* Quick Demo Fill Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 mb-2">Hoặc đăng nhập nhanh bằng tài khoản thử nghiệm:</p>
          <button
            type="button"
            onClick={() => handleQuickLogin('Lê Thu Trang', 'thutrang@vietwander.vn')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            Đăng nhập tài khoản mẫu (Lê Thu Trang)
          </button>
        </div>
      </div>
    </div>
  );
};
