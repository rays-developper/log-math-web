import { useState, useMemo } from 'react';
import { PROBLEMS, LEVELS, PROBLEM_CATEGORIES } from '../data/problems';
import { useApp } from '../context/AppContext';
import { 
  Lightbulb, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  Flame,
  Filter,
  Sparkles
} from 'lucide-react';
import SurvivalMode from './SurvivalMode';

const PracticeMode = () => {
  const { userProgress, markProblemSolved } = useApp();
  const [mode, setMode] = useState('select'); // select, normal, survival
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // フィルタリングされた問題
  const getFilteredProblems = () => {
    let filtered = PROBLEMS;
    if (selectedLevel) {
      filtered = filtered.filter(p => p.level === selectedLevel);
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    return filtered;
  };

  const levelProblems = getFilteredProblems();

  // サジェスト：未解決の問題から適切なレベルのものをおすすめ
  const suggestedProblems = useMemo(() => {
    const unsolvedProblems = PROBLEMS.filter(
      p => !userProgress.solvedProblems.includes(p.id)
    );
    
    if (unsolvedProblems.length === 0) {
      // 全問解いた場合はランダムに3問
      return PROBLEMS.slice().sort(() => Math.random() - 0.5).slice(0, 3);
    }

    // ユーザーのレベルを推定（解いた問題の最高レベル、なければ1）
    const solvedLevels = userProgress.solvedProblems
      .map(id => PROBLEMS.find(p => p.id === id)?.level || 1);
    const maxSolvedLevel = solvedLevels.length > 0 
      ? Math.max(...solvedLevels) 
      : 0;
    const recommendedLevel = Math.min(maxSolvedLevel + 1, 5);

    // 推奨レベル付近の未解決問題を優先
    const prioritized = unsolvedProblems.sort((a, b) => {
      const aDiff = Math.abs(a.level - recommendedLevel);
      const bDiff = Math.abs(b.level - recommendedLevel);
      if (aDiff !== bDiff) return aDiff - bDiff;
      return Math.random() - 0.5; // 同レベルならランダム
    });

    return prioritized.slice(0, 3);
  }, [userProgress.solvedProblems]);

  const startProblem = (problem) => {
    setCurrentProblem(problem);
    setUserAnswer('');
    setShowHint(false);
    setFeedback(null);
  };

  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    if (isNaN(answer)) {
      setFeedback({ type: 'error', message: '数値を入力してください' });
      return;
    }

    const rawDifference = answer - currentProblem.targetLog; // 符号付き差分
    const difference = Math.abs(rawDifference);
    const isCorrect = difference <= currentProblem.tolerance;
    // パーセント誤差を計算 (log差分からパーセントへ: 10^diff - 1)
    const percentError = Math.round((Math.pow(10, difference) - 1) * 100);

    if (isCorrect) {
      markProblemSolved(currentProblem.id);
      setFeedback({
        type: 'success',
        message: '正解です！',
        difference,
        rawDifference,
        percentError,
      });
    } else {
      setFeedback({
        type: 'wrong',
        message: `惜しい！正解は ${currentProblem.targetLog} です`,
        difference,
        rawDifference,
        percentError,
      });
    }
  };

  const nextProblem = () => {
    const currentIndex = levelProblems.findIndex(p => p.id === currentProblem.id);
    const nextIndex = (currentIndex + 1) % levelProblems.length;
    startProblem(levelProblems[nextIndex]);
  };

  // サバイバルモード
  if (mode === 'survival') {
    return <SurvivalMode onBack={() => setMode('select')} />;
  }

  // モード選択画面
  if (mode === 'select') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">実戦モード</h2>
        <p className="text-gray-600 mb-8">問題を解いてLog感覚を鍛えよう！</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 通常モード */}
          <button
            onClick={() => setMode('normal')}
            className="p-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white text-left hover:shadow-xl transition-all transform hover:scale-105"
          >
            <BookOpen size={48} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">通常モード</h3>
            <p className="text-blue-100 mb-4">
              レベル別・カテゴリ別に問題を選んで解く
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                📚 {PROBLEMS.length} 問題
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                ✅ {userProgress.solvedProblems.length} クリア
              </span>
            </div>
          </button>

          {/* サバイバルモード */}
          <button
            onClick={() => setMode('survival')}
            className="p-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl text-white text-left hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Flame size={48} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">サバイバルモード</h3>
            <p className="text-red-100 mb-4">
              誤差残機10で限界まで挑戦！
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                ❤️ 残機制
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🏆 {userProgress.survivalRecord?.score || 0} ベスト
              </span>
            </div>
          </button>
        </div>

        {/* 進捗サマリー */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">レベル別進捗</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {LEVELS.map((level) => {
              const problems = PROBLEMS.filter(p => p.level === level.id);
              const solved = problems.filter(p => 
                userProgress.solvedProblems.includes(p.id)
              ).length;
              const percentage = problems.length > 0 
                ? Math.round((solved / problems.length) * 100) 
                : 0;

              return (
                <div key={level.id} className="text-center">
                  <div className="text-2xl mb-1">{level.emoji}</div>
                  <div className="font-bold text-gray-800">{level.name}</div>
                  <div className="text-sm text-gray-500 mb-2">
                    {solved}/{problems.length}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        level.color === 'green' ? 'bg-green-500' :
                        level.color === 'blue' ? 'bg-blue-500' :
                        level.color === 'purple' ? 'bg-purple-500' :
                        level.color === 'orange' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 通常モード - 問題選択画面
  if (!currentProblem) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => setMode('select')}
          className="mb-6 text-primary hover:text-blue-600 flex items-center space-x-2"
        >
          <span>← モード選択に戻る</span>
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">通常モード</h2>

        {/* おすすめ問題 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 mb-6 border border-purple-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Sparkles className="text-purple-500" size={20} />
            <span>おすすめ問題</span>
            <span className="text-sm font-normal text-gray-500">
              {userProgress.solvedProblems.length === PROBLEMS.length 
                ? '(全問クリア！復習にどうぞ)' 
                : '(あなたのレベルに合った問題)'}
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedProblems.map((problem) => {
              const isSolved = userProgress.solvedProblems.includes(problem.id);
              const level = LEVELS.find(l => l.id === problem.level);
              return (
                <button
                  key={problem.id}
                  onClick={() => startProblem(problem)}
                  className="p-4 bg-white border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      level?.color === 'green' ? 'bg-green-100 text-green-700' :
                      level?.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      level?.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      level?.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {level?.emoji} Lv.{problem.level}
                    </span>
                    {isSolved && <CheckCircle className="text-green-500" size={16} />}
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
                    {problem.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {problem.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* レベル選択 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Filter size={20} />
            <span>レベルで絞り込み</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLevel(null)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedLevel === null
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべて
            </button>
            {LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedLevel === level.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.emoji} {level.name}
              </button>
            ))}
          </div>
        </div>

        {/* カテゴリ選択 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">カテゴリで絞り込み</h3>
          <div className="flex flex-wrap gap-2">
            {PROBLEM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 問題一覧 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            問題一覧 ({levelProblems.length}問)
          </h3>
          {levelProblems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              条件に合う問題がありません
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {levelProblems.map((problem) => {
                const isSolved = userProgress.solvedProblems.includes(problem.id);
                const level = LEVELS.find(l => l.id === problem.level);
                return (
                  <button
                    key={problem.id}
                    onClick={() => startProblem(problem)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            level?.color === 'green' ? 'bg-green-100 text-green-700' :
                            level?.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            level?.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            level?.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {level?.emoji} Lv.{problem.level}
                          </span>
                          {problem.category && (
                            <span className="text-xs text-gray-500">
                              {PROBLEM_CATEGORIES.find(c => c.id === problem.category)?.icon}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1">
                          {problem.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {problem.description}
                        </p>
                      </div>
                      {isSolved && (
                        <CheckCircle className="text-green-500 ml-2 flex-shrink-0" size={20} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 問題解答画面
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => setCurrentProblem(null)}
        className="mb-4 text-primary hover:text-blue-600 flex items-center space-x-2"
      >
        <span>← 問題一覧に戻る</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* 問題ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Level {currentProblem.level}
            </span>
            {userProgress.solvedProblems.includes(currentProblem.id) && (
              <span className="flex items-center space-x-1 text-green-600 text-sm">
                <CheckCircle size={16} />
                <span>クリア済み</span>
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {currentProblem.title}
          </h2>
          <p className="text-lg text-gray-700">
            {currentProblem.description}
          </p>
        </div>

        {/* 回答フォーム */}
        {!feedback && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              答え (Log値)
            </label>
            <div className="flex space-x-4">
              <input
                type="number"
                step="0.01"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="例: 3.5"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              />
              <button
                onClick={checkAnswer}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 font-bold transition-colors"
              >
                回答
              </button>
            </div>
          </div>
        )}

        {/* ヒントボタン */}
        {!feedback && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 mb-4"
          >
            <Lightbulb size={20} />
            <span>{showHint ? 'ヒントを隠す' : 'ヒントを見る'}</span>
          </button>
        )}

        {/* ヒント表示 */}
        {showHint && !feedback && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-6">
            <p className="text-yellow-900">{currentProblem.hint}</p>
          </div>
        )}

        {/* フィードバック */}
        {feedback && (
          <div className="mb-6">
            {feedback.type === 'success' ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="text-green-600" size={32} />
                  <div>
                    <p className="text-xl font-bold text-green-900">
                      {feedback.message}
                    </p>
                    <p className="text-green-700">
                      {feedback.percentError}%の誤差 ({feedback.rawDifference >= 0 ? '+' : ''}{feedback.rawDifference.toFixed(2)})
                    </p>
                  </div>
                </div>
              </div>
            ) : feedback.type === 'wrong' ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <XCircle className="text-red-600" size={32} />
                  <div>
                    <p className="text-xl font-bold text-red-900">
                      {feedback.message}
                    </p>
                    <p className="text-red-700">
                      あなたの回答: {userAnswer} ({feedback.percentError}%の誤差 / {feedback.rawDifference >= 0 ? '+' : ''}{feedback.rawDifference.toFixed(2)})
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* 解説 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-3">解説</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {currentProblem.explanation}
              </div>
            </div>

            {/* 次の問題ボタン */}
            <button
              onClick={nextProblem}
              className="mt-6 w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-white rounded-lg hover:bg-blue-600 font-bold transition-colors"
            >
              <span>次の問題へ</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeMode;
