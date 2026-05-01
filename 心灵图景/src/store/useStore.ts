import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, SavedResult, AnalyticsEvent, ArtistSubmission, UserRole } from '../types';
import { MOCK_TESTS } from '../data/mockData';

interface AppState {
  // User
  currentUser: UserProfile | null;
  setUserRole: (role: UserRole) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addMBeans: (amount: number) => void;
  spendMBeans: (amount: number) => boolean;

  // Test
  completedTests: Record<string, string>; // testId -> resultId
  completeTest: (testId: string, resultId: string) => void;
  saveToScape: (testId: string, resultId: string) => void;

  // Artist
  artistSubmissions: ArtistSubmission[];
  addArtistSubmission: (submission: ArtistSubmission) => void;
  updateSubmissionStatus: (id: string, status: 'approved' | 'rejected') => void;

  // Analytics
  analyticsEvents: AnalyticsEvent[];
  addEvent: (event: AnalyticsEvent) => void;
  clearAnalytics: () => void;

  // Admin
  clearTestData: () => void;

  // Daily login
  checkDailyLogin: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const createDefaultUser = (role: UserRole): UserProfile => ({
  id: generateId(),
  role,
  nickname: role === 'visitor' ? '探索者' : '画师',
  avatar: '🧑‍🎨',
  coverImage: '',
  mBeans: 20,
  completedTests: [],
  savedResults: [],
  personalityTags: [],
  decorations: [],
  dailyLoginDate: '',
  createdAt: new Date().toISOString(),
  weeklyReturnCount: 1,
  totalStayDuration: 0,
  likeCount: 0,
  shareCount: 0,
  activeIndex: 50,
  tier: '新手探索者',
});

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      completedTests: {},
      artistSubmissions: [],
      analyticsEvents: [],

      setUserRole: (role) => {
        const user = get().currentUser;
        if (user) {
          set({ currentUser: { ...user, role } });
        } else {
          set({ currentUser: createDefaultUser(role) });
        }
      },

      updateProfile: (updates) => {
        const user = get().currentUser;
        if (user) {
          set({ currentUser: { ...user, ...updates } });
        }
      },

      addMBeans: (amount) => {
        const user = get().currentUser;
        if (user) {
          set({ currentUser: { ...user, mBeans: user.mBeans + amount } });
        }
      },

      spendMBeans: (amount) => {
        const user = get().currentUser;
        if (user && user.mBeans >= amount) {
          set({ currentUser: { ...user, mBeans: user.mBeans - amount } });
          return true;
        }
        return false;
      },

      completeTest: (testId, resultId) => {
        const state = get();
        const user = state.currentUser;
        if (!user) return;
        const completed = { ...state.completedTests, [testId]: resultId };
        const test = MOCK_TESTS.find(t => t.id === testId);
        const result = test?.results.find(r => r.id === resultId);

        // Update personality tags
        const newTags = result ? [...new Set([...user.personalityTags, ...result.tags])] : user.personalityTags;

        set({
          completedTests: completed,
          currentUser: {
            ...user,
            completedTests: [...new Set([...user.completedTests, testId])],
            mBeans: user.mBeans + 5,
            personalityTags: newTags,
          },
        });
      },

      saveToScape: (testId, resultId) => {
        const user = get().currentUser;
        if (!user) return;
        const test = MOCK_TESTS.find(t => t.id === testId);
        const result = test?.results.find(r => r.id === resultId);
        if (!test || !result) return;

        const savedResult: SavedResult = {
          testId,
          testTitle: test.title,
          resultId,
          resultTitle: result.title,
          description: result.description,
          tags: result.tags,
          savedAt: new Date().toISOString(),
        };

        const exists = user.savedResults.some(s => s.testId === testId && s.resultId === resultId);
        if (!exists) {
          set({
            currentUser: {
              ...user,
              savedResults: [...user.savedResults, savedResult],
              mBeans: user.mBeans + 5,
            },
          });
        }
      },

      addArtistSubmission: (submission) => {
        set({ artistSubmissions: [...get().artistSubmissions, submission] });
      },

      updateSubmissionStatus: (id, status) => {
        set({
          artistSubmissions: get().artistSubmissions.map(s =>
            s.id === id ? { ...s, status } : s
          ),
        });
      },

      addEvent: (event) => {
        set({ analyticsEvents: [...get().analyticsEvents, event] });
      },

      clearAnalytics: () => {
        set({ analyticsEvents: [] });
      },

      clearTestData: () => {
        set({
          completedTests: {},
          analyticsEvents: [],
          currentUser: get().currentUser
            ? { ...get().currentUser!, completedTests: [], savedResults: [], personalityTags: [] }
            : null,
        });
      },

      checkDailyLogin: () => {
        const user = get().currentUser;
        if (!user) return;
        const today = new Date().toISOString().split('T')[0];
        if (user.dailyLoginDate !== today) {
          set({
            currentUser: {
              ...user,
              dailyLoginDate: today,
              mBeans: user.mBeans + 5,
              weeklyReturnCount: user.weeklyReturnCount + 1,
            },
          });
        }
      },
    }),
    {
      name: 'mindscape-storage',
    }
  )
);
