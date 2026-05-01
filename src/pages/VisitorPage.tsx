import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CATEGORIES, CATEGORY_ICONS, type TestCategory } from '../types';
import { MOCK_TESTS, CATEGORY_COLORS } from '../data/mockData';
import TestCard from '../components/TestCard';

export default function VisitorPage() {
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, checkDailyLogin } = useStore();
  const navigate = useNavigate();

  useEffect(() => { checkDailyLogin(); }, [checkDailyLogin]);

  const filteredTests = MOCK_TESTS.filter(test => {
    const matchCategory = selectedCategory === 'all' || test.category === selectedCategory;
    const matchSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen mucha-pattern" style={{ background: '#FBF8F0' }}>
      {/* Header */}
      <header className="mucha-header sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-wider" style={{ color: '#3D3226' }}>
            心灵图景
          </Link>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#A89880' }} />
              <input type="text" placeholder="搜索测试..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full mucha-input text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: '#F5EDE0', border: '1px solid #D4C5A9' }}>
              <span className="text-sm">🫘</span>
              <span className="text-sm font-medium" style={{ color: '#C4A265' }}>{currentUser?.mBeans ?? 0}</span>
            </div>
            <button onClick={() => navigate('/visitor/create')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-sm mucha-btn-outline">
              <Star className="w-3.5 h-3.5" /> 创作测试
            </button>
            <button onClick={() => navigate('/visitor/profile')}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #A8BCA0, #7B8E6B)' }}>
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 p-8 mucha-card mucha-corner"
          style={{ background: 'linear-gradient(135deg, #F5EDE0, #F0E5D5)' }}>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#3D3226' }}>
              探索你的内心世界 ✦
            </h2>
            <p className="text-sm mb-4 max-w-lg" style={{ color: '#8B7E6F' }}>
              完成测试获得结果卡 → 保存到心灵图景 → 获得5颗M豆 → 分享获得更多M豆
            </p>
            <div className="flex items-center gap-3">
              <div className="mucha-tag flex items-center gap-1.5">📋 {currentUser?.completedTests.length ?? 0} 已完成</div>
              <div className="mucha-tag flex items-center gap-1.5">💎 {currentUser?.savedResults.length ?? 0} 已收藏</div>
            </div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl opacity-10">🔮</div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold" style={{ color: '#3D3226' }}>分类探索</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => setSelectedCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all' ? 'mucha-tag-active' : 'mucha-tag'}`}>
              全部
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${selectedCategory === cat ? 'mucha-tag-active' : 'mucha-tag'}`}>
                <span>{CATEGORY_ICONS[cat]}</span> {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Test Grid */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-4" style={{ color: '#3D3226' }}>
            {selectedCategory === 'all' ? '全部测试' : selectedCategory}
            <span className="text-xs ml-2" style={{ color: '#A89880' }}>({filteredTests.length})</span>
          </h3>
          {filteredTests.length === 0 ? (
            <div className="text-center py-12" style={{ color: '#A89880' }}>
              <div className="text-4xl mb-3">🔍</div>
              <p>暂无此分类的测试</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTests.map(test => <TestCard key={test.id} test={test} />)}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button onClick={() => navigate('/visitor/create')}
            className="p-5 rounded-2xl text-left transition mucha-card hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #FBF8F0, #F5E5D0)' }}>
            <div className="text-2xl mb-2">✎</div>
            <h4 className="font-medium mb-1" style={{ color: '#3D3226' }}>创作测试</h4>
            <p className="text-xs" style={{ color: '#8B7E6F' }}>使用模板创建你的专属测试</p>
          </button>
          <button onClick={() => navigate('/visitor/profile')}
            className="p-5 rounded-2xl text-left transition mucha-card hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #FBF8F0, #EDE5D8)' }}>
            <div className="text-2xl mb-2">❧</div>
            <h4 className="font-medium mb-1" style={{ color: '#3D3226' }}>个人主页</h4>
            <p className="text-xs" style={{ color: '#8B7E6F' }}>装饰你的心灵空间</p>
          </button>
        </div>
      </main>
    </div>
  );
}
