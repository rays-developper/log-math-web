import { useState } from 'react';
import { LOG_CONSTANTS, CATEGORIES, LOG_MAP, INVERSE_LOG_MAP, getAccuracyColor, getAccuracyBgColor } from '../data/constants';
import { Search, BookOpen, Star, Info, Table, List, ArrowRightLeft } from 'lucide-react';

const Reference = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMemoOnly, setShowMemoOnly] = useState(false);
  const [viewMode, setViewMode] = useState('constants'); // 'constants', 'logmap', or 'inversemap'

  const filteredConstants = LOG_CONSTANTS.filter(constant => {
    const matchesCategory = selectedCategory === 'all' || constant.category === selectedCategory;
    const matchesSearch = constant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          constant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (constant.memo && constant.memo.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMemo = !showMemoOnly || (constant.memo && constant.memo.includes('🔑'));
    return matchesCategory && matchesSearch && matchesMemo;
  });

  // カテゴリごとの定数をグループ化
  const groupedConstants = filteredConstants.reduce((groups, constant) => {
    const category = constant.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(constant);
    return groups;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📖 定数表（Cheat Sheet）</h2>
        <p className="text-gray-600">
          Log算でよく使う{LOG_CONSTANTS.length}個の定数を収録。10^0.5刻みで覚えやすく整理！
        </p>
      </div>

      {/* ビューモード切り替えタブ */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setViewMode('constants')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'constants'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <List size={18} />
          <span>定数一覧</span>
        </button>
        <button
          onClick={() => setViewMode('logmap')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'logmap'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Table size={18} />
          <span>x → log(x)</span>
        </button>
        <button
          onClick={() => setViewMode('inversemap')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'inversemap'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ArrowRightLeft size={18} />
          <span>log → 10^log</span>
        </button>
      </div>

      {/* ビューの切り替え */}
      {viewMode === 'logmap' ? (
        <LogMapView />
      ) : viewMode === 'inversemap' ? (
        <InverseLogMapView />
      ) : (
        <>
          {/* 検索バー */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="定数を検索... (例: 電力, 面積, 時間)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
        <button
          onClick={() => setShowMemoOnly(!showMemoOnly)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
            showMemoOnly
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Star size={18} />
          <span>重要のみ</span>
        </button>
      </div>

      {/* 色分け凡例 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Info size={16} className="text-gray-500" />
          <span className="font-medium text-gray-700">Log値の色分け</span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-red-100 border border-red-300"></span>
            <span className="text-red-600 font-medium">赤 ↑</span>
            <span className="text-gray-600">真値は上（切り捨てている）</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></span>
            <span className="text-blue-600 font-medium">青 ↓</span>
            <span className="text-gray-600">真値は下（切り上げている）</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></span>
            <span className="text-gray-900 font-medium">黒</span>
            <span className="text-gray-600">= ほぼ正確</span>
          </div>
        </div>
      </div>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((category) => {
          const count = LOG_CONSTANTS.filter(c => 
            category.id === 'all' || c.category === category.id
          ).length;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon} {category.name} ({count})
            </button>
          );
        })}
      </div>

      {/* カテゴリ別表示 */}
      {selectedCategory === 'all' ? (
        // グループ化表示
        Object.entries(groupedConstants).map(([categoryId, constants]) => {
          const categoryInfo = CATEGORIES.find(c => c.id === categoryId);
          return (
            <div key={categoryId} className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span>{categoryInfo?.icon}</span>
                <span>{categoryInfo?.name}</span>
                <span className="text-sm font-normal text-gray-500">({constants.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {constants.map((constant) => (
                  <ConstantCard key={constant.id} constant={constant} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        // フラット表示
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConstants.map((constant) => (
            <ConstantCard key={constant.id} constant={constant} />
          ))}
        </div>
      )}

      {filteredConstants.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg">該当する定数が見つかりません</p>
          <p className="text-sm">検索条件を変更してください</p>
        </div>
      )}

      {/* 使い方ガイド */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Log算の計算ルール</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RuleCard 
            title="掛け算 → 足し算" 
            example="2 × 1000" 
            calc="0.3 + 3.0 = 3.3"
            result="≈ 2000"
          />
          <RuleCard 
            title="割り算 → 引き算" 
            example="1000 ÷ 2" 
            calc="3.0 - 0.3 = 2.7"
            result="≈ 500"
          />
          <RuleCard 
            title="累乗 → 掛け算" 
            example="2⁵" 
            calc="0.3 × 5 = 1.5"
            result="≈ 32"
          />
          <RuleCard 
            title="B→bit変換" 
            example="1GB → bit" 
            calc="9.0 + 0.9 = 9.9"
            result="≈ 8Gbit"
          />
        </div>
      </div>

      {/* 0.5刻みスケール */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📏 0.5刻みスケール（√10 ≈ 3.16）</h3>
        <div className="overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((log) => (
              <div key={log} className="text-center p-3 bg-gray-50 rounded-lg min-w-[80px]">
                <div className="text-sm text-gray-500">10^{log}</div>
                <div className="font-bold text-primary">
                  {Math.round(Math.pow(10, log) * 10) / 10}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          💡 0.5刻みは約3倍、1.0刻みは10倍と覚えよう！
        </p>
      </div>
        </>
      )}
    </div>
  );
};

// 対数変換マップコンポーネント
const LogMapView = () => {
  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🗺️ 9×10 対数変換マップ</h3>
        <p className="text-gray-600 mb-3">
          1.0〜9.9 のlog値を一覧表示。任意の数値のlog値を素早く調べられます。
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-red-100 border border-red-300"></span>
            <span className="text-red-600 font-medium">赤 ↑</span>
            <span className="text-gray-600">真値は上（切り捨て）</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></span>
            <span className="text-blue-600 font-medium">青 ↓</span>
            <span className="text-gray-600">真値は下（切り上げ）</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></span>
            <span className="text-gray-900 font-medium">黒</span>
            <span className="text-gray-600">= ほぼ正確</span>
          </div>
        </div>
      </div>

      {/* 使い方 */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <p className="font-bold text-yellow-800 mb-2">💡 使い方</p>
        <p className="text-yellow-700 text-sm">
          例: <span className="font-bold">log(3.7)</span> を求めるには → 行「3」、列「.7」を見る → <span className="font-bold">0.57</span>
        </p>
        <p className="text-yellow-700 text-sm mt-1">
          例: <span className="font-bold">log(3700)</span> = log(3.7 × 10³) = 0.57 + 3 = <span className="font-bold">3.57</span>
        </p>
      </div>

      {/* 対数変換マップ */}
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 font-bold text-gray-700">n \ .x</th>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(col => (
                <th key={col} className="p-3 border border-gray-300 font-bold text-gray-700">.{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LOG_MAP.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-3 border border-gray-300 font-bold text-gray-700 text-center">
                  {rowIndex + 1}
                </td>
                {row.map((cell, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`p-3 border border-gray-300 text-center font-mono ${getAccuracyColor(cell.accuracy)} ${getAccuracyBgColor(cell.accuracy)}`}
                  >
                    {cell.log}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 重要な値のハイライト */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-bold text-gray-800 mb-4">🔑 特に重要な値</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-800">2</div>
            <div className="text-xl font-bold text-blue-600">= 0.30</div>
            <div className="text-xs text-gray-500 mt-1">最重要！</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-800">3</div>
            <div className="text-xl font-bold text-green-600">= 0.48</div>
            <div className="text-xs text-gray-500 mt-1">≈ 0.5</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-800">5</div>
            <div className="text-xl font-bold text-purple-600">= 0.70</div>
            <div className="text-xs text-gray-500 mt-1">= 10/2</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-800">7</div>
            <div className="text-xl font-bold text-orange-600">= 0.85</div>
            <div className="text-xs text-gray-500 mt-1">覚えておくと便利</div>
          </div>
        </div>
      </div>

      {/* 計算のコツ */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <h4 className="font-bold text-gray-800 mb-3">🧮 計算のコツ</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <p className="font-bold text-purple-600 mb-1">log(2) + log(5) = 1</p>
            <p className="text-gray-600">2 × 5 = 10 なので当然！</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-bold text-purple-600 mb-1">log(4) = 2 × log(2) = 0.6</p>
            <p className="text-gray-600">4 = 2² なので2倍</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-bold text-purple-600 mb-1">log(8) = 3 × log(2) = 0.9</p>
            <p className="text-gray-600">8 = 2³ なので3倍</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-bold text-purple-600 mb-1">log(6) = log(2) + log(3) = 0.78</p>
            <p className="text-gray-600">6 = 2 × 3 なので足し算</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 逆変換マップコンポーネント (log値 → 元の数値)
const InverseLogMapView = () => {
  return (
    <div className="space-y-6">
      {/* 説明 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🔄 逆変換マップ（log → 10^log）</h3>
        <p className="text-gray-600 mb-3">
          log値から元の数値を求める表。計算結果を実際の値に戻すときに使います。
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-red-100 border border-red-300"></span>
            <span className="text-red-600 font-medium">赤 ↑</span>
            <span className="text-gray-600">真値は上（切り捨て）</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></span>
            <span className="text-blue-600 font-medium">青 ↓</span>
            <span className="text-gray-600">真値は下（切り上げ）</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></span>
            <span className="text-gray-900 font-medium">黒</span>
            <span className="text-gray-600">= ほぼ正確</span>
          </div>
        </div>
      </div>

      {/* 使い方 */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <p className="font-bold text-yellow-800 mb-2">💡 使い方</p>
        <p className="text-yellow-700 text-sm">
          例: <span className="font-bold">10^0.13</span> を求めるには → 行「0.1」、列「.03」を見る → <span className="font-bold">1.35</span>
        </p>
        <p className="text-yellow-700 text-sm mt-1">
          例: <span className="font-bold">10^3.13</span> = 10³ × 10^0.13 = 1000 × 1.35 = <span className="font-bold">1350</span>
        </p>
      </div>

      {/* 逆変換マップ */}
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 font-bold text-gray-700">0.n \ .0x</th>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(col => (
                <th key={col} className="p-3 border border-gray-300 font-bold text-gray-700">.0{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVERSE_LOG_MAP.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-3 border border-gray-300 font-bold text-gray-700 text-center">
                  0.{rowIndex}
                </td>
                {row.map((cell, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`p-3 border border-gray-300 text-center font-mono ${getAccuracyColor(cell.accuracy)} ${getAccuracyBgColor(cell.accuracy)}`}
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 重要な逆変換 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-bold text-gray-800 mb-4">🔑 よく使う逆変換</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-lg font-bold text-gray-600">10^0.3</div>
            <div className="text-2xl font-bold text-blue-600">≈ 2</div>
            <div className="text-xs text-gray-500 mt-1">最重要！</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-lg font-bold text-gray-600">10^0.5</div>
            <div className="text-2xl font-bold text-green-600">≈ 3.16</div>
            <div className="text-xs text-gray-500 mt-1">√10</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-lg font-bold text-gray-600">10^0.7</div>
            <div className="text-2xl font-bold text-purple-600">≈ 5</div>
            <div className="text-xs text-gray-500 mt-1">= 10/2</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-lg font-bold text-gray-600">10^0.48</div>
            <div className="text-2xl font-bold text-orange-600">≈ 3</div>
            <div className="text-xs text-gray-500 mt-1">よく使う</div>
          </div>
        </div>
      </div>

      {/* 0.5刻みスケール */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
        <h4 className="font-bold text-gray-800 mb-4">📏 0.5刻みの逆変換</h4>
        <div className="overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((log) => (
              <div key={log} className="text-center p-3 bg-white rounded-lg min-w-[90px] shadow-sm">
                <div className="text-sm text-gray-500">10^{log}</div>
                <div className="font-bold text-purple-600 text-lg">
                  {log < 3 
                    ? (Math.pow(10, log)).toFixed(log === 0.5 ? 2 : 1)
                    : Math.round(Math.pow(10, log)).toLocaleString()
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          💡 log値が0.5増えると約3倍、1.0増えると10倍！
        </p>
      </div>
    </div>
  );
};

const ConstantCard = ({ constant }) => {
  const categoryInfo = CATEGORIES.find(c => c.id === constant.category);
  const isImportant = constant.memo && constant.memo.includes('🔑');
  const accuracyColorClass = getAccuracyColor(constant.accuracy);
  
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all border-l-4 ${
        isImportant ? 'ring-2 ring-yellow-300' : ''
      }`}
      style={{ borderLeftColor: getCategoryColor(constant.category) }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800 leading-tight">{constant.name}</h3>
        {isImportant && <Star className="text-yellow-500 flex-shrink-0" size={18} fill="currentColor" />}
      </div>
      <div className="mb-2">
        <span className={`text-3xl font-bold ${accuracyColorClass}`}>
          {constant.value.toFixed(2)}
        </span>
        {constant.accuracy !== 'exact' && (
          <span className={`ml-2 text-xs ${accuracyColorClass}`}>
            {constant.accuracy === 'up' ? '(↓真値)' : '(↑真値)'}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-2">{constant.description}</p>
      {constant.memo && (
        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">{constant.memo}</p>
      )}
    </div>
  );
};

const RuleCard = ({ title, example, calc, result }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <h4 className="font-bold text-gray-800 mb-2 text-sm">{title}</h4>
    <p className="text-gray-600 text-xs mb-1">{example}</p>
    <p className="text-primary font-mono text-sm">{calc}</p>
    <p className="text-gray-800 font-bold text-sm mt-1">{result}</p>
  </div>
);

const getCategoryColor = (category) => {
  const colors = {
    Math: '#3b82f6',
    Time: '#10b981',
    Area: '#eab308',
    Energy: '#f97316',
    Power: '#ef4444',
    IT: '#06b6d4',
    Distance: '#8b5cf6',
    Population: '#ec4899',
    Physics: '#6366f1',
    Unit: '#14b8a6',
  };
  return colors[category] || '#6b7280';
};

export default Reference;
