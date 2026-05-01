import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Share2, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MOCK_TESTS, CATEGORY_COLORS } from '../data/mockData';
import { CATEGORY_ICONS } from '../types';
import { useState } from 'react';

export default function TestResult() {
  const { testId, resultId } = useParams<{ testId: string; resultId: string }>();
  const navigate = useNavigate();
  const { saveToScape, addMBeans, currentUser } = useStore();
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [liked, setLiked] = useState(false);

  const test = MOCK_TESTS.find(t => t.id === testId);
  const result = test?.results.find(r => r.id === resultId);
  if (!test || !result) return <div className="min-h-screen flex items-center justify-center" style={{ background: '#FBF8F0', color: '#3D3226' }}>结果不存在</div>;

  const handleSave = () => {
    if (!saved) { saveToScape(test.id, result.id); setSaved(true); }
  };

  const handleShare = (platform: string) => {
    if (!shared) { addMBeans(10); setShared(true); }
    alert(`已分享到${platform}！获得10颗M豆 🎉`);
  };

  return (
    <div className="min-h-screen mucha-pattern" style={{ background: '#FBF8F0' }}>
      {/* Header */}
      <div className="mucha-header sticky top-0 z-50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/visitor')} style={{ color: '#6B5E4F' }}><ArrowLeft className="w-5 h-5" /></button>
        <span className="font-medium" style={{ color: '#3D3226' }}>测试结果</span>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Result Card */}
        <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${CATEGORY_COLORS[test.category]} p-[2px] mb-6`}>
          <div className="rounded-[22px] p-8 text-center mucha-corner" style={{ background: '#FBF8F0' }}>
            <div className="text-5xl mb-3">{CATEGORY_ICONS[test.category]}</div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-12 h-px" style={{ background: '#D4C5A9' }} />
              <span style={{ color: '#C4A265' }}>✦</span>
              <div className="w-12 h-px" style={{ background: '#D4C5A9' }} />
            </div>
            <div className="text-xs mb-2" style={{ color: '#A89880' }}>{test.title}</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#3D3226' }}>{result.title}</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B5E4F' }}>{result.description}</p>
            <div className="flex flex-wrap gap-2 justify-center mb-5">
              {result.tags.map(tag => <span key={tag} className="mucha-tag">#{tag}</span>)}
            </div>
            <div className="text-xs" style={{ color: '#A89880' }}>专属性格标签已自动添加到个人主页</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 mb-6">
          <button onClick={handleSave}
            className={`w-full py-3.5 rounded-full flex items-center justify-center gap-2 font-medium transition ${
              saved ? 'mucha-tag-active' : 'mucha-btn'}`}>
            <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            {saved ? '已保存到心灵图景 (+5 M豆)' : '保存到心灵图景 (+5 M豆)'}
          </button>
          <button onClick={() => setLiked(!liked)}
            className={`w-full py-3.5 rounded-full flex items-center justify-center gap-2 font-medium transition ${
              liked ? 'mucha-tag-active' : 'mucha-btn-outline'}`}
            style={liked ? { background: 'linear-gradient(135deg, #D4B0A0, #C4917B)', color: 'white', border: 'none' } : {}}>
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            {liked ? '已点赞' : '点赞'}
          </button>
        </div>

        {/* Share Section */}
        <div className="rounded-2xl p-6 mucha-card">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5" style={{ color: '#7B8E6B' }} />
            <h3 className="font-medium" style={{ color: '#3D3226' }}>分享测试</h3>
            <span className="ml-auto text-sm font-medium" style={{ color: '#C4A265' }}>🫘 +10</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: '微信好友', icon: '💬', bg: '#A8BCA0' },
              { name: '微信群', icon: '👥', bg: '#7B8E6B' },
              { name: '小红书', icon: '📕', bg: '#C4917B' },
              { name: '抖音', icon: '🎵', bg: '#8B7E6F' },
            ].map(platform => (
              <button key={platform.name} onClick={() => handleShare(platform.name)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition hover:opacity-80">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white"
                  style={{ background: platform.bg }}>{platform.icon}</div>
                <span className="text-xs" style={{ color: '#8B7E6F' }}>{platform.name}</span>
              </button>
            ))}
          </div>
          {shared && <div className="mt-3 text-center text-sm" style={{ color: '#C4A265' }}>已获得10颗M豆！分享不设上限，继续分享可继续获得 🫘</div>}
        </div>

        <div className="mt-6 rounded-2xl p-4 text-center mucha-card">
          <div className="text-sm" style={{ color: '#8B7E6F' }}>💡 每天登录获得5颗M豆 · 积攒M豆解锁更多测试和装饰</div>
        </div>
      </div>
    </div>
  );
}
