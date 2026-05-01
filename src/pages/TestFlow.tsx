import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MOCK_TESTS, CATEGORY_COLORS } from '../data/mockData';
import { CATEGORY_ICONS } from '../types';

export default function TestFlow() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { completeTest, currentUser, spendMBeans } = useStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const test = MOCK_TESTS.find(t => t.id === testId);
  if (!test) return <div className="min-h-screen flex items-center justify-center" style={{ background: '#FBF8F0', color: '#3D3226' }}>测试不存在</div>;

  if (test.mBeanCost > 0 && (currentUser?.mBeans ?? 0) < test.mBeanCost) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: '#FBF8F0' }}>
        <div className="text-5xl mb-4">🫘</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#3D3226' }}>M豆不足</h2>
        <p className="text-sm mb-6" style={{ color: '#8B7E6F' }}>此测试需要 {test.mBeanCost} M豆，你只有 {currentUser?.mBeans ?? 0} M豆</p>
        <button onClick={() => navigate(-1)} className="mucha-btn">返回</button>
      </div>
    );
  }

  const question = test.questions[currentQ];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    if (currentQ < test.questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      if (test.mBeanCost > 0) spendMBeans(test.mBeanCost);
      setTimeout(() => setShowResult(true), 500);
    }
  };

  const calculateResult = () => {
    const values = Object.values(answers);
    return test.results[values.length % test.results.length];
  };

  if (showResult) {
    const result = calculateResult();
    completeTest(test.id, result.id);

    return (
      <div className="min-h-screen flex items-center justify-center p-4 mucha-pattern" style={{ background: '#FBF8F0' }}>
        <div className="w-full max-w-md">
          <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${CATEGORY_COLORS[test.category]} p-[2px]`}>
            <div className="rounded-[22px] p-8 text-center mucha-corner" style={{ background: '#FBF8F0' }}>
              <div className="text-4xl mb-4">{CATEGORY_ICONS[test.category]}</div>
              {/* Ornament */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-px" style={{ background: '#D4C5A9' }} />
                <span style={{ color: '#C4A265' }}>✦</span>
                <div className="w-10 h-px" style={{ background: '#D4C5A9' }} />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#3D3226' }}>{result.title}</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B5E4F' }}>{result.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {result.tags.map(tag => (
                  <span key={tag} className="mucha-tag text-sm">#{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mb-6" style={{ color: '#C4A265' }}>
                <span className="text-lg">🫘</span>
                <span className="font-medium">+5 M豆</span>
              </div>
              <div className="space-y-3">
                <button onClick={() => navigate(`/visitor/result/${test.id}/${result.id}`)}
                  className="mucha-btn w-full py-3">查看结果详情 →</button>
                <button onClick={() => navigate('/visitor')}
                  className="mucha-btn-outline w-full py-3 rounded-full">返回测试广场</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mucha-pattern" style={{ background: '#FBF8F0' }}>
      {/* Header */}
      <div className="mucha-header sticky top-0 z-50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} style={{ color: '#6B5E4F' }}><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex-1"><h1 className="text-sm font-medium truncate" style={{ color: '#3D3226' }}>{test.title}</h1></div>
        <span className="text-xs" style={{ color: '#A89880' }}>{currentQ + 1}/{test.questions.length}</span>
      </div>

      {/* Progress */}
      <div className="h-1" style={{ background: '#E8DFC8' }}>
        <div className="h-full transition-all duration-500" style={{ width: `${((currentQ + 1) / test.questions.length) * 100}%`, background: 'linear-gradient(90deg, #A8BCA0, #7B8E6B)' }} />
      </div>

      {/* Question */}
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="text-xs" style={{ color: '#A89880' }}>问题 {currentQ + 1}</span>
          <h2 className="text-xl md:text-2xl font-bold mt-2 leading-relaxed" style={{ color: '#3D3226' }}>
            {question.text}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = answers[question.id] === option.value;
            return (
              <button key={option.value} onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3"
                style={{
                  background: isSelected ? '#F0E8D8' : 'white',
                  borderColor: isSelected ? '#C4A265' : '#D4C5A9',
                  color: isSelected ? '#3D3226' : '#6B5E4F',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                  style={{ background: isSelected ? 'linear-gradient(135deg, #A8BCA0, #7B8E6B)' : '#F0E8D8', color: isSelected ? 'white' : '#8B7E6F' }}>
                  {isSelected ? <CheckCircle2 className="w-5 h-5" /> : String.fromCharCode(65 + idx)}
                </span>
                <span className="font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
