import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Zap, MapPin, Timer, Cpu, Calculator, Rocket, History, CheckCircle, Award, ArrowRight, RotateCcw, Dice6 } from 'lucide-react';
import { LOG_MAP, getAccuracyColor, getAccuracyBgColor } from '../data/constants';
import { useApp } from '../context/AppContext';

const LearnMode = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const { 
    markChapterCompleted, 
    updateChapterProgress, 
    isChapterCompleted, 
    getLearningProgress,
    userProgress,
    setCurrentView,
  } = useApp();

  // 章の定義
  const chapters = [
    {
      id: 'basics',
      title: 'Log算の基礎',
      icon: <Calculator size={24} />,
      color: 'blue',
      slides: basicSlides,
    },
    {
      id: 'physics',
      title: '物理単位の基礎',
      icon: <Zap size={24} />,
      color: 'indigo',
      slides: physicsUnitSlides,
    },
    {
      id: 'time',
      title: '時間の感覚',
      icon: <Timer size={24} />,
      color: 'green',
      slides: timeSlides,
    },
    {
      id: 'speed',
      title: '速度の感覚',
      icon: <Rocket size={24} />,
      color: 'emerald',
      slides: speedSlides,
    },
    {
      id: 'distance',
      title: '距離・スケール',
      icon: <MapPin size={24} />,
      color: 'purple',
      slides: distanceSlides,
    },
    {
      id: 'history',
      title: '時間と歴史',
      icon: <History size={24} />,
      color: 'amber',
      slides: historySlides,
    },
    {
      id: 'area',
      title: '面積の感覚',
      icon: <MapPin size={24} />,
      color: 'yellow',
      slides: areaSlides,
    },
    {
      id: 'energy',
      title: 'エネルギーと電力',
      icon: <Zap size={24} />,
      color: 'orange',
      slides: energySlides,
    },
    {
      id: 'it',
      title: 'IT・データ',
      icon: <Cpu size={24} />,
      color: 'cyan',
      slides: itSlides,
    },
    {
      id: 'units',
      title: '単位変換マスター',
      icon: <BookOpen size={24} />,
      color: 'red',
      slides: unitSlides,
    },
    {
      id: 'probability',
      title: '確率とe',
      icon: <Dice6 size={24} />,
      color: 'rose',
      slides: probabilitySlides,
    },
  ];

  const currentChapter = chapters.find(c => c.id === selectedChapter);
  const currentChapterIndex = chapters.findIndex(c => c.id === selectedChapter);
  const nextChapter = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;
  const slides = currentChapter?.slides || [];
  const learningProgress = getLearningProgress(chapters);

  // スライド進捗を保存
  useEffect(() => {
    if (selectedChapter && slides.length > 0) {
      updateChapterProgress(selectedChapter, currentSlide, slides.length);
    }
  }, [currentSlide, selectedChapter]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const selectChapter = (chapterId) => {
    setSelectedChapter(chapterId);
    setCurrentSlide(0);
    setShowCompletion(false);
  };

  const completeChapter = () => {
    markChapterCompleted(selectedChapter);
    setShowCompletion(true);
  };

  const goToNextChapter = () => {
    if (nextChapter) {
      selectChapter(nextChapter.id);
    }
  };

  // おすすめの次の章を取得
  const getRecommendedChapters = () => {
    return chapters.filter(c => !isChapterCompleted(c.id)).slice(0, 3);
  };

  // 章選択画面
  if (!selectedChapter) {
    const recommendedChapters = getRecommendedChapters();
    
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">学習モード</h2>
        <p className="text-gray-600 mb-4">Log算の基礎から応用まで、段階的に学ぼう！</p>

        {/* 学習進捗バー */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Award className="text-yellow-500" size={24} />
              <span className="font-bold text-gray-800">学習進捗</span>
            </div>
            <span className="text-lg font-bold text-blue-600">
              {learningProgress.completedCount} / {learningProgress.totalChapters} 章完了
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${learningProgress.percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {learningProgress.percentage === 100 
              ? '🎉 すべての章を完了しました！実戦モードで腕試ししましょう！'
              : `あと ${learningProgress.totalChapters - learningProgress.completedCount} 章で全完了！`}
          </p>
        </div>

        {/* おすすめの章 */}
        {recommendedChapters.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <span>📚</span>
              <span>おすすめの次の章</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => selectChapter(chapter.id)}
                  className={`p-5 rounded-xl shadow-lg text-left transition-all hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                    chapter.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    chapter.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                    chapter.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                    chapter.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                    chapter.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    chapter.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' :
                    chapter.color === 'indigo' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600' :
                    chapter.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                    chapter.color === 'amber' ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                    'bg-gradient-to-br from-red-500 to-red-600'
                  } text-white`}
                >
                  {index === 0 && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                      おすすめ
                    </div>
                  )}
                  <div className="mb-3">{chapter.icon}</div>
                  <h3 className="text-lg font-bold mb-1">{chapter.title}</h3>
                  <p className="text-white/80 text-sm">{chapter.slides.length} スライド</p>
                  <div className="mt-3 flex items-center text-white/90 text-sm">
                    <ArrowRight size={16} className="mr-1" />
                    <span>学習を始める</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* すべての章 */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">すべての章</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {chapters.map((chapter) => {
            const completed = isChapterCompleted(chapter.id);
            const progress = userProgress.chapterProgress?.[chapter.id];
            
            return (
              <button
                key={chapter.id}
                onClick={() => selectChapter(chapter.id)}
                className={`p-5 rounded-xl shadow-lg text-left transition-all hover:scale-105 hover:shadow-xl relative ${
                  chapter.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  chapter.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                  chapter.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                  chapter.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                  chapter.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  chapter.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' :
                  chapter.color === 'indigo' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600' :
                  chapter.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                  chapter.color === 'amber' ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                  'bg-gradient-to-br from-red-500 to-red-600'
                } text-white`}
              >
                {completed && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle size={24} className="text-white drop-shadow-lg" />
                  </div>
                )}
                <div className="mb-3">{chapter.icon}</div>
                <h3 className="text-lg font-bold mb-1">{chapter.title}</h3>
                <p className="text-white/80 text-sm">
                  {chapter.slides.length} スライド
                </p>
                {completed ? (
                  <div className="mt-2 flex items-center text-green-200 text-sm">
                    <CheckCircle size={14} className="mr-1" />
                    <span>完了済み</span>
                  </div>
                ) : progress?.lastSlide !== undefined ? (
                  <div className="mt-2">
                    <div className="w-full bg-white/30 rounded-full h-1.5">
                      <div 
                        className="bg-white h-1.5 rounded-full"
                        style={{ width: `${((progress.lastSlide + 1) / chapter.slides.length) * 100}%` }}
                      />
                    </div>
                    <p className="text-white/70 text-xs mt-1">
                      {progress.lastSlide + 1} / {chapter.slides.length} スライド
                    </p>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* クイックリファレンス */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🔑 絶対に覚える定数</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickCard value="2" log="0.3" note="基本中の基本" />
            <QuickCard value="1日" log="4.9" note="≈5で概算OK" />
            <QuickCard value="1年" log="7.5" note="π×10⁷秒" />
            <QuickCard value="1GB" log="9.0" note="10⁹バイト" />
          </div>
        </div>
      </div>
    );
  }

  // 章完了画面
  if (showCompletion) {
    const recommendedChapters = getRecommendedChapters();
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 章を完了しました！</h2>
            <p className="text-xl text-gray-600">{currentChapter?.title}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-4">
              <Award size={32} className="text-yellow-500" />
              <div>
                <p className="text-lg font-bold text-gray-800">学習進捗</p>
                <p className="text-2xl font-bold text-blue-600">
                  {learningProgress.completedCount} / {learningProgress.totalChapters} 章完了
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${learningProgress.percentage}%` }}
              />
            </div>
          </div>

          {/* 次のアクション */}
          <div className="space-y-4">
            {nextChapter && (
              <button
                onClick={goToNextChapter}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all"
              >
                <span>次の章へ進む: {nextChapter.title}</span>
                <ArrowRight size={24} />
              </button>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setCurrentSlide(0);
                  setShowCompletion(false);
                }}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <RotateCcw size={20} />
                <span>この章を復習</span>
              </button>

              <button
                onClick={() => setSelectedChapter(null)}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <BookOpen size={20} />
                <span>章選択に戻る</span>
              </button>
            </div>

            <button
              onClick={() => setCurrentView('practice')}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
            >
              <Zap size={20} />
              <span>実戦モードで腕試し</span>
            </button>
          </div>

          {/* おすすめの章 */}
          {recommendedChapters.length > 0 && !nextChapter && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📚 おすすめの章</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedChapters.slice(0, 3).map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => selectChapter(chapter.id)}
                    className={`p-4 rounded-xl text-left transition-all hover:scale-105 ${
                      chapter.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      chapter.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      chapter.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                      chapter.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                      chapter.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      chapter.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' :
                      chapter.color === 'indigo' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600' :
                      chapter.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                      chapter.color === 'amber' ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                      'bg-gradient-to-br from-red-500 to-red-600'
                    } text-white`}
                  >
                    <div className="text-sm">{chapter.icon}</div>
                    <h4 className="font-bold">{chapter.title}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // スライド表示
  const isLastSlide = currentSlide === slides.length - 1;
  const isCompleted = isChapterCompleted(selectedChapter);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => setSelectedChapter(null)}
        className="mb-6 text-primary hover:text-blue-600 flex items-center space-x-2"
      >
        <span>← 章選択に戻る</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-800">
              {slides[currentSlide]?.title}
            </h2>
            {isCompleted && (
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle size={16} className="mr-1" />
                <span>完了済み</span>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-blue-500 w-8'
                    : index < currentSlide
                    ? 'bg-blue-300 w-2 hover:bg-blue-400'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">
          {slides[currentSlide]?.content}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
            <span>前へ</span>
          </button>

          <div className="text-gray-600">
            {currentSlide + 1} / {slides.length}
          </div>

          {isLastSlide ? (
            <button
              onClick={completeChapter}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all font-bold"
            >
              <CheckCircle size={20} />
              <span>{isCompleted ? '完了画面へ' : '章を完了する'}</span>
            </button>
          ) : (
            <button
              onClick={nextSlide}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <span>次へ</span>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// クイックカードコンポーネント
const QuickCard = ({ value, log, note }) => (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-200">
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xl text-primary font-mono">= {log}</p>
    <p className="text-xs text-gray-500 mt-1">{note}</p>
  </div>
);

// 定数カード
const ConstantCard = ({ number, logValue, description }) => (
  <div className="bg-white p-4 rounded-lg shadow border-2 border-blue-200">
    <p className="text-3xl font-bold text-blue-600">{number}</p>
    <p className="text-xl text-gray-700 mt-1">= {logValue}</p>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

// ==========================================
// 各章のスライドデータ
// ==========================================

// 物理単位の基礎スライド
const physicsUnitSlides = [
  {
    title: '単位の基礎：W, J, Whの関係',
    content: (
      <div className="space-y-4">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">⚡ エネルギーと電力の関係</p>
          <div className="space-y-4 text-lg">
            <div className="bg-white p-4 rounded-lg border-2 border-indigo-300">
              <p className="font-bold text-indigo-700">電力 (W) = エネルギー (J) ÷ 時間 (s)</p>
              <p className="text-gray-600 mt-2">1 W = 1 J/s （1秒あたり1ジュール）</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-indigo-300">
              <p className="font-bold text-indigo-700">エネルギー (J) = 電力 (W) × 時間 (s)</p>
              <p className="text-gray-600 mt-2">ワット秒 = ジュール</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 覚え方</p>
          <p>W（ワット）は「仕事の速さ」、J（ジュール）は「仕事の量」</p>
        </div>
      </div>
    ),
  },
  {
    title: '🔑 超重要：Wh = W × 3600s = J',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-lg">
          <p className="text-2xl font-bold text-red-700 mb-4">Wh と J の変換</p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl font-mono text-center">
              1 Wh = 1 W × 1時間 = 1 W × 3600秒 = <span className="text-red-600 font-bold">3600 J</span>
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold">1 kWh</p>
              <p className="font-mono">= 1000W × 3600s</p>
              <p className="font-mono text-red-600">= 3,600,000 J = 3.6 MJ</p>
              <p className="text-sm text-gray-500">log = 6.56</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold">1 Wh</p>
              <p className="font-mono">= 1W × 3600s</p>
              <p className="font-mono text-red-600">= 3,600 J = 3.6 kJ</p>
              <p className="text-sm text-gray-500">log = 3.56</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-bold">📝 Log算での変換</p>
          <p className="font-mono">Wh → J: +3.56 (1時間 = 3600秒)</p>
          <p className="font-mono">kWh → J: +6.56 (= +3 + 3.56)</p>
        </div>
      </div>
    ),
  },
  {
    title: 'm/s と km/h の変換',
    content: (
      <div className="space-y-4">
        <div className="bg-emerald-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🚗 速度の単位変換</p>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <p className="text-lg">
              1 km/h = 1000m ÷ 3600s = <span className="font-bold text-emerald-600">1/3.6 m/s</span>
            </p>
            <p className="mt-2 text-lg">
              1 m/s = <span className="font-bold text-emerald-600">3.6 km/h</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold">km/h → m/s</p>
              <p className="font-mono text-emerald-600">÷ 3.6</p>
              <p className="text-sm text-gray-500">log差: -0.56 (約-0.5)</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold">m/s → km/h</p>
              <p className="font-mono text-emerald-600">× 3.6</p>
              <p className="text-sm text-gray-500">log差: +0.56 (約+0.5)</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-bold">📝 例: 時速100km = ?m/s</p>
          <p className="font-mono">log(100) - 0.56 = 2 - 0.56 = 1.44 → 約28m/s</p>
        </div>
      </div>
    ),
  },
  {
    title: '力学の基本公式',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🔬 覚えるべき物理公式</p>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold">運動エネルギー</p>
              <p className="font-mono">E = ½mv²</p>
              <p className="text-sm text-gray-500">log(E) = log(m) + 2×log(v) - 0.3</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold">位置エネルギー</p>
              <p className="font-mono">E = mgh</p>
              <p className="text-sm text-gray-500">log(E) = log(m) + log(g) + log(h)、g≈10なのでlog(g)≈1</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold">自由落下時間</p>
              <p className="font-mono">t = √(2h/g)</p>
              <p className="text-sm text-gray-500">log(t) = 0.5×(log(2h) - 1)</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const basicSlides = [
  {
    title: 'Log算へようこそ！',
    content: (
      <div className="space-y-4">
        <p className="text-lg">
          <strong>Log算</strong>とは、対数（Logarithm）を使って複雑な計算を簡単にする手法です。
        </p>
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-2xl font-bold text-blue-900 mb-2">🎯 目的</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>巨大な数を扱いやすくする</li>
            <li>掛け算・割り算を足し算・引き算に変換</li>
            <li>累乗・ルートも簡単に計算</li>
            <li>フェルミ推定を素早く行う</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 なぜLog算？</p>
          <p className="text-gray-700 mt-2">
            「1年は何秒？」「地球の体積は？」<br/>
            こんな計算を暗算で即答できるようになります！
          </p>
        </div>
      </div>
    ),
  },
  {
    title: '基本原理：4つの計算ルール',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🔢 対数の4大性質</p>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono text-lg">① log(A × B) = log(A) + log(B)</p>
              <p className="text-sm text-gray-600 ml-4">掛け算 → 足し算</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono text-lg">② log(A ÷ B) = log(A) − log(B)</p>
              <p className="text-sm text-gray-600 ml-4">割り算 → 引き算</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono text-lg">③ log(Aⁿ) = n × log(A)</p>
              <p className="text-sm text-gray-600 ml-4">累乗 → 掛け算</p>
            </div>
            <div className="bg-white p-3 rounded-lg border-2 border-purple-400">
              <p className="font-mono text-lg">④ log(ⁿ√A) = log(A) ÷ n</p>
              <p className="text-sm text-purple-700 ml-4 font-bold">n乗根 → 割り算（超重要！）</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '累乗根の威力：√10 = 0.5',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">📐 ルート（累乗根）がlog算の真骨頂</p>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-center text-2xl font-mono">log(√10) = log(10) ÷ 2 = 1 ÷ 2 = <span className="text-purple-600 font-bold">0.5</span></p>
            <p className="text-center mt-2 text-gray-600">つまり √10 ≈ 10⁰·⁵ ≈ 3.16</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold mb-2">🔢 0.5刻みで世界を見る</p>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white p-2 rounded"><p>10⁰ = 1</p></div>
            <div className="bg-white p-2 rounded"><p>10⁰·⁵ ≈ 3 (√10)</p></div>
            <div className="bg-white p-2 rounded"><p>10¹ = 10</p></div>
            <div className="bg-white p-2 rounded"><p>10¹·⁵ ≈ 30</p></div>
            <div className="bg-white p-2 rounded"><p>10² = 100</p></div>
            <div className="bg-white p-2 rounded"><p>10²·⁵ ≈ 300</p></div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 覚え方</p>
          <p className="text-gray-700 mt-2">
            log値が<strong>+0.5</strong>で約<strong>3倍</strong>！<br/>
            √10 ≈ 3.16 ≈ π と覚えると便利
          </p>
        </div>
      </div>
    ),
  },
  {
    title: '立方根・n乗根も簡単',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">📐 n乗根は「÷n」するだけ</p>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono">³√10 = 10^(1/3) → log = 1÷3 ≈ <span className="font-bold text-purple-600">0.33</span></p>
              <p className="text-sm text-gray-600">³√10 ≈ 2.15</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono">³√1000 = ³√10³ → log = 3÷3 = <span className="font-bold text-purple-600">1.0</span></p>
              <p className="text-sm text-gray-600">³√1000 = 10（確認！）</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-mono">⁴√10000 = ⁴√10⁴ → log = 4÷4 = <span className="font-bold text-purple-600">1.0</span></p>
              <p className="text-sm text-gray-600">⁴√10000 = 10（確認！）</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold mb-2">🌍 応用例：地球の体積から半径を求める</p>
          <p className="text-sm">体積 V ≈ 10²¹ m³ → 半径 r = ³√(3V/4π)</p>
          <p className="text-sm mt-1">log(V) ≈ 21 → ³√ すると log ≈ 7 → 半径 ≈ 10⁷ m = 1万km</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 電卓不要で√や³√が計算できる！</p>
        </div>
      </div>
    ),
  },
  {
    title: 'グラフで理解する対数',
    content: (
      <div className="space-y-4">
        <p className="text-lg">📈 log(x) のグラフを見てみよう（1 ≤ x ≤ 10）</p>
        {/* SVG Graph of log(x) for 1 <= x <= 10 */}
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
          <svg viewBox="0 0 320 220" className="w-full max-w-md mx-auto">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="30" height="20" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect x="40" y="10" width="270" height="180" fill="url(#grid)"/>
            
            {/* Axes */}
            <line x1="40" y1="190" x2="310" y2="190" stroke="#374151" strokeWidth="2"/>
            <line x1="40" y1="10" x2="40" y2="190" stroke="#374151" strokeWidth="2"/>
            
            {/* X-axis labels */}
            <text x="40" y="208" textAnchor="middle" className="text-xs fill-gray-600">1</text>
            <text x="70" y="208" textAnchor="middle" className="text-xs fill-gray-600">2</text>
            <text x="100" y="208" textAnchor="middle" className="text-xs fill-gray-600">3</text>
            <text x="130" y="208" textAnchor="middle" className="text-xs fill-gray-600">4</text>
            <text x="160" y="208" textAnchor="middle" className="text-xs fill-gray-600">5</text>
            <text x="190" y="208" textAnchor="middle" className="text-xs fill-gray-600">6</text>
            <text x="220" y="208" textAnchor="middle" className="text-xs fill-gray-600">7</text>
            <text x="250" y="208" textAnchor="middle" className="text-xs fill-gray-600">8</text>
            <text x="280" y="208" textAnchor="middle" className="text-xs fill-gray-600">9</text>
            <text x="310" y="208" textAnchor="middle" className="text-xs fill-gray-600">10</text>
            <text x="175" y="218" textAnchor="middle" className="text-sm fill-gray-700 font-bold">x</text>
            
            {/* Y-axis labels */}
            <text x="32" y="194" textAnchor="end" className="text-xs fill-gray-600">0</text>
            <text x="32" y="94" textAnchor="end" className="text-xs fill-gray-600">0.5</text>
            <text x="32" y="14" textAnchor="end" className="text-xs fill-gray-600">1.0</text>
            <text x="15" y="100" textAnchor="middle" className="text-sm fill-gray-700 font-bold" transform="rotate(-90, 15, 100)">log(x)</text>
            
            {/* Horizontal guide line at 0.5 */}
            <line x1="40" y1="90" x2="310" y2="90" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4"/>
            
            {/* Log curve */}
            <path 
              d="M 40 190 Q 55 150, 70 136 Q 85 118, 100 104 Q 115 92, 130 82 Q 145 74, 160 68 Q 175 62, 190 56 Q 205 52, 220 48 Q 235 44, 250 40 Q 265 36, 280 34 Q 295 30, 310 26"
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Key point: sqrt(10) at 0.5 */}
            <circle cx="95" cy="90" r="6" fill="#8b5cf6"/>
            <text x="103" y="85" className="text-xs fill-purple-600 font-bold">√10→0.5</text>
            
            {/* Other key points */}
            <circle cx="70" cy="136" r="4" fill="#ef4444"/>
            <text x="78" y="145" className="text-xs fill-red-600">2→0.3</text>
            
            <circle cx="160" cy="68" r="4" fill="#22c55e"/>
            <text x="168" y="63" className="text-xs fill-green-600">5→0.7</text>
          </svg>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="font-bold">💡 ポイント</p>
          <p className="text-gray-700 mt-2">
            <strong>0.5のライン</strong>が√10 ≈ 3.16の位置。<br/>
            これを基準に上下を見ると数の大きさがわかる！
          </p>
        </div>
      </div>
    ),
  },
  {
    title: '覚えるべき基本定数',
    content: (
      <div className="space-y-4">
        <p className="text-lg">🔑 これだけ覚えればOK！</p>
        <div className="grid grid-cols-2 gap-4">
          <ConstantCard number="2" logValue="0.3" description="🌟 最重要！" />
          <ConstantCard number="3" logValue="0.48" description="約0.5でOK" />
          <ConstantCard number="5" logValue="0.7" description="= 10÷2" />
          <ConstantCard number="7" logValue="0.85" description="約0.9でOK" />
        </div>
        <div className="bg-green-50 p-6 rounded-lg mt-4">
          <p className="font-bold mb-2">📝 組み合わせで導出：</p>
          <p>4 = 2² → log(4) = 2 × 0.3 = <strong>0.6</strong></p>
          <p className="mt-2">6 = 2×3 → log(6) = 0.3 + 0.5 = <strong>0.8</strong></p>
          <p className="mt-2">8 = 2³ → log(8) = 3 × 0.3 = <strong>0.9</strong></p>
          <p className="mt-2">9 = 3² → log(9) = 2 × 0.5 = <strong>1.0 (≒0.95)</strong></p>
        </div>
      </div>
    ),
  },
  {
    title: '変換表の読み方',
    content: (
      <div className="space-y-4">
        <p className="text-lg">📊 2つの変換表を使いこなそう</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-bold text-green-800 mb-2">🔢 x → log(x) 表</p>
            <p className="text-sm text-gray-700">数値からlog値を調べる</p>
            <div className="mt-2 bg-white p-2 rounded text-center font-mono">
              2.5 → <span className="text-green-600 font-bold">0.40</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">掛け算・割り算の前に使う</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-bold text-purple-800 mb-2">🔄 log → 10^log 表</p>
            <p className="text-sm text-gray-700">log値から元の数値を調べる</p>
            <div className="mt-2 bg-white p-2 rounded text-center font-mono">
              0.40 → <span className="text-purple-600 font-bold">2.51</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">計算結果を数値に戻すとき使う</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">📝 計算の流れ</p>
          <div className="mt-2 text-gray-700 space-y-1">
            <p>① 各数値をlog値に変換（x → log表）</p>
            <p>② log値で足し算・引き算・掛け算・割り算</p>
            <p>③ 結果を数値に戻す（log → 10^log表）</p>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm">👉 リファレンスページで両方の変換表を確認できます！</p>
        </div>
      </div>
    ),
  },
  {
    title: '実践例：複雑な計算を一発で',
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-bold text-lg mb-2">📝 例題: √(200 × 50) = ?</p>
        </div>
        <div className="bg-white border-2 border-blue-200 p-4 rounded-lg">
          <p className="font-bold mb-2">Step 1: log値に変換</p>
          <p className="font-mono">log(200) = log(2×100) = 0.3 + 2 = 2.3</p>
          <p className="font-mono">log(50) = log(5×10) = 0.7 + 1 = 1.7</p>
        </div>
        <div className="bg-white border-2 border-blue-200 p-4 rounded-lg">
          <p className="font-bold mb-2">Step 2: 掛け算 → 足し算</p>
          <p className="font-mono">log(200 × 50) = 2.3 + 1.7 = 4.0</p>
        </div>
        <div className="bg-white border-2 border-purple-200 p-4 rounded-lg">
          <p className="font-bold mb-2">Step 3: √ → ÷2</p>
          <p className="font-mono">log(√(200×50)) = 4.0 ÷ 2 = <span className="text-purple-600 font-bold">2.0</span></p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold">✅ 答え: 10² = <span className="text-2xl text-green-600">100</span></p>
          <p className="text-sm text-gray-600 mt-1">（確認: √10000 = 100 ✓）</p>
        </div>
      </div>
    ),
  },
  {
    title: '🗺️ 9×10 対数変換マップ',
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-lg font-bold mb-2">1.0〜9.9のlog値を一覧表示</p>
          <p className="text-sm text-gray-600">
            色分け: <span className="text-red-600 font-bold">赤↑</span>=真値は上（切り捨て）、
            <span className="text-blue-600 font-bold">青↓</span>=真値は下（切り上げ）、
            <span className="text-gray-900 font-bold">黒</span>=ほぼ正確
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300 font-bold">n \\ .x</th>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(col => (
                  <th key={col} className="p-2 border border-gray-300 font-bold">.{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LOG_MAP.map((row, rowIdx) => (
                <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 border border-gray-300 font-bold text-center bg-gray-100">{rowIdx + 1}</td>
                  {row.map((cell, colIdx) => (
                    <td 
                      key={colIdx} 
                      className={`p-2 border border-gray-300 text-center font-mono ${getAccuracyColor(cell.accuracy)}`}
                    >
                      {cell.log}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 使い方</p>
          <p className="text-sm">例: log(4.2) → 4行目の.2列 = <span className="font-bold text-red-600">0.62</span></p>
          <p className="text-sm mt-1">このマップで任意の1-9.9の対数値がすぐわかる！</p>
        </div>
      </div>
    ),
  },
];

const timeSlides = [
  {
    title: '時間の感覚を養おう',
    content: (
      <div className="space-y-4">
        <div className="bg-green-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">⏰ 覚えるべき時間の定数</p>
          <table className="w-full text-left">
            <tbody className="space-y-2">
              <tr className="border-b"><td className="py-2">1分</td><td className="font-mono">60秒</td><td className="font-bold text-green-600">≈ 1.8</td></tr>
              <tr className="border-b"><td className="py-2">1時間</td><td className="font-mono">3,600秒</td><td className="font-bold text-green-600">≈ 3.5</td></tr>
              <tr className="border-b bg-yellow-50"><td className="py-2 font-bold">1日 🔑</td><td className="font-mono">86,400秒</td><td className="font-bold text-green-600">≈ 4.9 (≈5)</td></tr>
              <tr className="border-b"><td className="py-2">1週間</td><td className="font-mono">60万秒</td><td className="font-bold text-green-600">≈ 5.8</td></tr>
              <tr className="border-b"><td className="py-2">1ヶ月</td><td className="font-mono">260万秒</td><td className="font-bold text-green-600">≈ 6.4</td></tr>
              <tr className="bg-yellow-50"><td className="py-2 font-bold">1年 🔑</td><td className="font-mono">3150万秒</td><td className="font-bold text-green-600">≈ 7.5</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="font-bold">💡 覚え方</p>
          <p>1年 ≈ π × 10⁷秒 (円周率×1000万)</p>
        </div>
      </div>
    ),
  },
  {
    title: '時間の計算例',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="font-bold text-xl mb-4">例題1: 1週間は何秒？</p>
          <div className="space-y-2">
            <p>1週間 = 7日</p>
            <p>log(7) + log(1日) = 0.85 + 4.9 = <strong>5.75</strong></p>
            <p className="text-gray-600">→ 10⁵·⁷⁵ ≈ 56万秒</p>
          </div>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg">
          <p className="font-bold text-xl mb-4">例題2: 人の寿命は何秒？</p>
          <div className="space-y-2">
            <p>80年 = 80 × 1年</p>
            <p>log(80) + 7.5 = 1.9 + 7.5 = <strong>9.4</strong></p>
            <p className="text-gray-600">→ 10⁹·⁴ ≈ 25億秒</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold">🎯 チェック</p>
          <p>人生は約25億秒。1秒を大切に！</p>
        </div>
      </div>
    ),
  },
];

const areaSlides = [
  {
    title: '面積の感覚を養おう',
    content: (
      <div className="space-y-4">
        <div className="bg-yellow-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">📐 身近な面積（基準: m²）</p>
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2">A4用紙</td><td>0.06m²</td><td className="font-bold text-yellow-600">-1.2</td></tr>
              <tr className="border-b"><td className="py-2">畳1枚</td><td>1.6m²</td><td className="font-bold text-yellow-600">0.2</td></tr>
              <tr className="border-b bg-yellow-100"><td className="py-2 font-bold">6畳部屋 🔑</td><td>≈10m²</td><td className="font-bold text-yellow-600">1.0</td></tr>
              <tr className="border-b"><td className="py-2">テニスコート</td><td>260m²</td><td className="font-bold text-yellow-600">2.4</td></tr>
              <tr className="border-b"><td className="py-2">サッカー場</td><td>7,000m²</td><td className="font-bold text-yellow-600">3.85</td></tr>
              <tr className="bg-yellow-100"><td className="py-2 font-bold">東京ドーム 🔑</td><td>47,000m²</td><td className="font-bold text-yellow-600">4.67</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="font-bold">💡 覚え方</p>
          <p>6畳 ≈ 10m² (log=1.0) を基準に考える</p>
        </div>
      </div>
    ),
  },
  {
    title: '大きな面積',
    content: (
      <div className="space-y-4">
        <div className="bg-green-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🗺️ 地域・国の面積（基準: m²）</p>
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2">1km²</td><td>10⁶m²</td><td className="font-bold text-green-600">6.0</td></tr>
              <tr className="border-b"><td className="py-2">皇居</td><td>1.15km²</td><td className="font-bold text-green-600">6.06</td></tr>
              <tr className="border-b"><td className="py-2">山手線内側</td><td>63km²</td><td className="font-bold text-green-600">7.8</td></tr>
              <tr className="border-b"><td className="py-2">東京都</td><td>2,194km²</td><td className="font-bold text-green-600">9.34</td></tr>
              <tr className="border-b bg-green-100"><td className="py-2 font-bold">日本 🔑</td><td>37.8万km²</td><td className="font-bold text-green-600">11.58</td></tr>
              <tr className="border-b"><td className="py-2">アメリカ</td><td>983万km²</td><td className="font-bold text-green-600">13.0</td></tr>
              <tr><td className="py-2">地球表面</td><td>5.1億km²</td><td className="font-bold text-green-600">14.71</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-bold">📝 計算例</p>
          <p>アメリカは日本の何倍？</p>
          <p className="font-mono mt-1">13.0 - 11.58 = 1.42 → 10¹·⁴² ≈ <strong>26倍</strong></p>
        </div>
      </div>
    ),
  },
  {
    title: '面積の単位変換',
    content: (
      <div className="space-y-4">
        <div className="bg-orange-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🔄 単位変換のLog値</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded">
              <span>1ha = 10,000m²</span>
              <span className="font-bold text-orange-600">+4.0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded">
              <span>1km² = 1,000,000m²</span>
              <span className="font-bold text-orange-600">+6.0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded">
              <span>1km² = 100ha</span>
              <span className="font-bold text-orange-600">+2.0</span>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="font-bold">💡 東京ドームで計算</p>
          <p>東京ドーム = 4.7ha ≈ 5ha</p>
          <p>皇居 = 115ha → 115÷5 ≈ <strong>23個分</strong></p>
        </div>
      </div>
    ),
  },
];

const energySlides = [
  {
    title: 'エネルギーの感覚',
    content: (
      <div className="space-y-4">
        <div className="bg-orange-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">⚡ エネルギー（基準: J = Ws）</p>
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2">1cal</td><td>4.18J</td><td className="font-bold text-orange-600">0.62</td></tr>
              <tr className="border-b bg-orange-100"><td className="py-2 font-bold">1kcal 🔑</td><td>4,180J</td><td className="font-bold text-orange-600">3.62</td></tr>
              <tr className="border-b"><td className="py-2">おにぎり1個</td><td>750kJ</td><td className="font-bold text-orange-600">5.88</td></tr>
              <tr className="border-b"><td className="py-2">1日の食事</td><td>8.4MJ</td><td className="font-bold text-orange-600">6.92</td></tr>
              <tr className="border-b bg-orange-100"><td className="py-2 font-bold">1kWh 🔑</td><td>3.6MJ</td><td className="font-bold text-orange-600">6.56</td></tr>
              <tr className="border-b"><td className="py-2">ガソリン1L</td><td>34MJ</td><td className="font-bold text-orange-600">7.53</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 覚え方</p>
          <p>1kcal ≈ 4kJ (log差 ≈ 3.6)</p>
          <p>1kWh = 3.6MJ (電力量の基本)</p>
        </div>
      </div>
    ),
  },
  {
    title: '電力（仕事率）の感覚',
    content: (
      <div className="space-y-4">
        <div className="bg-red-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🔌 電力（基準: W = J/s）</p>
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2">スマホ充電（低速）</td><td>5W</td><td className="font-bold text-red-600">0.7</td></tr>
              <tr className="border-b"><td className="py-2">LED電球</td><td>10W</td><td className="font-bold text-red-600">1.0</td></tr>
              <tr className="border-b"><td className="py-2">急速充電</td><td>20W</td><td className="font-bold text-red-600">1.3</td></tr>
              <tr className="border-b bg-red-100"><td className="py-2 font-bold">人間 🔑</td><td>80W</td><td className="font-bold text-red-600">1.9</td></tr>
              <tr className="border-b"><td className="py-2">ノートPC</td><td>50W</td><td className="font-bold text-red-600">1.7</td></tr>
              <tr className="border-b"><td className="py-2">エアコン</td><td>1kW</td><td className="font-bold text-red-600">3.0</td></tr>
              <tr><td className="py-2">家庭ピーク</td><td>3kW</td><td className="font-bold text-red-600">3.5</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-bold">🧠 面白い事実</p>
          <p>人間 ≈ 80W電球と同じ発熱！</p>
        </div>
      </div>
    ),
  },
  {
    title: '発電所の規模',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🏭 大規模電力（基準: W）</p>
          <table className="w-full text-left text-sm">
            <tbody>
              <tr className="border-b"><td className="py-2">風力発電1基</td><td>2MW</td><td className="font-bold text-purple-600">6.3</td></tr>
              <tr className="border-b"><td className="py-2">メガソーラー</td><td>10MW</td><td className="font-bold text-purple-600">7.0</td></tr>
              <tr className="border-b"><td className="py-2">大規模DC</td><td>100MW</td><td className="font-bold text-purple-600">8.0</td></tr>
              <tr className="border-b"><td className="py-2">火力発電所</td><td>500MW</td><td className="font-bold text-purple-600">8.7</td></tr>
              <tr className="border-b bg-purple-100"><td className="py-2 font-bold">原発1基 🔑</td><td>1GW</td><td className="font-bold text-purple-600">9.0</td></tr>
              <tr><td className="py-2">日本の総発電</td><td>200GW</td><td className="font-bold text-purple-600">11.3</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold">📝 計算例</p>
          <p>大規模DC（100MW）は原発の何分の1？</p>
          <p className="font-mono">8.0 - 9.0 = -1.0 → <strong>1/10</strong></p>
        </div>
      </div>
    ),
  },
  {
    title: '充電時間の計算',
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🔋 充電時間を計算しよう</p>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded">
              <p className="font-bold">スマホ（15Wh）を5W充電器で</p>
              <p className="font-mono text-sm mt-2">
                15Wh ÷ 5W = 3時間<br/>
                log(15Wh) - log(5W) = 1.18 - 0.7 = 0.48<br/>
                → 10⁰·⁴⁸ ≈ 3時間
              </p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="font-bold">同じスマホを20W急速充電で</p>
              <p className="font-mono text-sm mt-2">
                15Wh ÷ 20W = 0.75時間 = 45分<br/>
                log(15Wh) - log(20W) = 1.18 - 1.3 = -0.12<br/>
                → 10⁻⁰·¹² ≈ 0.75時間
              </p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="font-bold">💡 急速充電は4倍速！</p>
          <p>20W ÷ 5W = 4 → log(4) = 0.6</p>
        </div>
      </div>
    ),
  },
];

const itSlides = [
  {
    title: 'データサイズの感覚',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">💾 データサイズ（基準: byte）</p>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b"><td className="py-2">1 KB</td><td>10³</td><td className="font-bold text-purple-600">3.0</td></tr>
              <tr className="border-b"><td className="py-2">1 MB</td><td>10⁶</td><td className="font-bold text-purple-600">6.0</td></tr>
              <tr className="border-b bg-purple-100"><td className="py-2 font-bold">1 GB 🔑</td><td>10⁹</td><td className="font-bold text-purple-600">9.0</td></tr>
              <tr className="border-b"><td className="py-2">1 TB</td><td>10¹²</td><td className="font-bold text-purple-600">12.0</td></tr>
              <tr><td className="py-2">1 PB</td><td>10¹⁵</td><td className="font-bold text-purple-600">15.0</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <p className="font-bold">🔑 超重要: Byte ⇔ bit変換</p>
          <p className="mt-2">1 Byte = 8 bit</p>
          <p className="font-mono">log(8) = 0.9 → <strong>+0.9</strong>するだけ！</p>
        </div>
      </div>
    ),
  },
  {
    title: '通信速度の感覚',
    content: (
      <div className="space-y-4">
        <div className="bg-cyan-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">📶 通信速度（基準: bps）</p>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b"><td className="py-2">HD動画</td><td>5Mbps</td><td className="font-bold text-cyan-600">6.7</td></tr>
              <tr className="border-b"><td className="py-2">4K動画</td><td>25Mbps</td><td className="font-bold text-cyan-600">7.4</td></tr>
              <tr className="border-b bg-cyan-100"><td className="py-2 font-bold">光回線 🔑</td><td>1Gbps</td><td className="font-bold text-cyan-600">9.0</td></tr>
              <tr className="border-b"><td className="py-2">WiFi 6</td><td>1.2Gbps</td><td className="font-bold text-cyan-600">9.08</td></tr>
              <tr><td className="py-2">5G（理論値）</td><td>10Gbps</td><td className="font-bold text-cyan-600">10.0</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: 'データ転送時間の計算',
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">⏱️ 1TBを1Gbpsで転送</p>
          <div className="space-y-2 font-mono text-sm">
            <p>1TB = 10¹² Byte</p>
            <p>→ 10¹² × 8 bit = 10¹²·⁹ bit</p>
            <p>1Gbps = 10⁹ bps</p>
            <p>時間 = 10¹²·⁹ ÷ 10⁹ = 10³·⁹ 秒</p>
            <p className="text-lg font-bold text-blue-600 mt-4">
              → 約8000秒 ≈ 2.2時間
            </p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold">📝 計算式まとめ</p>
          <p className="font-mono">12.0 (TB) + 0.9 (×8) - 9.0 (Gbps) = 3.9</p>
        </div>
      </div>
    ),
  },
];

const unitSlides = [
  {
    title: '単位変換をマスターしよう',
    content: (
      <div className="space-y-4">
        <div className="bg-red-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🔄 よく使う単位変換</p>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b"><th className="py-2">変換</th><th>Log差</th></tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-2">km → m</td><td className="font-bold text-red-600">+3.0</td></tr>
              <tr className="border-b"><td className="py-2">時間 → 秒</td><td className="font-bold text-red-600">+3.56</td></tr>
              <tr className="border-b"><td className="py-2">日 → 秒</td><td className="font-bold text-red-600">+4.94 (≈5)</td></tr>
              <tr className="border-b"><td className="py-2">年 → 秒</td><td className="font-bold text-red-600">+7.5</td></tr>
              <tr className="border-b"><td className="py-2">kWh → J</td><td className="font-bold text-red-600">+6.56</td></tr>
              <tr className="border-b"><td className="py-2">kcal → J</td><td className="font-bold text-red-600">+3.62</td></tr>
              <tr><td className="py-2">Byte → bit</td><td className="font-bold text-red-600">+0.9</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: '実践！単位変換計算',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="font-bold text-xl mb-4">例題: 時速100kmは秒速何m？</p>
          <div className="space-y-2">
            <p>100km/h = 100,000m / 3,600秒</p>
            <p className="font-mono">log(100,000) - log(3,600)</p>
            <p className="font-mono">= 5.0 - 3.56 = 1.44</p>
            <p className="font-bold text-purple-600 mt-2">→ 10¹·⁴⁴ ≈ 27.8 m/s</p>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <p className="font-bold text-xl mb-4">例題: マラソン2時間は分速何m？</p>
          <div className="space-y-2">
            <p>42km / 120分 = 42,000m / 120分</p>
            <p className="font-mono">log(42,000) - log(120)</p>
            <p className="font-mono">= 4.62 - 2.08 = 2.54</p>
            <p className="font-bold text-green-600 mt-2">→ 10²·⁵⁴ ≈ 350 m/分</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'まとめ：Log算マスターへの道',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg text-white">
          <p className="text-2xl font-bold mb-4">🎯 絶対に覚える5つ</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 p-3 rounded">
              <p className="text-xl font-bold">2 = 0.3</p>
            </div>
            <div className="bg-white/20 p-3 rounded">
              <p className="text-xl font-bold">1日 = 4.9</p>
            </div>
            <div className="bg-white/20 p-3 rounded">
              <p className="text-xl font-bold">1年 = 7.5</p>
            </div>
            <div className="bg-white/20 p-3 rounded">
              <p className="text-xl font-bold">1GB = 9.0</p>
            </div>
            <div className="bg-white/20 p-3 rounded col-span-2">
              <p className="text-xl font-bold">B→b = +0.9</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="font-bold">🚀 次のステップ</p>
          <p>実戦モードで問題を解いて、Log感覚を体に染み込ませよう！</p>
        </div>
      </div>
    ),
  },
];

// 速度の感覚スライド
const speedSlides = [
  {
    title: '速度の感覚を身につけよう',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 rounded-lg text-white">
          <p className="text-xl">速度 = 距離 ÷ 時間</p>
          <p className="text-lg mt-2">Log算なら → log(速度) = log(距離) - log(時間)</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-bold">🚀 この章で学ぶこと</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>身近な速度のLog値</li>
            <li>速度変換のテクニック</li>
            <li>km/hとm/sの変換</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: '身近な速度のLog値',
    content: (
      <div className="space-y-4">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <p className="font-bold mb-3">🚶 歩く〜走る（m/s）</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">歩行 1.4m/s</p>
              <p className="font-bold text-emerald-600">log ≈ 0.15</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">ジョギング 3m/s</p>
              <p className="font-bold text-emerald-600">log ≈ 0.48</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">短距離走 10m/s</p>
              <p className="font-bold text-emerald-600">log = 1.0</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">自転車 8m/s</p>
              <p className="font-bold text-emerald-600">log ≈ 0.9</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-bold mb-3">🚗 乗り物（km/h）</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">車 100km/h</p>
              <p className="font-bold text-blue-600">log = 2.0</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">新幹線 300km/h</p>
              <p className="font-bold text-blue-600">log ≈ 2.48</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">飛行機 900km/h</p>
              <p className="font-bold text-blue-600">log ≈ 2.95</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">音速 1224km/h</p>
              <p className="font-bold text-blue-600">log ≈ 3.09</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'km/h ↔ m/s 変換',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg text-white">
          <p className="text-xl font-bold mb-2">km/h → m/s の変換</p>
          <p>1 km/h = 1000m / 3600s ≈ 0.278 m/s</p>
          <p className="mt-2 text-lg">log(0.278) ≈ -0.56</p>
          <p className="text-yellow-300 font-bold mt-2">→ km/hからm/sへは log値を -0.56 する</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="font-bold">💡 覚え方</p>
          <p>km/h → m/s: 約1/3.6 なので log -0.56</p>
          <p>m/s → km/h: 約×3.6 なので log +0.56</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold">例題: 100km/hは何m/s?</p>
          <p>log(100 km/h) = 2.0</p>
          <p>2.0 - 0.56 = 1.44</p>
          <p className="font-bold text-green-600">10^1.44 ≈ 27.8 m/s ✓</p>
        </div>
      </div>
    ),
  },
];

// 距離・スケールスライド
const distanceSlides = [
  {
    title: '距離・スケールの感覚',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-lg text-white">
          <p className="text-xl">宇宙から原子まで、Log算で捉える</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-bold">🌍 この章で学ぶこと</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>日常〜地球規模の距離</li>
            <li>宇宙スケールの距離</li>
            <li>極小スケール（原子・分子）</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: '日常の距離（m）',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">歩幅 0.7m</p>
              <p className="font-bold text-purple-600">log ≈ -0.15</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">身長 1.7m</p>
              <p className="font-bold text-purple-600">log ≈ 0.23</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">教室 10m</p>
              <p className="font-bold text-purple-600">log = 1.0</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">校庭 100m</p>
              <p className="font-bold text-purple-600">log = 2.0</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">1km</p>
              <p className="font-bold text-purple-600">log = 3.0</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">マラソン 42km</p>
              <p className="font-bold text-purple-600">log ≈ 4.62</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '地球〜宇宙スケール',
    content: (
      <div className="space-y-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="font-bold mb-3">🌍 地球スケール（m）</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">富士山 3776m</p>
              <p className="font-bold text-indigo-600">log ≈ 3.58</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">東京-大阪 500km</p>
              <p className="font-bold text-indigo-600">log ≈ 5.7</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">地球の半径 6400km</p>
              <p className="font-bold text-indigo-600">log ≈ 6.8</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">地球の周囲 4万km</p>
              <p className="font-bold text-indigo-600">log ≈ 7.6</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-bold mb-3">🚀 宇宙スケール（m）</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">月まで 38万km</p>
              <p className="font-bold text-purple-600">log ≈ 8.6</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">太陽まで 1.5億km</p>
              <p className="font-bold text-purple-600">log ≈ 11.2</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">1光年</p>
              <p className="font-bold text-purple-600">log ≈ 15.98</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

// 時間と歴史スライド
const historySlides = [
  {
    title: '時間と歴史をLogで見る',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-lg text-white">
          <p className="text-xl">過去から未来まで、時間軸をLog算で</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-bold">📅 この章で学ぶこと</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>人類の歴史のスケール</li>
            <li>地球・宇宙の歴史</li>
            <li>時間単位の変換</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: '人類の歴史（年前）',
    content: (
      <div className="space-y-4">
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">10年前</p>
              <p className="font-bold text-amber-600">log = 1.0</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">100年前（明治）</p>
              <p className="font-bold text-amber-600">log = 2.0</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">1000年前（平安）</p>
              <p className="font-bold text-amber-600">log = 3.0</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">2000年前（弥生）</p>
              <p className="font-bold text-amber-600">log ≈ 3.3</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">1万年前（縄文）</p>
              <p className="font-bold text-amber-600">log = 4.0</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-sm">20万年前（人類誕生）</p>
              <p className="font-bold text-amber-600">log ≈ 5.3</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '地球・宇宙の歴史',
    content: (
      <div className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="font-bold mb-3">🌍 地球の歴史（年前）</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">恐竜絶滅 6600万年</p>
              <p className="font-bold text-orange-600">log ≈ 7.82</p>
            </div>
            <div className="bg-white p-2 rounded text-center">
              <p className="text-sm">地球誕生 46億年</p>
              <p className="font-bold text-orange-600">log ≈ 9.66</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="font-bold mb-3">🌌 宇宙の歴史（年前）</p>
          <div className="bg-white p-3 rounded text-center">
            <p className="text-sm">宇宙誕生 138億年</p>
            <p className="font-bold text-purple-600">log ≈ 10.14</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="font-bold">💡 ポイント</p>
          <p>Logが1増えると10倍の時間スケール！</p>
          <p>人類の歴史(log 5)から宇宙の歴史(log 10)まで、たった5桁の差</p>
        </div>
      </div>
    ),
  },
];

// ==========================================
// 確率とe スライド
// ==========================================
const probabilitySlides = [
  {
    title: '確率計算の秘密兵器「e」',
    content: (
      <div className="space-y-4">
        <p className="text-lg">
          確率計算で登場する <strong>e ≈ 2.718</strong>（自然対数の底）<br/>
          なぜこの不思議な数が重要なのでしょうか？
        </p>
        <div className="bg-rose-50 p-6 rounded-lg">
          <p className="text-xl font-bold text-rose-800 mb-4">🎯 今回覚える2つの数</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-rose-600">0.43</p>
              <p className="text-sm">log₁₀(e)</p>
              <p className="text-xs text-gray-500 mt-1">ln → log₁₀ 変換係数</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-rose-600">2.3</p>
              <p className="text-sm">ln(10)</p>
              <p className="text-xs text-gray-500 mt-1">log₁₀ → ln 変換係数</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 関係式</p>
          <p className="font-mono mt-2">0.43 × 2.3 ≈ 1</p>
          <p className="text-sm text-gray-600">この2つは互いの逆数！</p>
        </div>
      </div>
    ),
  },
  {
    title: 'ガチャ確率の計算',
    content: (
      <div className="space-y-4">
        <p className="text-lg">🎰 「1%のガチャを50%で当てるには何回引く？」</p>
        <div className="bg-rose-50 p-6 rounded-lg">
          <p className="font-bold mb-3">📝 公式</p>
          <div className="bg-white p-4 rounded-lg font-mono text-center">
            <p className="text-lg">n = ln(2) / p</p>
            <p className="text-sm text-gray-600 mt-2">50%で当てる回数 ≈ <strong>0.69 / p</strong></p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold mb-2">🔢 具体例（確率1% = 0.01）</p>
          <p>n = 0.69 / 0.01 = <strong>69回</strong></p>
          <p className="text-sm text-gray-600 mt-2">log(69) ≈ 1.84</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-bold">✨ 覚えやすい目安</p>
          <table className="w-full mt-2 text-sm">
            <tbody>
              <tr><td>確率1%</td><td>→</td><td className="font-bold">69回で50%</td></tr>
              <tr><td>確率0.1%</td><td>→</td><td className="font-bold">693回で50%</td></tr>
              <tr><td>確率p</td><td>→</td><td className="font-bold">0.7/p 回で50%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    title: 'eの本質：「1/p回引くと63%」',
    content: (
      <div className="space-y-4">
        <div className="bg-rose-50 p-6 rounded-lg">
          <p className="text-xl font-bold text-rose-800 mb-4">🔑 eが現れる理由</p>
          <p>確率 p のガチャを <strong>1/p 回</strong>引くと...</p>
          <div className="bg-white p-4 rounded-lg mt-3">
            <p className="text-center">
              1回も当たらない確率 = (1-p)^(1/p) → <span className="text-2xl font-bold text-rose-600">1/e ≈ 37%</span>
            </p>
            <p className="text-center mt-2">
              少なくとも1回当たる確率 = 1 - 1/e ≈ <span className="text-2xl font-bold text-green-600">63%</span>
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 例：1%ガチャを100回</p>
          <p className="mt-2">100回引くと「少なくとも1回当たる」確率は約63%</p>
          <p className="text-sm text-gray-600">直感より低い！これがeの魔法</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-bold">📊 log値で覚える</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-center">
              <p className="text-sm">1/e ≈ 0.37</p>
              <p className="font-mono">log = -0.43</p>
            </div>
            <div className="text-center">
              <p className="text-sm">1-1/e ≈ 0.63</p>
              <p className="font-mono">log = -0.20</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: '確率目標と必要回数',
    content: (
      <div className="space-y-4">
        <p className="text-lg">🎯 目標確率を達成するのに必要な試行回数</p>
        <div className="bg-rose-50 p-4 rounded-lg">
          <p className="font-bold mb-3">📝 一般公式（確率pのガチャ）</p>
          <div className="bg-white p-3 rounded font-mono text-sm">
            n = ln(1/(1-目標確率)) / p
          </div>
        </div>
        <div className="bg-white border-2 border-rose-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-rose-100">
              <tr>
                <th className="p-2">目標確率</th>
                <th className="p-2">係数</th>
                <th className="p-2">1%ガチャ</th>
                <th className="p-2">log(回数)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-2 text-center">50%</td><td className="p-2 text-center">0.69/p</td><td className="p-2 text-center font-bold">69回</td><td className="p-2 text-center">1.84</td></tr>
              <tr className="border-t bg-gray-50"><td className="p-2 text-center">63%</td><td className="p-2 text-center">1/p</td><td className="p-2 text-center font-bold">100回</td><td className="p-2 text-center">2.00</td></tr>
              <tr className="border-t"><td className="p-2 text-center">90%</td><td className="p-2 text-center">2.3/p</td><td className="p-2 text-center font-bold">230回</td><td className="p-2 text-center">2.36</td></tr>
              <tr className="border-t bg-gray-50"><td className="p-2 text-center">95%</td><td className="p-2 text-center">3/p</td><td className="p-2 text-center font-bold">300回</td><td className="p-2 text-center">2.48</td></tr>
              <tr className="border-t"><td className="p-2 text-center">99%</td><td className="p-2 text-center">4.6/p</td><td className="p-2 text-center font-bold">460回</td><td className="p-2 text-center">2.66</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="font-bold">💡 95%は50%の約4.3倍の試行が必要！</p>
        </div>
      </div>
    ),
  },
  {
    title: 'log(1+x)の近似',
    content: (
      <div className="space-y-4">
        <div className="bg-rose-50 p-6 rounded-lg">
          <p className="text-xl font-bold text-rose-800 mb-4">📐 |x| ≪ 1 のときの近似</p>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-mono text-lg text-center">ln(1+x) ≈ x</p>
            <p className="font-mono text-lg text-center mt-2">log₁₀(1+x) ≈ 0.43x</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold mb-2">🔢 なぜ便利？</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>1%増加 (x=0.01) → log₁₀(1.01) ≈ 0.0043</li>
            <li>5%増加 (x=0.05) → log₁₀(1.05) ≈ 0.021</li>
            <li>10%増加 (x=0.1) → log₁₀(1.1) ≈ 0.043</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-bold">✨ 応用：複利計算</p>
          <p className="text-sm mt-2">
            年利r%でn年後に2倍になる年数:<br/>
            (1+r)ⁿ = 2 → n × ln(1+r) = ln(2)<br/>
            n ≈ 0.69/r = <strong>69/r(%)年</strong>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            例: 年利5% → 69/5 ≈ 14年で2倍
          </p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="font-bold">💡 「72の法則」</p>
          <p className="text-sm">72÷年利(%)=2倍になる年数（実用的な近似）</p>
        </div>
      </div>
    ),
  },
  {
    title: '誕生日のパラドックス',
    content: (
      <div className="space-y-4">
        <p className="text-lg">🎂 何人いれば誕生日が被る確率が50%超える？</p>
        <div className="bg-rose-50 p-6 rounded-lg">
          <p className="text-6xl font-bold text-center text-rose-600">23人</p>
          <p className="text-center text-gray-600 mt-2">意外と少ない！</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold mb-2">📊 人数と確率</p>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-white p-2 rounded">
              <p className="font-bold">20人</p>
              <p>約41%</p>
            </div>
            <div className="bg-white p-2 rounded border-2 border-rose-400">
              <p className="font-bold">23人</p>
              <p>約50%</p>
            </div>
            <div className="bg-white p-2 rounded">
              <p className="font-bold">50人</p>
              <p>約97%</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-bold">📐 近似公式</p>
          <p className="font-mono text-center mt-2">n ≈ 1.2 × √(日数)</p>
          <p className="text-sm text-gray-600 text-center mt-1">
            365日 → 1.2 × √365 ≈ 1.2 × 19 ≈ 23人
          </p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="font-bold">💡 log値</p>
          <p>23人 → log(23) ≈ 1.36</p>
        </div>
      </div>
    ),
  },
  {
    title: '誕生日問題の応用：ハッシュ衝突',
    content: (
      <div className="space-y-4">
        <p className="text-lg">💻 セキュリティ・IT分野で超重要！</p>
        <div className="bg-rose-50 p-4 rounded-lg">
          <p className="font-bold mb-2">📐 衝突が50%になるデータ数</p>
          <div className="bg-white p-3 rounded font-mono text-center">
            n ≈ 1.2 × √N（Nは可能な値の総数）
          </div>
        </div>
        <div className="bg-white border-2 border-rose-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-rose-100">
              <tr>
                <th className="p-2">空間サイズ</th>
                <th className="p-2">50%衝突</th>
                <th className="p-2">log(回数)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-2">365 (誕生日)</td><td className="p-2 font-bold">23</td><td className="p-2">1.36</td></tr>
              <tr className="border-t bg-gray-50"><td className="p-2">2¹⁶ (65536)</td><td className="p-2 font-bold">300</td><td className="p-2">2.48</td></tr>
              <tr className="border-t"><td className="p-2">2³² (43億)</td><td className="p-2 font-bold">77,000</td><td className="p-2">4.89</td></tr>
              <tr className="border-t bg-gray-50"><td className="p-2">2⁶⁴</td><td className="p-2 font-bold">5×10⁹</td><td className="p-2">9.7</td></tr>
              <tr className="border-t"><td className="p-2">2¹²⁸</td><td className="p-2 font-bold">2×10¹⁹</td><td className="p-2">19.3</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="font-bold">💡 セキュリティへの示唆</p>
          <p className="text-sm">32bitハッシュは約8万件で危険！128bit以上を使おう</p>
        </div>
      </div>
    ),
  },
  {
    title: '確率のlog値まとめ',
    content: (
      <div className="space-y-4">
        <p className="text-lg">🎯 確率計算で使うlog値をまとめよう！</p>
        <div className="bg-rose-50 p-4 rounded-lg">
          <p className="font-bold mb-3">📊 基本定数</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded text-center">
              <p className="text-2xl font-bold text-rose-600">0.43</p>
              <p className="text-sm">log₁₀(e)</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-2xl font-bold text-rose-600">2.3</p>
              <p className="text-sm">ln(10)</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-2xl font-bold text-blue-600">-0.43</p>
              <p className="text-sm">log₁₀(1/e) ≈ 37%</p>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <p className="text-2xl font-bold text-green-600">-0.20</p>
              <p className="text-sm">log₁₀(1-1/e) ≈ 63%</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold mb-2">🎰 ガチャ計算早見表（確率p）</p>
          <div className="text-sm space-y-1">
            <p>• 50%達成: <strong>0.7/p 回</strong></p>
            <p>• 63%達成: <strong>1/p 回</strong></p>
            <p>• 95%達成: <strong>3/p 回</strong></p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-bold mb-2">🎂 誕生日問題</p>
          <p className="text-sm">n ≈ 1.2√日数 で50%衝突</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="font-bold">💡 複利計算</p>
          <p className="text-sm">72÷年利(%) = 2倍になる年数</p>
        </div>
      </div>
    ),
  },
];

export default LearnMode;
