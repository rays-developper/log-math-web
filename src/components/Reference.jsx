import { useState } from 'react';
import { LOG_CONSTANTS, CATEGORIES } from '../data/constants';
import { Search, BookOpen, Star } from 'lucide-react';

const Reference = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMemoOnly, setShowMemoOnly] = useState(false);

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
    </div>
  );
};

const ConstantCard = ({ constant }) => {
  const categoryInfo = CATEGORIES.find(c => c.id === constant.category);
  const isImportant = constant.memo && constant.memo.includes('🔑');
  
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
        <span className="text-3xl font-bold text-primary">{constant.value}</span>
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
