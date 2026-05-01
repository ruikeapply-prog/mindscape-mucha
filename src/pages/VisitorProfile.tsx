import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Tag, ShoppingBag, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MOCK_DECORATIONS } from '../data/mockData';
import { useState } from 'react';

export default function VisitorProfile() {
  const navigate = useNavigate();
  const { currentUser, updateProfile, spendMBeans } = useStore();
  const [activeTab, setActiveTab] = useState<'results' | 'decorations' | 'shop'>('results');
  const [editingNickname, setEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(currentUser?.nickname ?? '');

  if (!currentUser) return <div className="min-h-screen flex items-center justify-center" style={{ background: '#FBF8F0', color: '#3D3226' }}>请先选择身份</div>;

  const handleSaveNickname = () => { updateProfile({ nickname }); setEditingNickname(false); };
  const handleBuyDecoration = (id: string, cost: number) => {
    if (spendMBeans(cost)) { updateProfile({ decorations: [...currentUser.decorations, id] }); alert('购买成功！'); }
    else alert('M豆不足！');
  };

  return (
    <div className="min-h-screen mucha-pattern" style={{ background: '#FBF8F0' }}>
      <div className="mucha-header sticky top-0 z-50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} style={{ color: '#6B5E4F' }}><ArrowLeft className="w-5 h-5" /></button>
        <span className="font-medium" style={{ color: '#3D3226' }}>个人主页</span>
      </div>

      {/* Profile Header */}
      <div className="relative">
        <div className="h-36 relative" style={{ background: 'linear-gradient(135deg, #E8DFC8, #D4C5A9, #C4A265)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)' }} />
          <button className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.5)', color: '#6B5E4F' }}>更换封面</button>
        </div>
        <div className="relative -mt-12 px-4">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl border-4 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #A8BCA0, #7B8E6B)', borderColor: '#FBF8F0' }}>
              {currentUser.avatar}
            </div>
            <div className="flex-1 pb-2">
              {editingNickname ? (
                <div className="flex items-center gap-2">
                  <input type="text" value={nickname} onChange={e => setNickname(e.target.value)}
                    className="px-2 py-1 rounded mucha-input text-sm" autoFocus />
                  <button onClick={handleSaveNickname} className="text-xs" style={{ color: '#7B8E6B' }}>保存</button>
                </div>
              ) : (
                <h2 className="text-lg font-bold cursor-pointer hover:opacity-70 transition" style={{ color: '#3D3226' }}
                  onClick={() => setEditingNickname(true)}>
                  {currentUser.nickname} <span className="text-xs" style={{ color: '#A89880' }}>✏️</span>
                </h2>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm" style={{ color: '#C4A265' }}>🫘 {currentUser.mBeans}</span>
                <span className="text-xs" style={{ color: '#D4C5A9' }}>|</span>
                <span className="text-xs" style={{ color: '#A89880' }}>{currentUser.tier}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personality Tags */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4" style={{ color: '#A89880' }} />
          <span className="text-sm" style={{ color: '#8B7E6F' }}>性格标签</span>
        </div>
        {currentUser.personalityTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {currentUser.personalityTags.map(tag => <span key={tag} className="mucha-tag">#{tag}</span>)}
          </div>
        ) : (
          <p className="text-xs" style={{ color: '#A89880' }}>完成测试后将自动生成性格标签</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 mt-6">
        {[
          { label: '完成测试', value: currentUser.completedTests.length },
          { label: '心灵图景', value: currentUser.savedResults.length },
          { label: '分享次数', value: currentUser.shareCount },
        ].map(s => (
          <div key={s.label} className="text-center p-3 rounded-xl mucha-card">
            <div className="text-lg font-bold" style={{ color: '#3D3226' }}>{s.value}</div>
            <div className="text-xs" style={{ color: '#A89880' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 mt-6" style={{ borderBottom: '1px solid #E8DFC8' }}>
        {[
          { key: 'results' as const, label: '心灵图景', Icon: Bookmark },
          { key: 'decorations' as const, label: '我的装饰', Icon: Settings },
          { key: 'shop' as const, label: '装饰商店', Icon: ShoppingBag },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition"
            style={{ borderColor: activeTab === tab.key ? '#7B8E6B' : 'transparent', color: activeTab === tab.key ? '#3D3226' : '#A89880' }}>
            <tab.Icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 pb-20">
        {activeTab === 'results' && (
          currentUser.savedResults.length === 0 ? (
            <div className="text-center py-12" style={{ color: '#A89880' }}>
              <div className="text-4xl mb-3">💎</div>
              <p>还没有保存的测试结果</p>
              <p className="text-xs mt-1">完成测试后保存到这里</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {currentUser.savedResults.map(result => (
                <div key={`${result.testId}-${result.resultId}`}
                  className="p-4 rounded-xl mucha-card cursor-pointer hover:shadow-md transition"
                  onClick={() => navigate(`/visitor/result/${result.testId}/${result.resultId}`)}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium" style={{ color: '#3D3226' }}>{result.resultTitle}</h4>
                    <span className="text-xs" style={{ color: '#A89880' }}>{new Date(result.savedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: '#8B7E6F' }}>{result.description}</p>
                  <div className="flex gap-1.5 mt-2">
                    {result.tags.map(tag => <span key={tag} className="text-xs" style={{ color: '#A89880' }}>#{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'decorations' && (
          currentUser.decorations.length === 0 ? (
            <div className="text-center py-12" style={{ color: '#A89880' }}>
              <div className="text-4xl mb-3">🌿</div>
              <p>还没有装饰组件</p>
              <p className="text-xs mt-1">去装饰商店选购吧</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {currentUser.decorations.map(decId => {
                const dec = MOCK_DECORATIONS.find(d => d.id === decId);
                return dec ? (
                  <div key={decId} className="p-3 rounded-xl mucha-card text-center">
                    <div className="text-3xl mb-1">{dec.imageUrl}</div>
                    <div className="text-xs" style={{ color: '#3D3226' }}>{dec.name}</div>
                  </div>
                ) : null;
              })}
            </div>
          )
        )}

        {activeTab === 'shop' && (
          <div className="grid grid-cols-2 gap-3">
            {MOCK_DECORATIONS.map(dec => {
              const owned = currentUser.decorations.includes(dec.id);
              return (
                <div key={dec.id} className="p-4 rounded-xl mucha-card text-center">
                  <div className="text-4xl mb-2">{dec.imageUrl}</div>
                  <h4 className="text-sm font-medium mb-1" style={{ color: '#3D3226' }}>{dec.name}</h4>
                  <div className="text-xs mb-2" style={{ color: '#A89880' }}>{dec.type === 'avatar_frame' ? '头像框' : dec.type === 'cover_bg' ? '封面背景' : '徽章'}</div>
                  {owned ? <span className="text-xs" style={{ color: '#7B8E6B' }}>已拥有</span> : (
                    <button onClick={() => handleBuyDecoration(dec.id, dec.mBeanCost)}
                      className="px-3 py-1 rounded-full text-xs" style={{ background: '#F5EDE0', color: '#C4A265', border: '1px solid #D4C5A9' }}>
                      🫘 {dec.mBeanCost}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
