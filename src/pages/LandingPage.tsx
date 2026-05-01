import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CATEGORY_ICONS, CATEGORIES } from '../types';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setUserRole, currentUser } = useStore();

  const handleSelect = (role: 'visitor' | 'artist') => {
    if (!currentUser) setUserRole(role);
    navigate(role === 'visitor' ? '/visitor' : '/artist');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #FBF8F0 0%, #F0E8D8 40%, #E8DFD0 100%)' }}>
      
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #7B8E6B, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #C4917B, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #C4A265, transparent)' }} />
        {/* Floating botanical ornaments */}
        {CATEGORIES.map((cat, i) => (
          <span key={cat} className="absolute text-xl opacity-10 animate-bounce"
            style={{ left: `${8 + (i * 13) % 82}%`, top: `${5 + (i * 19) % 80}%`, animationDelay: `${i * 0.6}s`, animationDuration: '4s' }}>
            {CATEGORY_ICONS[cat]}
          </span>
        ))}
      </div>

      {/* Ornamental top border */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #D4C5A9, #C4A265, #D4C5A9, transparent)' }} />

      {/* Main Content */}
      <div className="relative z-10 text-center mb-14">
        {/* Decorative top ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C4A265)' }} />
          <span className="text-[#C4A265] text-sm tracking-[0.3em]">✦</span>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(270deg, transparent, #C4A265)' }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-3 tracking-wider"
          style={{ color: '#3D3226' }}>
          心灵图景
        </h1>
        <p className="text-lg md:text-xl tracking-[0.4em] mb-2"
          style={{ color: '#8B7E6F' }}>
          MINDSCAPE
        </p>
        <p className="text-sm tracking-widest" style={{ color: '#A89880' }}>
          探索内心的宇宙 · 发现灵魂的色彩
        </p>

        {/* Decorative bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="w-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4C5A9)' }} />
          <span style={{ color: '#D4C5A9' }}>❧</span>
          <div className="w-24 h-px" style={{ background: 'linear-gradient(270deg, transparent, #D4C5A9)' }} />
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-8 mb-10">
        {/* Visitor Card */}
        <button onClick={() => handleSelect('visitor')}
          className="group w-80 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer text-left mucha-card mucha-corner"
          style={{ background: 'linear-gradient(135deg, #FBF8F0, #F5EDE0)' }}>
          <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center transition-shadow"
            style={{ background: 'linear-gradient(135deg, #A8BCA0, #7B8E6B)', boxShadow: '0 4px 16px rgba(123,142,107,0.2)' }}>
            <span className="text-2xl text-white">✦</span>
          </div>
          <h2 className="text-xl font-bold text-center mb-2" style={{ color: '#3D3226' }}>我是游客</h2>
          <p className="text-sm text-center leading-relaxed mb-4" style={{ color: '#8B7E6F' }}>
            探索趣味心理测试，发现隐藏的自己<br/>收集专属结果与心灵图景
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {Object.entries(CATEGORY_ICONS).slice(0, 5).map(([cat, icon]) => (
              <span key={cat} className="text-sm opacity-60" title={cat}>{icon}</span>
            ))}
            <span className="text-xs self-center" style={{ color: '#A89880' }}>…</span>
          </div>
          <div className="mt-5 text-center">
            <span className="inline-block px-5 py-2 rounded-full text-sm transition-all group-hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #A8BCA0, #7B8E6B)', color: 'white' }}>
              开始探索 →
            </span>
          </div>
        </button>

        {/* Artist Card */}
        <button onClick={() => handleSelect('artist')}
          className="group w-80 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer text-left mucha-card mucha-corner"
          style={{ background: 'linear-gradient(135deg, #FBF8F0, #F5E5D0)' }}>
          <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center transition-shadow"
            style={{ background: 'linear-gradient(135deg, #D4B0A0, #C4917B)', boxShadow: '0 4px 16px rgba(196,145,123,0.2)' }}>
            <span className="text-2xl text-white">❧</span>
          </div>
          <h2 className="text-xl font-bold text-center mb-2" style={{ color: '#3D3226' }}>我是画师共创者</h2>
          <p className="text-sm text-center leading-relaxed mb-4" style={{ color: '#8B7E6F' }}>
            上传你的创意作品<br/>与粉丝共创心理测试，收获M豆
          </p>
          <div className="flex gap-2 justify-center">
            <span className="mucha-tag text-xs">创作</span>
            <span className="mucha-tag text-xs">收获</span>
            <span className="mucha-tag text-xs">互动</span>
          </div>
          <div className="mt-5 text-center">
            <span className="inline-block px-5 py-2 rounded-full text-sm transition-all group-hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #D4B0A0, #C4917B)', color: 'white' }}>
              进入工作台 →
            </span>
          </div>
        </button>
      </div>

      {/* Bottom Info */}
      <p className="relative z-10 text-xs tracking-wider" style={{ color: '#A89880' }}>
        选择身份即可开始探索 · 每日登录获得5颗M豆
      </p>

      <button onClick={() => navigate('/admin')}
        className="relative z-10 mt-5 text-xs transition-colors hover:opacity-70" style={{ color: '#B8A88A' }}>
        管理后台 →
      </button>

      {/* Bottom ornamental border */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #D4C5A9, #C4A265, #D4C5A9, transparent)' }} />
    </div>
  );
}
