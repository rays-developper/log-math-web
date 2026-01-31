import { useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Zap, MapPin, Timer, Cpu, Calculator } from 'lucide-react';

const LearnMode = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      id: 'time',
      title: '時間の感覚',
      icon: <Timer size={24} />,
      color: 'green',
      slides: timeSlides,
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
      color: 'purple',
      slides: itSlides,
    },
    {
      id: 'units',
      title: '単位変換マスター',
      icon: <BookOpen size={24} />,
      color: 'red',
      slides: unitSlides,
    },
  ];

  const currentChapter = chapters.find(c => c.id === selectedChapter);
  const slides = currentChapter?.slides || [];

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
  };

  // 章選択画面
  if (!selectedChapter) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">学習モード</h2>
        <p className="text-gray-600 mb-8">Log算の基礎から応用まで、段階的に学ぼう！</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => selectChapter(chapter.id)}
              className={`p-6 rounded-xl shadow-lg text-left transition-all hover:scale-105 hover:shadow-xl ${
                chapter.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                chapter.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                chapter.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                chapter.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                chapter.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                'bg-gradient-to-br from-red-500 to-red-600'
              } text-white`}
            >
              <div className="mb-4">{chapter.icon}</div>
              <h3 className="text-xl font-bold mb-2">{chapter.title}</h3>
              <p className="text-white/80 text-sm">
                {chapter.slides.length} スライド
              </p>
            </button>
          ))}
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

  // スライド表示
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {slides[currentSlide]?.title}
          </h2>
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-primary w-8'
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

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>次へ</span>
            <ChevronRight size={20} />
          </button>
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
            <li>フェルミ推定を素早く行う</li>
            <li>物理・IT・日常の計算を直感的に</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 なぜLog算？</p>
          <p className="text-gray-700 mt-2">
            「1年は何秒？」「1TBのデータ転送に何時間？」<br/>
            こんな計算を暗算で即答できるようになります！
          </p>
        </div>
      </div>
    ),
  },
  {
    title: '基本原理：掛け算は足し算に',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">🔢 対数の基本性質</p>
          <div className="space-y-3 text-lg font-mono">
            <p>log(A × B) = log(A) + log(B)</p>
            <p>log(A ÷ B) = log(A) − log(B)</p>
            <p>log(Aⁿ) = n × log(A)</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold mb-2">例：</p>
          <p>1000 × 1000 = ?</p>
          <p className="mt-2">→ log(1000) + log(1000) = 3 + 3 = 6</p>
          <p className="mt-2">→ 答え: 10⁶ = 1,000,000</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-bold">✨ これがLog算の威力！</p>
          <p className="text-gray-700">巨大な掛け算も、足し算で済む</p>
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
          <p className="font-bold mb-2">📝 応用例：</p>
          <p>8 = 2³ → log(8) = 3 × 0.3 = <strong>0.9</strong></p>
          <p className="mt-2">4 = 2² → log(4) = 2 × 0.3 = <strong>0.6</strong></p>
          <p className="mt-2">6 = 2×3 → log(6) = 0.3 + 0.5 = <strong>0.8</strong></p>
        </div>
      </div>
    ),
  },
  {
    title: '√10 = 0.5 の感覚',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-xl font-bold mb-4">📐 0.5刻みで世界を見る</p>
          <p className="text-gray-700">log(√10) = 0.5 → √10 ≈ 3.16</p>
          <div className="mt-4 space-y-2">
            <p>10⁰ = 1</p>
            <p>10⁰·⁵ ≈ 3.16 (≈ π)</p>
            <p>10¹ = 10</p>
            <p>10¹·⁵ ≈ 31.6</p>
            <p>10² = 100</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="font-bold">💡 覚え方</p>
          <p className="text-gray-700 mt-2">
            0.5刻みは「約3倍」と覚える！<br/>
            10⁰·⁵ ≈ 3, 10¹·⁵ ≈ 30, 10²·⁵ ≈ 300...
          </p>
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

export default LearnMode;
