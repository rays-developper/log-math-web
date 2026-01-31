import { useState, useEffect, useCallback } from 'react';
import { PROBLEMS, LEVELS, PROBLEM_CATEGORIES } from '../data/problems';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Trophy, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  RotateCcw,
  ArrowLeft,
  Timer,
  Target,
  Flame
} from 'lucide-react';

const INITIAL_LIVES = 10; // 初期残機
const MAX_ERROR = 10.0; // 誤差残機が0になる誤差

const SurvivalMode = ({ onBack }) => {
  const { userProgress, updateSurvivalRecord } = useApp();
  
  // ゲーム状態
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [difficulty, setDifficulty] = useState('normal'); // easy, normal, hard
  const [category, setCategory] = useState('all');
  
  // プレイ中の状態
  const [errorStock, setErrorStock] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [usedProblems, setUsedProblems] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // 難易度設定
  const difficultySettings = {
    easy: { 
      name: 'イージー', 
      levels: [1, 2], 
      toleranceMultiplier: 1.5,
      errorPenalty: 0.5,
      emoji: '🌱'
    },
    normal: { 
      name: 'ノーマル', 
      levels: [1, 2, 3], 
      toleranceMultiplier: 1.0,
      errorPenalty: 1.0,
      emoji: '⚡'
    },
    hard: { 
      name: 'ハード', 
      levels: [2, 3, 4, 5], 
      toleranceMultiplier: 0.7,
      errorPenalty: 1.5,
      emoji: '🔥'
    }
  };

  // 次の問題を取得（usedListを引数で受け取る版）
  const getNextProblem = useCallback((usedList = usedProblems) => {
    const settings = difficultySettings[difficulty];
    let availableProblems = PROBLEMS.filter(p => 
      settings.levels.includes(p.level) &&
      !usedList.includes(p.id) &&
      (category === 'all' || p.category === category)
    );

    // 使用済みをリセットして再利用
    if (availableProblems.length === 0) {
      setUsedProblems([]);
      availableProblems = PROBLEMS.filter(p => 
        settings.levels.includes(p.level) &&
        (category === 'all' || p.category === category)
      );
    }

    if (availableProblems.length === 0) {
      return null;
    }

    // ランダムに選択
    const randomIndex = Math.floor(Math.random() * availableProblems.length);
    return availableProblems[randomIndex];
  }, [difficulty, category, usedProblems]);

  // ゲーム開始
  const startGame = () => {
    setErrorStock(INITIAL_LIVES);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setQuestionsAnswered(0);
    setUsedProblems([]);
    setTimeElapsed(0);
    setFeedback(null);
    setShowHint(false);
    setUserAnswer('');
    
    // 空配列を渡して初回問題を取得
    const firstProblem = getNextProblem([]);
    setCurrentProblem(firstProblem);
    setGameState('playing');
  };

  // タイマー
  useEffect(() => {
    let timer;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  // 回答チェック
  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    if (isNaN(answer)) {
      setFeedback({ type: 'error', message: '数値を入力してください' });
      return;
    }

    const settings = difficultySettings[difficulty];
    const adjustedTolerance = currentProblem.tolerance * settings.toleranceMultiplier;
    const rawDifference = answer - currentProblem.targetLog; // 符号付き差分
    const difference = Math.abs(rawDifference);
    const isCorrect = difference <= adjustedTolerance;
    // パーセント誤差を計算 (log差分からパーセントへ: 10^diff - 1)
    const percentError = Math.round((Math.pow(10, difference) - 1) * 100);

    if (isCorrect) {
      // 正解！
      const baseScore = currentProblem.level * 100;
      const streakBonus = streak * 10;
      const accuracyBonus = Math.max(0, Math.floor((adjustedTolerance - difference) * 100));
      const totalScore = baseScore + streakBonus + accuracyBonus;
      
      setScore(prev => prev + totalScore);
      setStreak(prev => prev + 1);
      setMaxStreak(prev => Math.max(prev, streak + 1));
      setQuestionsAnswered(prev => prev + 1);
      setUsedProblems(prev => [...prev, currentProblem.id]);
      
      setFeedback({
        type: 'success',
        message: '正解！',
        difference,
        rawDifference,
        percentError,
        scoreGained: totalScore,
        breakdown: { baseScore, streakBonus, accuracyBonus }
      });
    } else {
      // 不正解
      const errorPenalty = Math.min(difference, MAX_ERROR) * settings.errorPenalty;
      const newErrorStock = Math.max(0, errorStock - errorPenalty);
      
      setErrorStock(newErrorStock);
      setStreak(0);
      setQuestionsAnswered(prev => prev + 1);
      setUsedProblems(prev => [...prev, currentProblem.id]);
      
      setFeedback({
        type: 'wrong',
        message: `不正解... 正解は ${currentProblem.targetLog}`,
        difference,
        rawDifference,
        percentError,
        errorLost: errorPenalty.toFixed(1)
      });

      // ゲームオーバーチェック
      if (newErrorStock <= 0) {
        setTimeout(() => {
          setGameState('gameOver');
          // 記録を保存
          updateSurvivalRecord({
            score,
            questionsAnswered,
            maxStreak: Math.max(maxStreak, streak),
            difficulty,
            timeElapsed,
            date: new Date().toISOString()
          });
        }, 2000);
      }
    }
  };

  // 次の問題へ
  const nextQuestion = () => {
    const nextProblem = getNextProblem();
    if (nextProblem) {
      setCurrentProblem(nextProblem);
      setUserAnswer('');
      setShowHint(false);
      setFeedback(null);
    } else {
      setGameState('gameOver');
    }
  };

  // 時間フォーマット
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // メニュー画面
  if (gameState === 'menu') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-primary hover:text-blue-600"
        >
          <ArrowLeft size={20} />
          <span>モード選択に戻る</span>
        </button>

        <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Flame size={48} />
            <div>
              <h2 className="text-3xl font-bold">サバイバルモード</h2>
              <p className="text-red-100">誤差残機がなくなるまで問題を解き続けろ！</p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4 mt-4">
            <h3 className="font-bold mb-2">📋 ルール</h3>
            <ul className="text-sm space-y-1 text-red-100">
              <li>• 初期残機: <strong className="text-white">10.0</strong></li>
              <li>• 不正解時、誤差の分だけ残機が減少</li>
              <li>• 連続正解でボーナスポイント！</li>
              <li>• 残機が0になったらゲームオーバー</li>
            </ul>
          </div>
        </div>

        {/* 難易度選択 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">難易度選択</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(difficultySettings).map(([key, setting]) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  difficulty === key
                    ? 'border-primary bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{setting.emoji}</div>
                <div className="font-bold text-gray-800">{setting.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Lv.{setting.levels.join(', ')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* カテゴリ選択 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">カテゴリ選択</h3>
          <div className="flex flex-wrap gap-2">
            {PROBLEM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  category === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ハイスコア表示 */}
        {userProgress.survivalRecord && (
          <div className="bg-yellow-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center space-x-2">
              <Trophy size={24} />
              <span>ベストスコア</span>
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-600">
                  {userProgress.survivalRecord.score}
                </div>
                <div className="text-sm text-yellow-700">スコア</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600">
                  {userProgress.survivalRecord.questionsAnswered}
                </div>
                <div className="text-sm text-yellow-700">問題数</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600">
                  {userProgress.survivalRecord.maxStreak}
                </div>
                <div className="text-sm text-yellow-700">最大連続</div>
              </div>
            </div>
          </div>
        )}

        {/* スタートボタン */}
        <button
          onClick={startGame}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
        >
          🔥 ゲームスタート
        </button>
      </div>
    );
  }

  // ゲームオーバー画面
  if (gameState === 'gameOver') {
    const isNewRecord = !userProgress.survivalRecord || score > userProgress.survivalRecord.score;
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">ゲームオーバー</h2>
          
          {isNewRecord && (
            <div className="bg-yellow-500 text-yellow-900 rounded-xl p-4 mb-6 animate-pulse">
              <Trophy size={32} className="inline mr-2" />
              <span className="text-xl font-bold">🎉 新記録達成！</span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-4xl font-bold text-yellow-400">{score}</div>
              <div className="text-gray-400">スコア</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-4xl font-bold text-blue-400">{questionsAnswered}</div>
              <div className="text-gray-400">回答数</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-4xl font-bold text-green-400">{maxStreak}</div>
              <div className="text-gray-400">最大連続</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-4xl font-bold text-purple-400">{formatTime(timeElapsed)}</div>
              <div className="text-gray-400">プレイ時間</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center space-x-2"
            >
              <RotateCcw size={20} />
              <span>もう一度</span>
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="px-8 py-3 bg-white/20 rounded-xl font-bold hover:bg-white/30 transition-all"
            >
              メニューに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  // プレイ中画面
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* ステータスバー */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          {/* 誤差残機 */}
          <div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Heart className={`${errorStock <= 3 ? 'text-red-500 animate-pulse' : 'text-red-400'}`} size={20} />
              <span className={`text-2xl font-bold ${errorStock <= 3 ? 'text-red-500' : 'text-gray-800'}`}>
                {errorStock.toFixed(1)}
              </span>
            </div>
            <div className="text-xs text-gray-500">残機</div>
            {/* 残機バー */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full transition-all ${
                  errorStock <= 3 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${(errorStock / INITIAL_LIVES) * 100}%` }}
              />
            </div>
          </div>

          {/* スコア */}
          <div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target className="text-yellow-500" size={20} />
              <span className="text-2xl font-bold text-gray-800">{score}</span>
            </div>
            <div className="text-xs text-gray-500">スコア</div>
          </div>

          {/* 連続正解 */}
          <div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Zap className={`${streak >= 3 ? 'text-yellow-500 animate-bounce' : 'text-gray-400'}`} size={20} />
              <span className="text-2xl font-bold text-gray-800">{streak}</span>
            </div>
            <div className="text-xs text-gray-500">連続</div>
          </div>

          {/* タイマー */}
          <div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Timer className="text-blue-500" size={20} />
              <span className="text-2xl font-bold text-gray-800">{formatTime(timeElapsed)}</span>
            </div>
            <div className="text-xs text-gray-500">経過</div>
          </div>
        </div>
      </div>

      {/* 問題カード */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            LEVELS.find(l => l.id === currentProblem?.level)?.color === 'green' ? 'bg-green-100 text-green-700' :
            LEVELS.find(l => l.id === currentProblem?.level)?.color === 'blue' ? 'bg-blue-100 text-blue-700' :
            LEVELS.find(l => l.id === currentProblem?.level)?.color === 'purple' ? 'bg-purple-100 text-purple-700' :
            LEVELS.find(l => l.id === currentProblem?.level)?.color === 'orange' ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          }`}>
            {LEVELS.find(l => l.id === currentProblem?.level)?.emoji} Lv.{currentProblem?.level}
          </span>
          <span className="text-gray-500 text-sm">Q{questionsAnswered + 1}</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {currentProblem?.title}
        </h3>
        <p className="text-gray-700 mb-6">
          {currentProblem?.description}
        </p>

        {/* 回答フォーム */}
        {!feedback && (
          <>
            <div className="flex space-x-4 mb-4">
              <input
                type="number"
                step="0.01"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Log値を入力 (例: 3.5)"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                autoFocus
              />
              <button
                onClick={checkAnswer}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 font-bold transition-colors"
              >
                回答
              </button>
            </div>

            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700"
            >
              <Lightbulb size={20} />
              <span>{showHint ? 'ヒントを隠す' : 'ヒントを見る'}</span>
            </button>

            {showHint && (
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-yellow-900">{currentProblem?.hint}</p>
              </div>
            )}
          </>
        )}

        {/* フィードバック */}
        {feedback && (
          <div>
            {feedback.type === 'success' ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={32} />
                  <div>
                    <p className="text-xl font-bold text-green-900">{feedback.message}</p>
                    <p className="text-green-700">
                      +{feedback.scoreGained}pt ({feedback.percentError}%の誤差 / {feedback.rawDifference >= 0 ? '+' : ''}{feedback.rawDifference.toFixed(2)})
                    </p>
                  </div>
                </div>
              </div>
            ) : feedback.type === 'wrong' ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                  <XCircle className="text-red-600" size={32} />
                  <div>
                    <p className="text-xl font-bold text-red-900">{feedback.message}</p>
                    <p className="text-red-700">
                      残機 -{feedback.errorLost} ({feedback.percentError}%の誤差 / {feedback.rawDifference >= 0 ? '+' : ''}{feedback.rawDifference.toFixed(2)})
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* 解説 */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-bold text-blue-900 mb-2">解説</h4>
              <p className="text-gray-700 whitespace-pre-line text-sm">
                {currentProblem?.explanation}
              </p>
            </div>

            {/* 次へボタン */}
            {errorStock > 0 && (
              <button
                onClick={nextQuestion}
                className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                次の問題へ →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurvivalMode;
