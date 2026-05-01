import { useNavigate } from 'react-router-dom';
import { Eye, Heart, Share2 } from 'lucide-react';
import type { Test } from '../types';
import { CATEGORY_ICONS } from '../types';
import { CATEGORY_COLORS } from '../data/mockData';

interface Props { test: Test; }

export default function TestCard({ test }: Props) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/visitor/test/${test.id}`)}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1 mucha-card">
      {/* Cover */}
      <div className={`relative h-44 bg-gradient-to-br ${CATEGORY_COLORS[test.category]} overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/5 transition" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 backdrop-blur text-xs"
          style={{ color: '#3D3226' }}>
          <span>{CATEGORY_ICONS[test.category]}</span> {test.category}
        </div>
        {test.mBeanCost > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(196,162,101,0.85)', color: 'white' }}>
            🫘 {test.mBeanCost}
          </div>
        )}
        {test.isArtistCreated && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(196,145,123,0.85)', color: 'white' }}>
            🎨 {test.artistName}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20 group-hover:opacity-30 transition">
          {CATEGORY_ICONS[test.category]}
        </div>
      </div>

      {/* Content */}
      <div className="p-4" style={{ background: '#FBF8F0' }}>
        <h4 className="font-semibold mb-1.5 group-hover:opacity-80 transition line-clamp-1" style={{ color: '#3D3226' }}>
          {test.title}
        </h4>
        <p className="text-xs mb-3 line-clamp-2" style={{ color: '#8B7E6F' }}>{test.description}</p>
        <div className="flex items-center gap-4 text-xs" style={{ color: '#A89880' }}>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {test.stats.views}</span>
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {test.stats.likes}</span>
          <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> {test.stats.shares}</span>
        </div>
      </div>
    </div>
  );
}
