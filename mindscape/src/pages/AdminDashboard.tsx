import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trash2, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MOCK_TESTS } from '../data/mockData';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { analyticsEvents, clearAnalytics, clearTestData, artistSubmissions, updateSubmissionStatus } = useStore();
  const [activeModule, setActiveModule] = useState<'overview' | 'tests' | 'users' | 'artists'>('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); };

  const totalViews = MOCK_TESTS.reduce((s, t) => s + t.stats.views, 0);
  const totalLikes = MOCK_TESTS.reduce((s, t) => s + t.stats.likes, 0);
  const totalShares = MOCK_TESTS.reduce((s, t) => s + t.stats.shares, 0);
  const totalCompleted = MOCK_TESTS.reduce((s, t) => s + t.stats.completedCount, 0);
  const totalSaved = MOCK_TESTS.reduce((s, t) => s + t.stats.savedToScapeCount, 0);
  const totalUniqueUsers = 1234;
  const totalArtistSubmissions = artistSubmissions.length;

  const mockUsers = [
    { id: 'U001', weeklyReturns: 5, stayDuration: 45, completedTests: 12, likes: 8, shares: 5, savedCount: 6, preference: 'MBTI专区', activeIndex: 85, tier: '心灵大师' },
    { id: 'U002', weeklyReturns: 2, stayDuration: 20, completedTests: 5, likes: 3, shares: 1, savedCount: 2, preference: '二次元专区', activeIndex: 52, tier: '活跃旅人' },
    { id: 'U003', weeklyReturns: 7, stayDuration: 68, completedTests: 18, likes: 15, shares: 10, savedCount: 12, preference: '塔罗占星', activeIndex: 95, tier: '图景领主' },
    { id: 'U004', weeklyReturns: 1, stayDuration: 10, completedTests: 2, likes: 1, shares: 0, savedCount: 1, preference: 'oc专区', activeIndex: 25, tier: '新手探索者' },
    { id: 'U005', weeklyReturns: 3, stayDuration: 35, completedTests: 8, likes: 6, shares: 3, savedCount: 4, preference: '美学人格', activeIndex: 68, tier: '活跃旅人' },
    { id: 'U006', weeklyReturns: 4, stayDuration: 42, completedTests: 10, likes: 7, shares: 4, savedCount: 5, preference: '生辰五行', activeIndex: 72, tier: '心灵大师' },
  ];

  const exportCSV = (data: Record<string, unknown>[], filename: string) => {
    if (data.length === 0) { alert('暂无数据'); return; }
    const headers = Object.keys(data[0]);
    const csv = [headers.join(','), ...data.map(row => headers.map(h => { const val = row[h]; const str = String(val ?? ''); return str.includes(',') ? `"${str}"` : str; }).join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${filename}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportAnalyticsCSV = () => {
    const data = analyticsEvents.length > 0 ? analyticsEvents.map(e => ({ id: e.id, userId: e.userId, eventType: e.eventType, testId: e.testId ?? '', value: e.value ?? '', timestamp: e.timestamp })) : [{ id: '1', userId: 'U001', eventType: 'page_view', testId: '', value: '', timestamp: new Date().toISOString() }];
    exportCSV(data as unknown as Record<string, unknown>[], 'analytics_events');
  };
  const exportUsersCSV = () => { exportCSV(mockUsers as unknown as Record<string, unknown>[], 'user_data'); };
  const exportArtistsCSV = () => {
    const data = artistSubmissions.length > 0 ? artistSubmissions : [{ id: '1', artistName: '星辰', testTitle: '你的画中灵魂', originalLink: 'https://example.com', sourcePlatform: '小红书', testType: '画师共创', isOriginal: true, isAuthorizedForH5: true, contactInfo: 'wechat_xingchen', status: 'pending' }];
    exportCSV(data as unknown as Record<string, unknown>[], 'artist_submissions');
  };

  const thStyle: React.CSSProperties = { color: '#8B7E6F', fontWeight: 500, fontSize: '0.75rem', textAlign: 'left', padding: '10px 8px', borderBottom: '1px solid #E8DFC8' };
  const tdStyle: React.CSSProperties = { color: '#3D3226', fontSize: '0.8rem', padding: '10px 8px', borderBottom: '1px solid #F0E8D8' };
  const tdRight: React.CSSProperties = { ...tdStyle, textAlign: 'right' };

  return (
    <div className="min-h-screen" style={{ background: '#FBF8F0' }}>
      {/* Header */}
      <div className="mucha-header sticky top-0 z-50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/')} style={{ color: '#7B8E6B' }}><ArrowLeft className="w-5 h-5" /></button>
        <span className="font-bold" style={{ color: '#3D3226' }}>管理后台</span>
        <div className="flex-1" />
        <button onClick={handleRefresh} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm"
          style={{ background: '#E5F0E0', color: '#7B8E6B' }}>
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} /> 刷新
        </button>
        <button onClick={() => { if (confirm('确定清空测试数据？')) clearTestData(); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm"
          style={{ background: '#F5E0E0', color: '#C4917B' }}>
          <Trash2 className="w-3.5 h-3.5" /> 清空测试数据
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 mt-4" style={{ borderBottom: '1px solid #E8DFC8' }}>
        {[
          { key: 'overview' as const, label: '数据总览' },
          { key: 'tests' as const, label: '测试数据' },
          { key: 'users' as const, label: '用户数据' },
          { key: 'artists' as const, label: '画师投稿池' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveModule(tab.key)}
            className="px-4 py-2.5 text-sm font-medium border-b-2 transition"
            style={{ borderColor: activeModule === tab.key ? '#7B8E6B' : 'transparent', color: activeModule === tab.key ? '#3D3226' : '#A89880' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-6 pb-20">
        {/* Overview */}
        {activeModule === 'overview' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: '👁️', label: '总浏览量', value: totalViews.toLocaleString() },
                { icon: '👤', label: '总独立用户数', value: totalUniqueUsers.toLocaleString() },
                { icon: '❤️', label: '总点赞量', value: totalLikes.toLocaleString() },
                { icon: '🔗', label: '总分享量', value: totalShares.toLocaleString() },
                { icon: '✅', label: '总完成测试数', value: totalCompleted.toLocaleString() },
                { icon: '💎', label: '总加入心理图景数', value: totalSaved.toLocaleString() },
                { icon: '🎨', label: '总画师投稿数', value: totalArtistSubmissions.toString() },
                { icon: '📊', label: '分析事件数', value: analyticsEvents.length.toString() },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-xl mucha-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-xs" style={{ color: '#A89880' }}>{s.label}</span>
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#3D3226' }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: '导出 Analytics Events CSV', action: exportAnalyticsCSV, color: '#7B8E6B', bg: '#E5F0E0' },
                { label: '导出用户数据 CSV', action: exportUsersCSV, color: '#6B8E9E', bg: '#E0ECF0' },
                { label: '导出画师投稿 CSV', action: exportArtistsCSV, color: '#C4A265', bg: '#F0E8D0' },
              ].map(btn => (
                <button key={btn.label} onClick={btn.action}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm" style={{ background: btn.bg, color: btn.color }}>
                  <Download className="w-4 h-4" /> {btn.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tests */}
        {activeModule === 'tests' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead><tr>
                <th style={thStyle}>测试名称</th><th style={thStyle}>分类</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>浏览量</th><th style={{ ...thStyle, textAlign: 'right' }}>点赞量</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>分享量</th><th style={{ ...thStyle, textAlign: 'right' }}>开始人数</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>完成人数</th><th style={{ ...thStyle, textAlign: 'right' }}>完成率</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>加入图景</th><th style={{ ...thStyle, textAlign: 'right' }}>分享回流</th>
              </tr></thead>
              <tbody>
                {MOCK_TESTS.map(test => (
                  <tr key={test.id} className="hover:opacity-80 transition">
                    <td style={tdStyle}>{test.title}</td>
                    <td style={{ ...tdStyle, color: '#8B7E6F' }}>{test.category}</td>
                    <td style={tdRight}>{test.stats.views.toLocaleString()}</td>
                    <td style={tdRight}>{test.stats.likes.toLocaleString()}</td>
                    <td style={tdRight}>{test.stats.shares.toLocaleString()}</td>
                    <td style={tdRight}>{test.stats.startedCount.toLocaleString()}</td>
                    <td style={tdRight}>{test.stats.completedCount.toLocaleString()}</td>
                    <td style={{ ...tdRight, color: '#7B8E6B' }}>{((test.stats.completedCount / test.stats.startedCount) * 100).toFixed(1)}%</td>
                    <td style={tdRight}>{test.stats.savedToScapeCount.toLocaleString()}</td>
                    <td style={tdRight}>{test.stats.shareBackCount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users */}
        {activeModule === 'users' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={exportUsersCSV} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm"
                style={{ background: '#E0ECF0', color: '#6B8E9E' }}>
                <Download className="w-4 h-4" /> 导出用户数据 CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead><tr>
                  <th style={thStyle}>用户ID</th><th style={{ ...thStyle, textAlign: 'right' }}>一周返回</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>停留时长</th><th style={{ ...thStyle, textAlign: 'right' }}>完成测试</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>点赞</th><th style={{ ...thStyle, textAlign: 'right' }}>分享</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>加入图景</th><th style={thStyle}>主要偏好</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>活跃指数</th><th style={thStyle}>用户分层</th>
                </tr></thead>
                <tbody>
                  {mockUsers.map(user => (
                    <tr key={user.id} className="hover:opacity-80 transition">
                      <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.7rem' }}>{user.id}</td>
                      <td style={tdRight}>{user.weeklyReturns}</td>
                      <td style={tdRight}>{user.stayDuration}分</td>
                      <td style={tdRight}>{user.completedTests}</td>
                      <td style={tdRight}>{user.likes}</td>
                      <td style={tdRight}>{user.shares}</td>
                      <td style={tdRight}>{user.savedCount}</td>
                      <td style={{ ...tdStyle, color: '#8B7E6F' }}>{user.preference}</td>
                      <td style={{ ...tdRight, fontWeight: 600, color: user.activeIndex >= 80 ? '#7B8E6B' : user.activeIndex >= 50 ? '#C4A265' : '#C4917B' }}>{user.activeIndex}</td>
                      <td style={tdStyle}>
                        <span className="px-2 py-0.5 rounded-full text-xs"
                          style={{ background: user.tier === '图景领主' ? '#E5E0F0' : user.tier === '心灵大师' ? '#E5F0E0' : user.tier === '活跃旅人' ? '#F0E8D0' : '#F0E8D8',
                            color: user.tier === '图景领主' ? '#9B8EB8' : user.tier === '心灵大师' ? '#7B8E6B' : user.tier === '活跃旅人' ? '#C4A265' : '#8B7E6F' }}>
                          {user.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Artists */}
        {activeModule === 'artists' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={exportArtistsCSV} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm"
                style={{ background: '#F0E8D0', color: '#C4A265' }}>
                <Download className="w-4 h-4" /> 导出画师投稿 CSV
              </button>
            </div>
            {artistSubmissions.length === 0 ? (
              <div className="text-center py-12" style={{ color: '#A89880' }}>
                <div className="text-4xl mb-3">📬</div>
                <p>暂无画师投稿</p>
                <p className="text-xs mt-1">画师提交作品后将在此展示</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={thStyle}>画师昵称</th><th style={thStyle}>测试标题</th><th style={thStyle}>原链接</th>
                    <th style={thStyle}>来源平台</th><th style={thStyle}>测试类型</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>原创</th><th style={{ ...thStyle, textAlign: 'center' }}>授权H5</th>
                    <th style={thStyle}>联系方式</th><th style={{ ...thStyle, textAlign: 'center' }}>状态</th><th style={{ ...thStyle, textAlign: 'center' }}>操作</th>
                  </tr></thead>
                  <tbody>
                    {artistSubmissions.map(sub => (
                      <tr key={sub.id} className="hover:opacity-80 transition">
                        <td style={tdStyle}>{sub.artistName}</td>
                        <td style={tdStyle}>{sub.testTitle}</td>
                        <td style={{ ...tdStyle, fontSize: '0.7rem', color: '#6B8E9E', maxWidth: 120 }} className="truncate">{sub.originalLink}</td>
                        <td style={{ ...tdStyle, color: '#8B7E6F' }}>{sub.sourcePlatform}</td>
                        <td style={{ ...tdStyle, color: '#8B7E6F' }}>{sub.testType}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>{sub.isOriginal ? '✅' : '❌'}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>{sub.isAuthorizedForH5 ? '✅' : '❌'}</td>
                        <td style={{ ...tdStyle, fontSize: '0.7rem' }}>{sub.contactInfo}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          <span className="px-2 py-0.5 rounded-full text-xs"
                            style={{ background: sub.status === 'pending' ? '#F0E8D0' : sub.status === 'approved' ? '#E5F0E0' : '#F5E0E0',
                              color: sub.status === 'pending' ? '#C4A265' : sub.status === 'approved' ? '#7B8E6B' : '#C4917B' }}>
                            {sub.status === 'pending' ? '待审核' : sub.status === 'approved' ? '已通过' : '未通过'}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          {sub.status === 'pending' && (
                            <div className="flex gap-1 justify-center">
                              <button onClick={() => updateSubmissionStatus(sub.id, 'approved')} className="px-2 py-1 rounded text-xs" style={{ background: '#E5F0E0', color: '#7B8E6B' }}>通过</button>
                              <button onClick={() => updateSubmissionStatus(sub.id, 'rejected')} className="px-2 py-1 rounded text-xs" style={{ background: '#F5E0E0', color: '#C4917B' }}>拒绝</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
