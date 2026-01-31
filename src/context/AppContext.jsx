import { createContext, useContext, useState, useEffect } from 'react';
import { USER_LEVELS } from '../data/constants';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('logmath-progress');
    return saved ? JSON.parse(saved) : {
      solvedProblems: [],
      totalCorrect: 0,
      currentLevel: 1,
      survivalRecord: null,
      completedChapters: [],
      chapterProgress: {},
    };
  });

  useEffect(() => {
    localStorage.setItem('logmath-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const markProblemSolved = (problemId) => {
    setUserProgress(prev => ({
      ...prev,
      solvedProblems: [...new Set([...prev.solvedProblems, problemId])],
      totalCorrect: prev.totalCorrect + 1,
    }));
  };

  const updateSurvivalRecord = (record) => {
    setUserProgress(prev => {
      const currentBest = prev.survivalRecord;
      if (!currentBest || record.score > currentBest.score) {
        return {
          ...prev,
          survivalRecord: record,
        };
      }
      return prev;
    });
  };

  // 章を完了としてマーク
  const markChapterCompleted = (chapterId) => {
    setUserProgress(prev => ({
      ...prev,
      completedChapters: [...new Set([...prev.completedChapters, chapterId])],
      chapterProgress: {
        ...prev.chapterProgress,
        [chapterId]: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      },
    }));
  };

  // 章の進捗を更新（途中のスライド位置を保存）
  const updateChapterProgress = (chapterId, slideIndex, totalSlides) => {
    setUserProgress(prev => ({
      ...prev,
      chapterProgress: {
        ...prev.chapterProgress,
        [chapterId]: {
          ...prev.chapterProgress?.[chapterId],
          lastSlide: slideIndex,
          totalSlides,
          lastAccessedAt: new Date().toISOString(),
        },
      },
    }));
  };

  // 章が完了しているかチェック
  const isChapterCompleted = (chapterId) => {
    return userProgress.completedChapters?.includes(chapterId) || false;
  };

  // 学習進捗の概要を取得
  const getLearningProgress = (chapters) => {
    const completedCount = userProgress.completedChapters?.length || 0;
    const totalChapters = chapters?.length || 10;
    const percentage = Math.round((completedCount / totalChapters) * 100);
    
    return {
      completedCount,
      totalChapters,
      percentage,
      completedChapters: userProgress.completedChapters || [],
    };
  };

  const getUserLevel = () => {
    const solvedCount = userProgress.solvedProblems.length;
    let userLevel = USER_LEVELS[0];
    
    for (const level of USER_LEVELS) {
      if (solvedCount >= level.minSolved) {
        userLevel = level;
      } else {
        break;
      }
    }
    
    return {
      ...userLevel,
      solvedCount,
      nextLevel: USER_LEVELS.find(l => l.minSolved > solvedCount),
    };
  };

  const resetProgress = () => {
    setUserProgress({
      solvedProblems: [],
      totalCorrect: 0,
      currentLevel: 1,
      survivalRecord: null,
      completedChapters: [],
      chapterProgress: {},
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        userProgress,
        markProblemSolved,
        updateSurvivalRecord,
        markChapterCompleted,
        updateChapterProgress,
        isChapterCompleted,
        getLearningProgress,
        getUserLevel,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
