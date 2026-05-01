import type { Test, TestCategory, TestTemplate, DecorationItem } from '../types';

// ===== Mock 测试数据 =====
export const MOCK_TESTS: Test[] = [
  {
    id: 'test-1',
    title: '你的OC灵魂色彩是什么？',
    description: '探索你原创角色隐藏的灵魂色彩，发现意想不到的创作灵感！',
    category: 'oc专区',
    coverImage: 'https://picsum.photos/seed/oc1/400/300',
    mBeanCost: 0,
    isArtistCreated: false,
    questions: [
      { id: 'q1', text: '如果你的OC只能拥有一种超能力，你会选择？', options: [
        { label: '操控时间', value: 'time' }, { label: '读心术', value: 'mind' },
        { label: '变形术', value: 'shift' }, { label: '元素掌控', value: 'element' }
      ]},
      { id: 'q2', text: '你的OC最常出现在什么场景中？', options: [
        { label: '繁华都市', value: 'city' }, { label: '神秘森林', value: 'forest' },
        { label: '星际太空', value: 'space' }, { label: '古风庭院', value: 'garden' }
      ]},
      { id: 'q3', text: '你的OC性格最接近哪种动物？', options: [
        { label: '孤傲的猫', value: 'cat' }, { label: '忠诚的犬', value: 'dog' },
        { label: '灵动的鸟', value: 'bird' }, { label: '深邃的鲸', value: 'whale' }
      ]},
      { id: 'q4', text: '创作OC时你最看重什么？', options: [
        { label: '独特的外观', value: 'look' }, { label: '丰富的背景故事', value: 'story' },
        { label: '情感共鸣', value: 'emotion' }, { label: '与世界的联系', value: 'world' }
      ]},
    ],
    results: [
      { id: 'r1', title: '星河靛蓝', description: '你的OC灵魂色彩是深邃的靛蓝色，如同夜空中最遥远的星河。创造力无限，内心世界丰富而神秘。', tags: ['创造力', '神秘', '深邃'] },
      { id: 'r2', title: '琥珀暖阳', description: '你的OC灵魂色彩是温暖的琥珀色，像冬日暖阳般抚慰人心。你善于营造温馨的故事氛围。', tags: ['温暖', '治愈', '阳光'] },
      { id: 'r3', title: '翡翠幻光', description: '你的OC灵魂色彩是变幻的翡翠绿，充满生命力和想象力，你的角色总能给人惊喜。', tags: ['想象力', '活力', '惊喜'] },
      { id: 'r4', title: '绯红烈焰', description: '你的OC灵魂色彩是炽热的绯红色，充满激情和力量，你的角色总是故事的核心。', tags: ['激情', '力量', '领袖'] },
    ],
    stats: { views: 2341, likes: 456, shares: 123, startedCount: 890, completedCount: 678, savedToScapeCount: 345, shareBackCount: 89 },
  },
  {
    id: 'test-2',
    title: '你的MBTI隐藏人格是什么？',
    description: '超越传统16型人格，发现你性格深处的隐藏维度！',
    category: 'MBTI专区',
    coverImage: 'https://picsum.photos/seed/mbti1/400/300',
    mBeanCost: 0,
    isArtistCreated: false,
    questions: [
      { id: 'q1', text: '周末你更倾向于？', options: [
        { label: '独自在家看书/追剧', value: 'introvert' }, { label: '和朋友出去聚会', value: 'extrovert' },
        { label: '探索新的咖啡馆', value: 'explore' }, { label: '参加一个工作坊', value: 'learn' }
      ]},
      { id: 'q2', text: '面对重大决定时，你更依赖？', options: [
        { label: '逻辑分析', value: 'logic' }, { label: '内心直觉', value: 'intuition' },
        { label: '他人建议', value: 'others' }, { label: '过往经验', value: 'experience' }
      ]},
      { id: 'q3', text: '你理想的工作环境是？', options: [
        { label: '安静的独立办公室', value: 'quiet' }, { label: '热闹的开放式空间', value: 'open' },
        { label: '居家远程', value: 'remote' }, { label: '自然中的移动办公', value: 'nature' }
      ]},
      { id: 'q4', text: '你更欣赏哪种品质？', options: [
        { label: '果断坚定', value: 'decisive' }, { label: '温柔体贴', value: 'gentle' },
        { label: '创意无限', value: 'creative' }, { label: '条理清晰', value: 'organized' }
      ]},
    ],
    results: [
      { id: 'r1', title: 'INFJ-A 守望者', description: '你是一个理想主义的守望者，拥有深刻的洞察力和坚定的信念，总是在为更好的世界默默努力。', tags: ['理想主义', '洞察力', '坚韧'] },
      { id: 'r2', title: 'ENTP-T 探索者', description: '你是一个永远好奇的探索者，思维跳跃而敏捷，总能在不可能中发现可能。', tags: ['好奇心', '创新', '灵活'] },
      { id: 'r3', title: 'ISFP-A 梦幻者', description: '你是一个感性的梦幻者，用独特的审美感受世界，在平凡中创造诗意。', tags: ['感性', '审美', '诗意'] },
      { id: 'r4', title: 'ESTJ-T 筑梦者', description: '你是一个务实的筑梦者，善于将愿景变为现实，用行动力证明一切可能。', tags: ['务实', '行动力', '领导力'] },
    ],
    stats: { views: 5672, likes: 1234, shares: 567, startedCount: 2345, completedCount: 1890, savedToScapeCount: 890, shareBackCount: 234 },
  },
  {
    id: 'test-3',
    title: '你属于哪个二次元世界？',
    description: '穿越次元壁，找到你灵魂归属的动漫世界！',
    category: '二次元专区',
    coverImage: 'https://picsum.photos/seed/acg1/400/300',
    mBeanCost: 0,
    isArtistCreated: false,
    questions: [
      { id: 'q1', text: '你最想拥有的动漫能力是？', options: [
        { label: '替身使者', value: 'stand' }, { label: '魔法少女变身', value: 'magical' },
        { label: '忍者术', value: 'ninja' }, { label: '异世界转生', value: 'isekai' }
      ]},
      { id: 'q2', text: '你最喜欢的动漫类型是？', options: [
        { label: '热血战斗', value: 'battle' }, { label: '日常治愈', value: 'healing' },
        { label: '悬疑推理', value: 'mystery' }, { label: '恋爱喜剧', value: 'romance' }
      ]},
      { id: 'q3', text: '你更喜欢哪种角色定位？', options: [
        { label: '主角', value: 'hero' }, { label: '宿敌/反派', value: 'rival' },
        { label: '智囊/军师', value: 'strategist' }, { label: '神秘路人', value: 'mysterious' }
      ]},
    ],
    results: [
      { id: 'r1', title: '咒术世界的咒术师', description: '你属于充满咒力的世界！面对诅咒毫不退缩，你的内心有着强大的力量。', tags: ['战斗', '勇气', '咒术'] },
      { id: 'r2', title: '异世界的冒险者', description: '你注定要穿越到异世界开始全新冒险！未知和挑战是你的兴奋剂。', tags: ['冒险', '异世界', '成长'] },
      { id: 'r3', title: '魔法学院的优等生', description: '你属于魔法与知识交织的学院世界，天赋与努力并存的你总能出类拔萃。', tags: ['魔法', '学院', '才华'] },
    ],
    stats: { views: 3456, likes: 789, shares: 345, startedCount: 1567, completedCount: 1234, savedToScapeCount: 567, shareBackCount: 145 },
  },
  {
    id: 'test-4',
    title: '你的五行命格是什么？',
    description: '根据你的生辰信息，揭示你的五行属性和命运走向！',
    category: '生辰五行',
    coverImage: 'https://picsum.photos/seed/wuxing1/400/300',
    mBeanCost: 0,
    isArtistCreated: false,
    questions: [
      { id: 'q1', text: '你出生的季节是？', options: [
        { label: '春季（木旺）', value: 'spring' }, { label: '夏季（火旺）', value: 'summer' },
        { label: '秋季（金旺）', value: 'autumn' }, { label: '冬季（水旺）', value: 'winter' }
      ]},
      { id: 'q2', text: '你最向往的自然景象是？', options: [
        { label: '参天大树', value: 'wood' }, { label: '熊熊烈火', value: 'fire' },
        { label: '广袤大地', value: 'earth' }, { label: '深邃大海', value: 'water' }
      ]},
      { id: 'q3', text: '你处理冲突的方式是？', options: [
        { label: '以柔克刚', value: 'soft' }, { label: '正面刚', value: 'hard' },
        { label: '寻找平衡', value: 'balance' }, { label: '绕道而行', value: 'bypass' }
      ]},
    ],
    results: [
      { id: 'r1', title: '甲木之命 · 苍松翠柏', description: '你命中属木，如苍松般坚韧挺拔，有向上生长的力量和不屈的意志。', tags: ['坚韧', '成长', '生机'] },
      { id: 'r2', title: '丙火之命 · 炎阳高照', description: '你命中属火，如烈日般光芒四射，充满热情和感染力。', tags: ['热情', '光明', '感染力'] },
      { id: 'r3', title: '壬水之命 · 江河奔涌', description: '你命中属水，如江河般奔涌不息，智慧深沉，适应力强。', tags: ['智慧', '流动', '适应'] },
    ],
    stats: { views: 4567, likes: 890, shares: 234, startedCount: 1890, completedCount: 1567, savedToScapeCount: 678, shareBackCount: 178 },
  },
  {
    id: 'test-5',
    title: '你的美学人格密码是什么？',
    description: '通过审美偏好，解码你独特的美学人格！',
    category: '美学人格',
    coverImage: 'https://picsum.photos/seed/aesthetic1/400/300',
    mBeanCost: 0,
    isArtistCreated: false,
    questions: [
      { id: 'q1', text: '你更喜欢的配色方案是？', options: [
        { label: '莫兰迪灰调', value: 'morandi' }, { label: '高饱和撞色', value: 'vivid' },
        { label: '黑白极简', value: 'mono' }, { label: '渐变彩虹', value: 'rainbow' }
      ]},
      { id: 'q2', text: '你理想的居住空间是？', options: [
        { label: '日式侘寂风', value: 'wabisabi' }, { label: '赛博朋克', value: 'cyberpunk' },
        { label: '法式复古', value: 'vintage' }, { label: '北欧简约', value: 'nordic' }
      ]},
      { id: 'q3', text: '你最能共鸣的艺术形式是？', options: [
        { label: '水彩画', value: 'watercolor' }, { label: '数字艺术', value: 'digital' },
        { label: '雕塑', value: 'sculpture' }, { label: '摄影', value: 'photo' }
      ]},
    ],
    results: [
      { id: 'r1', title: '暗夜诗学', description: '你的美学人格是暗夜诗学，在深邃的暗色调中发现诗意和浪漫，独特而迷人。', tags: ['暗黑浪漫', '诗意', '深邃'] },
      { id: 'r2', title: '晨光织梦', description: '你的美学人格是晨光织梦，在柔和的光影中编织美好，温柔而坚定。', tags: ['温柔', '光影', '梦幻'] },
      { id: 'r3', title: '霓虹幻境', description: '你的美学人格是霓虹幻境，在电子脉冲和荧光中找到归属，前卫而大胆。', tags: ['前卫', '电子', '大胆'] },
    ],
    stats: { views: 3890, likes: 678, shares: 189, startedCount: 1456, completedCount: 1123, savedToScapeCount: 456, shareBackCount: 123 },
  },
  {
    id: 'test-6',
    title: '你抽到了哪张塔罗牌？',
    description: '让命运的塔罗指引你，揭示你此刻最需要的启示！',
    category: '塔罗占星',
    coverImage: 'https://picsum.photos/seed/tarot1/400/300',
    mBeanCost: 5,
    isArtistCreated: false,
    questions: [
      { id: 'q1', text: '闭上眼，你现在感受到的能量是？', options: [
        { label: '温暖明亮', value: 'warm' }, { label: '冷静幽深', value: 'cool' },
        { label: '躁动不安', value: 'restless' }, { label: '平静安宁', value: 'peaceful' }
      ]},
      { id: 'q2', text: '选一个吸引你的符号：', options: [
        { label: '🌙 月亮', value: 'moon' }, { label: '☀️ 太阳', value: 'sun' },
        { label: '⭐ 星星', value: 'star' }, { label: '🔥 火焰', value: 'flame' }
      ]},
      { id: 'q3', text: '你现在最渴望什么？', options: [
        { label: '方向感', value: 'direction' }, { label: '勇气', value: 'courage' },
        { label: '平静', value: 'peace' }, { label: '连接', value: 'connection' }
      ]},
    ],
    results: [
      { id: 'r1', title: '月亮牌 · 潜意识之旅', description: '月亮牌指引你向内探索，倾听潜意识的声音。迷雾中隐藏着答案。', tags: ['直觉', '潜意识', '内省'] },
      { id: 'r2', title: '太阳牌 · 光明未来', description: '太阳牌预示着光明和成功！一切都在向好的方向发展，请保持信心。', tags: ['光明', '成功', '希望'] },
      { id: 'r3', title: '星星牌 · 希望之泉', description: '星星牌带来希望和灵感，即使在黑暗中，也有星光指引前路。', tags: ['希望', '灵感', '指引'] },
    ],
    stats: { views: 5678, likes: 1456, shares: 678, startedCount: 2567, completedCount: 2123, savedToScapeCount: 987, shareBackCount: 267 },
  },
  {
    id: 'test-7',
    title: '你适合建立怎样的世界观？',
    description: '你是造物主！发现你内心最想构建的世界形态！',
    category: '世界观搭建',
    coverImage: 'https://picsum.photos/seed/world1/400/300',
    mBeanCost: 10,
    isArtistCreated: false,
    questions: [
      { id: 'q1', text: '你的世界最核心的规则是？', options: [
        { label: '魔法即日常', value: 'magic' }, { label: '科技至上', value: 'tech' },
        { label: '万物有灵', value: 'spirit' }, { label: '力量即正义', value: 'power' }
      ]},
      { id: 'q2', text: '你世界里的冲突来源是？', options: [
        { label: '种族对立', value: 'race' }, { label: '资源争夺', value: 'resource' },
        { label: '信仰分歧', value: 'belief' }, { label: '维度碰撞', value: 'dimension' }
      ]},
      { id: 'q3', text: '你世界的主角会是什么身份？', options: [
        { label: '被选中的普通人', value: 'chosen' }, { label: '叛逃的贵族', value: 'noble' },
        { label: '失忆的旅者', value: 'amnesia' }, { label: '觉醒的AI', value: 'ai' }
      ]},
    ],
    results: [
      { id: 'r1', title: '浮空岛世界', description: '你适合构建一个悬浮于云端的岛屿世界，每个岛屿都有自己的文明和法则。', tags: ['浮空', '多元文明', '探索'] },
      { id: 'r2', title: '深海帝国', description: '你适合构建一个深海中的帝国，在黑暗与光明之间，隐藏着无数秘密。', tags: ['深海', '秘密', '双面'] },
      { id: 'r3', title: '废土新纪', description: '你适合构建一个末日后的新世界，在废墟中重建文明，充满希望与挑战。', tags: ['废土', '重建', '希望'] },
    ],
    stats: { views: 2345, likes: 567, shares: 234, startedCount: 1234, completedCount: 987, savedToScapeCount: 456, shareBackCount: 112 },
  },
  {
    id: 'test-8',
    title: '画师共创：你的画中灵魂',
    description: '由画师「星辰」倾心创作的视觉系人格测试！',
    category: '画师共创',
    coverImage: 'https://picsum.photos/seed/artist1/400/300',
    mBeanCost: 5,
    isArtistCreated: true,
    artistId: 'artist-1',
    artistName: '星辰',
    questions: [
      { id: 'q1', text: '你更被哪种画风吸引？', options: [
        { label: '厚涂写实', value: 'thick' }, { label: '清新水彩', value: 'watercolor' },
        { label: '赛璐璐', value: 'celluloid' }, { label: '抽象表现', value: 'abstract' }
      ]},
      { id: 'q2', text: '你最喜欢的画面氛围是？', options: [
        { label: '温柔治愈', value: 'healing' }, { label: '神秘诡异', value: 'mysterious' },
        { label: '热血燃爆', value: 'passionate' }, { label: '空灵飘渺', value: 'ethereal' }
      ]},
    ],
    results: [
      { id: 'r1', title: '墨染丹青', description: '你的画中灵魂是传统与创新的融合，墨色之中自有天地。', tags: ['传统', '创新', '意境'] },
      { id: 'r2', title: '像素星光', description: '你的画中灵魂在数字世界中闪烁，用像素编织星河。', tags: ['数字', '星光', '编织'] },
    ],
    stats: { views: 1234, likes: 345, shares: 123, startedCount: 678, completedCount: 567, savedToScapeCount: 234, shareBackCount: 67 },
  },
];

