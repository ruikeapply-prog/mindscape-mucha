import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Eye, Heart, Share2, MessageCircle, User, Image } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MOCK_TESTS } from '../data/mockData';
import type { ArtistSubmission, TestCategory } from '../types';
import { CATEGORIES, CATEGORY_ICONS } from '../types';

export default function ArtistPage() {
  const navigate = useNavigate();
  const { currentUser, updateProfile, addArtistSubmission, artistSubmissions } = useStore();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'submit' | 'profile'>('portfolio');
  const [submitForm, setSubmitForm] = useState({
    testTitle: '', originalLink: '', sourcePlatform: '', testType: 'MBTI专区' as TestCategory,
    isOriginal: true, isAuthorizedForH5: true, contactInfo: '',
  });

  const artistTests = MOCK_TESTS.filter(t => t.isArtistCreated);
  const [comments] = useState([
    { id: 'c1', user: '小鹿', content: '太准了！我的结果是墨染丹青 😍', time: '2小时前' },
    { id: 'c2', user: '星空漫步', content: '画风真的很独特，期待更多作品', time: '5小时前' },
    { id: 'c3', user: '蘑菇酱', content: '分享给朋友了，都说好准！', time: '1天前' },
  ]);
  const [replyText, setReplyText] = useState('');

  const handleSubmit = () => {
    if (!submitForm.testTitle || !submitForm.originalLink || !submitForm.contactInfo) { alert('请填写完整信息'); return; }
    const submission: ArtistSubmission = {
      id: `sub-${Date.now()}`, artistId: currentUser?.id ?? '', artistName: currentUser?.nickname ?? '画师',
      ...submitForm, status: 'pending', createdAt: new Date().toISOString(),
    };
    addArtistSubmission(submission);
    alert('投稿成功！等待审核 🎉');
    setSubmitForm({ testTitle: '', originalLink: '', sourcePlatform: '', testType: 'MBTI专区', isOriginal: true, isAuthorizedForH5: true, contactInfo: '' });
    setActiveTab('portfolio');
  };

  const totalViews = artistTests.reduce((s, t) => s + t.stats.views, 0);
  const totalLikes = artistTests.reduce((s, t) => s + t.stats.likes, 0);
  const totalShares = artistTests.reduce((s, t) => s + t.stats.shares, 0);

  return (
    <div className="min-h-screen mucha-pattern" style={{ background: '#FBF8F0' }}>
      {/* Header */}
      <div className="mucha-header sticky top-0 z-50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/')} style={{ color: '#C4917B' }}><ArrowLeft className="w-5 h-5" /></button>
        <Link to="/" className="text-lg font-bold tracking-wider" style={{ color: '#3D3226' }}>心灵图景</Link>
        <span className="text-xs" style={{ color: '#A89880' }}>画师工作台</span>
        <div className="flex-1" />
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: '#F5EDE0', border: '1px solid #D4C5A9' }}>
          <span className="text-sm">🫘</span>
          <span className="text-sm font-medium" style={{ color: '#C4A265' }}>{currentUser?.mBeans ?? 0}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: <Eye className="w-4 h-4" />, value: totalViews, label: '浏览量', color: '#7B8E6B' },
            { icon: <Heart className="w-4 h-4" />, value: totalLikes, label: '点赞量', color: '#C4917B' },
            { icon: <Share2 className="w-4 h-4" />, value: totalShares, label: '转发量', color: '#7B9E9E' },
            { icon: <MessageCircle className="w-4 h-4" />, value: comments.length, label: '评论', color: '#9B8EB8' },
          ].map(s => (
            <div key={s.label} className="text-center p-3 rounded-xl mucha-card">
              <div className="mx-auto mb-1" style={{ color: s.color }}>{s.icon}</div>
              <div className="font-bold" style={{ color: '#3D3226' }}>{s.value}</div>
              <div className="text-xs" style={{ color: '#A89880' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4" style={{ borderBottom: '1px solid #E8DFC8' }}>
        {[
          { key: 'portfolio' as const, label: '作品集', Icon: Image },
          { key: 'submit' as const, label: '上传作品', Icon: Upload },
          { key: 'profile' as const, label: '个人主页', Icon: User },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition"
            style={{ borderColor: activeTab === tab.key ? '#C4917B' : 'transparent', color: activeTab === tab.key ? '#3D3226' : '#A89880' }}>
            <tab.Icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 pb-20">
        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            {artistTests.map(test => (
              <div key={test.id} className="rounded-2xl mucha-card overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #D4B0A0, #C4917B)' }}>
                    {CATEGORY_ICONS[test.category]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium mb-1 truncate" style={{ color: '#3D3226' }}>{test.title}</h4>
                    <p className="text-xs mb-2 line-clamp-1" style={{ color: '#8B7E6F' }}>{test.description}</p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: '#A89880' }}>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {test.stats.views}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {test.stats.likes}</span>
                      <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> {test.stats.shares}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-3">
                  <div className="pt-3" style={{ borderTop: '1px solid #E8DFC8' }}>
                    <div className="text-xs mb-2" style={{ color: '#A89880' }}>最新评论</div>
                    {comments.slice(0, 2).map(c => (
                      <div key={c.id} className="flex items-start gap-2 mb-2">
                        <span className="text-xs font-medium" style={{ color: '#8B7E6F' }}>{c.user}:</span>
                        <span className="text-xs" style={{ color: '#A89880' }}>{c.content}</span>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <input type="text" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="回复评论..."
                        className="flex-1 px-3 py-1.5 rounded-lg mucha-input text-xs" />
                      <button className="px-3 py-1.5 rounded-lg text-xs" style={{ background: '#F0E8D8', color: '#6B5E4F' }}>回复</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {artistSubmissions.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-3" style={{ color: '#3D3226' }}>投稿记录</h3>
                {artistSubmissions.map(sub => (
                  <div key={sub.id} className="p-3 rounded-xl mucha-card mb-2 flex items-center justify-between">
                    <div>
                      <span className="text-sm" style={{ color: '#3D3226' }}>{sub.testTitle}</span>
                      <span className="text-xs ml-2" style={{ color: '#A89880' }}>来自 {sub.sourcePlatform || '未知'}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: sub.status === 'pending' ? '#F5EDE0' : sub.status === 'approved' ? '#E5F0E0' : '#F5E0E0',
                        color: sub.status === 'pending' ? '#C4A265' : sub.status === 'approved' ? '#7B8E6B' : '#C4917B' }}>
                      {sub.status === 'pending' ? '待审核' : sub.status === 'approved' ? '已通过' : '未通过'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'submit' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl mucha-card" style={{ background: '#F5EDE0' }}>
              <p className="text-sm" style={{ color: '#8B7E6F' }}>上传已有作品链接，审核通过后将在测试广场展示</p>
            </div>
            <input type="text" value={submitForm.testTitle} onChange={e => setSubmitForm({ ...submitForm, testTitle: e.target.value })} placeholder="测试标题" className="w-full px-4 py-3 mucha-input" />
            <input type="text" value={submitForm.originalLink} onChange={e => setSubmitForm({ ...submitForm, originalLink: e.target.value })} placeholder="作品原链接" className="w-full px-4 py-3 mucha-input" />
            <input type="text" value={submitForm.sourcePlatform} onChange={e => setSubmitForm({ ...submitForm, sourcePlatform: e.target.value })} placeholder="来源平台（如：小红书、B站等）" className="w-full px-4 py-3 mucha-input" />
            <div>
              <label className="text-sm mb-2 block" style={{ color: '#8B7E6F' }}>测试类型</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setSubmitForm({ ...submitForm, testType: cat })}
                    className={`px-3 py-1.5 rounded-full text-sm transition ${submitForm.testType === cat ? 'mucha-tag-active' : 'mucha-tag'}`}>
                    {CATEGORY_ICONS[cat]} {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#8B7E6F' }}>
                <input type="checkbox" checked={submitForm.isOriginal} onChange={e => setSubmitForm({ ...submitForm, isOriginal: e.target.checked })} /> 原创作品
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#8B7E6F' }}>
                <input type="checkbox" checked={submitForm.isAuthorizedForH5} onChange={e => setSubmitForm({ ...submitForm, isAuthorizedForH5: e.target.checked })} /> 授权改造成H5
              </label>
            </div>
            <input type="text" value={submitForm.contactInfo} onChange={e => setSubmitForm({ ...submitForm, contactInfo: e.target.value })} placeholder="联系方式（微信/QQ/邮箱）" className="w-full px-4 py-3 mucha-input" />
            <button onClick={handleSubmit} className="mucha-btn-gold w-full py-3.5 rounded-full">提交投稿</button>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="text-center py-6">
              <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #D4B0A0, #C4917B)', border: '4px solid #FBF8F0' }}>🎨</div>
              <h2 className="text-lg font-bold" style={{ color: '#3D3226' }}>{currentUser?.nickname ?? '画师'}</h2>
              <p className="text-sm mt-1" style={{ color: '#A89880' }}>画师共创者 · 作品{artistTests.length}件</p>
            </div>
            <div className="p-4 rounded-xl mucha-card">
              <h3 className="text-sm mb-3" style={{ color: '#8B7E6F' }}>个性化装饰</h3>
              <p className="text-xs mb-2" style={{ color: '#A89880' }}>画师专属个人主页，展示独特风格</p>
              <div className="grid grid-cols-3 gap-2">
                {['🎭', '🖌️', '✨'].map(e => <div key={e} className="p-3 rounded-lg text-center text-2xl" style={{ background: '#F0E8D8' }}>{e}</div>)}
              </div>
            </div>
            <div className="p-4 rounded-xl mucha-card">
              <h3 className="text-sm mb-2" style={{ color: '#8B7E6F' }}>M豆收入</h3>
              <p className="text-xs" style={{ color: '#A89880' }}>游客测试你的作品时，你将被动获得M豆</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-2xl" style={{ color: '#C4A265' }}>🫘</span>
                <span className="text-xl font-bold" style={{ color: '#3D3226' }}>{currentUser?.mBeans ?? 0}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
