import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MOCK_TEMPLATES, CATEGORY_COLORS } from '../data/mockData';
import { CATEGORIES, CATEGORY_ICONS, type TestCategory } from '../types';

export default function CreateTest() {
  const navigate = useNavigate();
  const { currentUser, spendMBeans, addMBeans } = useStore();
  const [step, setStep] = useState<'select_template' | 'edit'>('select_template');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TestCategory>('MBTI专区');
  const [questions, setQuestions] = useState([
    { id: 'q1', text: '', options: [{ label: '', value: 'a' }, { label: '', value: 'b' }, { label: '', value: 'c' }, { label: '', value: 'd' }] },
  ]);
  const [results, setResults] = useState([{ id: 'r1', title: '', description: '', tags: [''] }]);
  const [shareCount, setShareCount] = useState(0);

  const handleSelectTemplate = (templateId: string) => {
    const tpl = MOCK_TEMPLATES.find(t => t.id === templateId);
    if (!tpl) return;
    if ((currentUser?.mBeans ?? 0) < tpl.mBeanCost) { alert('M豆不足，无法解锁此模板！'); return; }
    spendMBeans(tpl.mBeanCost);
    setSelectedTemplate(templateId);
    setCategory(tpl.category);
    const qs = Array.from({ length: tpl.questionCount }, (_, i) => ({
      id: `q${i + 1}`, text: '',
      options: [{ label: '', value: 'a' }, { label: '', value: 'b' }, { label: '', value: 'c' }, { label: '', value: 'd' }],
    }));
    setQuestions(qs);
    setStep('edit');
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: `q${questions.length + 1}`, text: '', options: [{ label: '', value: 'a' }, { label: '', value: 'b' }, { label: '', value: 'c' }, { label: '', value: 'd' }] }]);
  };
  const removeQuestion = (idx: number) => { if (questions.length <= 1) return; setQuestions(questions.filter((_, i) => i !== idx)); };
  const updateQuestion = (idx: number, text: string) => { const u = [...questions]; u[idx] = { ...u[idx], text }; setQuestions(u); };
  const updateOption = (qIdx: number, oIdx: number, label: string) => {
    const u = [...questions]; u[qIdx] = { ...u[qIdx], options: u[qIdx].options.map((o, i) => i === oIdx ? { ...o, label } : o) }; setQuestions(u);
  };
  const addResult = () => { setResults([...results, { id: `r${results.length + 1}`, title: '', description: '', tags: [''] }]); };
  const updateResult = (idx: number, field: string, value: string) => { const u = [...results]; u[idx] = { ...u[idx], [field]: value }; setResults(u); };
  const handleShare = () => { addMBeans(5); setShareCount(shareCount + 1); alert(`分享成功！获得5颗M豆 🫘 (已分享${shareCount + 1}次)`); };
  const handlePublish = () => { if (!title.trim()) { alert('请输入测试标题'); return; } alert('测试创建成功！已发布到测试广场 🎉'); navigate('/visitor'); };

  if (step === 'select_template') {
    return (
      <div className="min-h-screen mucha-pattern" style={{ background: '#FBF8F0' }}>
        <div className="mucha-header sticky top-0 z-50 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} style={{ color: '#6B5E4F' }}><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-medium" style={{ color: '#3D3226' }}>选择模板创作测试</span>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="mb-6 p-4 rounded-xl mucha-card" style={{ background: '#F5EDE0' }}>
            <p className="text-sm" style={{ color: '#8B7E6F' }}>💡 使用模板创作测试需要花费M豆解锁。你当前拥有 <span className="font-medium" style={{ color: '#C4A265' }}>{currentUser?.mBeans ?? 0} 🫘</span></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_TEMPLATES.map(tpl => (
              <button key={tpl.id} onClick={() => handleSelectTemplate(tpl.id)}
                className="text-left p-5 rounded-2xl transition mucha-card hover:shadow-md group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{CATEGORY_ICONS[tpl.category]}</span>
                  <span className="mucha-tag text-xs">{tpl.category}</span>
                </div>
                <h4 className="font-medium mb-2 group-hover:opacity-80 transition" style={{ color: '#3D3226' }}>{tpl.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#A89880' }}>{tpl.questionCount}题</span>
                  <span className="text-sm font-medium" style={{ color: '#C4A265' }}>🫘 {tpl.mBeanCost}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-2xl text-center mucha-card" style={{ background: '#F5EDE0' }}>
            <p className="text-sm mb-2" style={{ color: '#8B7E6F' }}>更多模板即将推出...</p>
            <p className="text-xs" style={{ color: '#A89880' }}>分享你创作的测试给朋友，每次获得5颗M豆（不设上限）</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mucha-pattern" style={{ background: '#FBF8F0' }}>
      <div className="mucha-header sticky top-0 z-50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setStep('select_template')} style={{ color: '#6B5E4F' }}><ArrowLeft className="w-5 h-5" /></button>
        <span className="font-medium" style={{ color: '#3D3226' }}>编辑测试</span>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold" style={{ color: '#3D3226' }}>基本信息</h3>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="测试标题" className="w-full px-4 py-3 mucha-input" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="测试描述" rows={2} className="w-full px-4 py-3 mucha-input resize-none" />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 transition ${category === cat ? 'mucha-tag-active' : 'mucha-tag'}`}>
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: '#3D3226' }}>题目</h3>
            <button onClick={addQuestion} className="flex items-center gap-1 text-sm" style={{ color: '#7B8E6B' }}><Plus className="w-4 h-4" /> 添加题目</button>
          </div>
          {questions.map((q, qIdx) => (
            <div key={q.id} className="p-4 rounded-xl mucha-card space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: '#A89880' }}>Q{qIdx + 1}</span>
                <input type="text" value={q.text} onChange={e => updateQuestion(qIdx, e.target.value)} placeholder="题目内容"
                  className="flex-1 px-3 py-2 rounded-lg mucha-input text-sm" />
                {questions.length > 1 && <button onClick={() => removeQuestion(qIdx)} style={{ color: '#C4917B' }}><Trash2 className="w-4 h-4" /></button>}
              </div>
              {q.options.map((opt, oIdx) => (
                <input key={opt.value} type="text" value={opt.label} onChange={e => updateOption(qIdx, oIdx, e.target.value)}
                  placeholder={`选项 ${String.fromCharCode(65 + oIdx)}`} className="w-full px-3 py-2 rounded-lg mucha-input text-sm" style={{ color: '#6B5E4F' }} />
              ))}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: '#3D3226' }}>结果设定</h3>
            <button onClick={addResult} className="flex items-center gap-1 text-sm" style={{ color: '#7B8E6B' }}><Plus className="w-4 h-4" /> 添加结果</button>
          </div>
          {results.map((r, rIdx) => (
            <div key={r.id} className="p-4 rounded-xl mucha-card space-y-3">
              <input type="text" value={r.title} onChange={e => updateResult(rIdx, 'title', e.target.value)} placeholder="结果标题" className="w-full px-3 py-2 mucha-input text-sm" />
              <textarea value={r.description} onChange={e => updateResult(rIdx, 'description', e.target.value)} placeholder="结果描述" rows={2} className="w-full px-3 py-2 mucha-input text-sm resize-none" />
            </div>
          ))}
        </div>
        <div className="space-y-3 pb-8">
          <button onClick={handlePublish} className="mucha-btn w-full py-3.5">发布测试</button>
          <button onClick={handleShare} className="mucha-btn-gold w-full py-3.5 rounded-full flex items-center justify-center gap-2">
            分享给朋友 (+5 M豆) · 已分享{shareCount}次
          </button>
        </div>
      </div>
    </div>
  );
}
