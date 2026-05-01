// ===== 分类 =====
export type TestCategory =
  | 'oc专区'
  | 'MBTI专区'
  | '二次元专区'
  | '生辰五行'
  | '美学人格'
  | '塔罗占星'
  | '世界观搭建'
  | '画师共创';

export const CATEGORIES: TestCategory[] = [
  'oc专区',
  'MBTI专区',
  '二次元专区',
  '生辰五行',
  '美学人格',
  '塔罗占星',
  '世界观搭建',
  '画师共创',
];

export const CATEGORY_ICONS: Record<TestCategory, string> = {
  'oc专区': '🎨',
  'MBTI专区': '🧠',
  '二次元专区': '🌸',
  '生辰五行': '☯️',
  '美学人格': '✨',
  '塔罗占星': '🔮',
  '世界观搭建': '🌍',
  '画师共创': '🖌️',
};

// ===== 测试 =====
export interface TestQuestion {
  id: string;
  text: string;
  options: { label: string; value: string }[];
}

export interface TestResult {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  category: TestCategory;
  coverImage: string;
  questions: TestQuestion[];
  results: TestResult[];
  isArtistCreated: boolean;
  artistId?: string;
  artistName?: string;
  mBeanCost: number; // 0 = 免费
  stats: TestStats;
}

export interface TestStats {
  views: number;
  likes: number;
  shares: number;
  startedCount: number;
  completedCount: number;
  savedToScapeCount: number;
  shareBackCount: number;
}

// ===== 用户 =====
export type UserRole = 'visitor' | 'artist';

export interface UserProfile {
  id: string;
  role: UserRole;
  nickname: string;
  avatar: string;
  coverImage: string;
  mBeans: number;
  completedTests: string[]; // test IDs
  savedResults: SavedResult[];
  personalityTags: string[];
  decorations: string[];
  dailyLoginDate: string; // YYYY-MM-DD
  createdAt: string;
  // Visitor stats
  weeklyReturnCount: number;
  totalStayDuration: number; // minutes
  likeCount: number;
  shareCount: number;
  activeIndex: number;
  tier: '新手探索者' | '活跃旅人' | '心灵大师' | '图景领主';
}

export interface SavedResult {
  testId: string;
  testTitle: string;
  resultId: string;
  resultTitle: string;
  description: string;
  tags: string[];
  savedAt: string;
}

// ===== 画师 =====
export interface ArtistProfile extends UserProfile {
  role: 'artist';
  portfolio: ArtistSubmission[];
}

export interface ArtistSubmission {
  id: string;
  artistId: string;
  artistName: string;
  testTitle: string;
  originalLink: string;
  sourcePlatform: string;
  testType: TestCategory;
  isOriginal: boolean;
  isAuthorizedForH5: boolean;
  contactInfo: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  testId?: string; // 关联到已发布的测试
}

// ===== 事件追踪 =====
export type AnalyticsEventType =
  | 'page_view'
  | 'test_start'
  | 'test_complete'
  | 'test_share'
  | 'save_to_scape'
  | 'daily_login'
  | 'mbean_earn'
  | 'mbean_spend'
  | 'artist_submit';

export interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: AnalyticsEventType;
  testId?: string;
  value?: number;
  timestamp: string;
  metadata?: Record<string, string>;
}

// ===== 装饰组件 =====
export interface DecorationItem {
  id: string;
  name: string;
  type: 'avatar_frame' | 'cover_bg' | 'badge';
  imageUrl: string;
  mBeanCost: number;
  isArtistCreated: boolean;
  artistId?: string;
}

// ===== 模板 =====
export interface TestTemplate {
  id: string;
  name: string;
  category: TestCategory;
  questionCount: number;
  mBeanCost: number;
}