export const MOCK_TEMPLATES: TestTemplate[] = [
  { id: 'tpl-1', name: 'MBTI风格测试模板', category: 'MBTI专区', questionCount: 4, mBeanCost: 30 },
  { id: 'tpl-2', name: 'OC角色测试模板', category: 'oc专区', questionCount: 4, mBeanCost: 30 },
  { id: 'tpl-3', name: '占卜抽卡模板', category: '塔罗占星', questionCount: 3, mBeanCost: 25 },
  { id: 'tpl-4', name: '美学风格测试模板', category: '美学人格', questionCount: 3, mBeanCost: 25 },
];

export const MOCK_DECORATIONS: DecorationItem[] = [
  { id: 'dec-1', name: '藤蔓头像框', type: 'avatar_frame', imageUrl: '🌿', mBeanCost: 20, isArtistCreated: false },
  { id: 'dec-2', name: '花冠头像框', type: 'avatar_frame', imageUrl: '💐', mBeanCost: 20, isArtistCreated: false },
  { id: 'dec-3', name: '花园封面背景', type: 'cover_bg', imageUrl: '🌷', mBeanCost: 30, isArtistCreated: false },
  { id: 'dec-4', name: '星空封面背景', type: 'cover_bg', imageUrl: '✨', mBeanCost: 30, isArtistCreated: false },
  { id: 'dec-5', name: '心灵探索者徽章', type: 'badge', imageUrl: '🔮', mBeanCost: 50, isArtistCreated: false },
  { id: 'dec-6', name: '画师之印徽章', type: 'badge', imageUrl: '🎨', mBeanCost: 50, isArtistCreated: true, artistId: 'artist-1' },
];

// Mucha-style category colors — soft, muted, organic
export const CATEGORY_COLORS: Record<TestCategory, string> = {
  'oc专区': 'from-[#A8BCA0] to-[#7B8E6B]',
  'MBTI专区': 'from-[#8BAAB8] to-[#6B8E9E]',
  '二次元专区': 'from-[#D4B0A0] to-[#C4917B]',
  '生辰五行': 'from-[#C4A265] to-[#B08B45]',
  '美学人格': 'from-[#B8A0C8] to-[#9B8EB8]',
  '塔罗占星': 'from-[#8BA0B8] to-[#7B8E9E]',
  '世界观搭建': 'from-[#A0C0A8] to-[#7BA08B]',
  '画师共创': 'from-[#D4A08B] to-[#C4907B]',
};
