import { useApp } from '../context/AppContext';
import { Award, Star, TrendingUp, BookOpen, Flame, Trophy, Target } from 'lucide-react';
import { PROBLEMS, LEVELS } from '../data/problems';

const Dashboard = () => {
  const { setCurrentView, userProgress, getUserLevel } = useApp();
  const userLevel = getUserLevel();

  const totalProblems = PROBLEMS.length;
  const solvedCount = userProgress.solvedProblems.length;
  const progressPercent = Math.round((solvedCount / totalProblems) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* ユーザーレベル表示 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white mb-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-4xl">{userLevel.emoji}</span>
              <h2 className="text-3xl font-bold">{userLevel.title}</h2>
            </div>
            <p className="text-blue-100">
              {userLevel.nextLevel 
                ? `次のレベルまであと ${userLevel.nextLevel.minSolved - solvedCount} 問`
                : '最高レベル達成！'
              }
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{solvedCount}</div>
            <div className="text-sm text-blue-100">問題クリア</div>
          </div>
        </div>
        
        {/* プログレスバー */}
        {userLevel.nextLevel && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-blue-100 mb-1">
              <span>{userLevel.title}</span>
              <span>{userLevel.nextLevel.title}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-yellow-400 h-3 rounded-full transition-all"
                style={{ 
                  width: `${((solvedCount - userLevel.minSolved) / (userLevel.nextLevel.minSolved - userLevel.minSolved)) * 100}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="クリア問題" 
          value={solvedCount} 
          icon={<Star className="text-yellow-500" size={24} />}
          subtext={`/ ${totalProblems} 問`}
        />
        <StatCard 
          label="進捗率" 
          value={`${progressPercent}%`} 
          icon={<Target className="text-green-500" size={24} />}
        />
        <StatCard 
          label="サバイバル最高" 
          value={userProgress.survivalRecord?.score || 0} 
          icon={<Flame className="text-red-500" size={24} />}
          subtext="pts"
        />
        <StatCard 
          label="最大連続正解" 
          value={userProgress.survivalRecord?.maxStreak || 0} 
          icon={<Trophy className="text-purple-500" size={24} />}
          subtext="連続"
        />
      </div>

      {/* メインアクションカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ActionCard
          title="学習モード"
          description="Log算の基礎から応用まで、6つの章で段階的に学習"
          icon={BookOpen}
          color="bg-gradient-to-br from-green-400 to-green-600"
          onClick={() => setCurrentView('learn')}
          badge="📚 6章構成"
        />
        <ActionCard
          title="実戦モード"
          description="通常モードとサバイバルモードで実力を試そう"
          icon={TrendingUp}
          color="bg-gradient-to-br from-purple-400 to-purple-600"
          onClick={() => setCurrentView('practice')}
          badge={`🎮 ${totalProblems}問収録`}
        />
      </div>

      {/* レベル別進捗 */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">レベル別クリア状況</h3>
        <div className="space-y-3">
          {LEVELS.map((level) => {
            const levelProblems = PROBLEMS.filter(p => p.level === level.id);
            const solved = levelProblems.filter(p => 
              userProgress.solvedProblems.includes(p.id)
            ).length;
            const percent = levelProblems.length > 0 
              ? Math.round((solved / levelProblems.length) * 100) 
              : 0;

            return (
              <div key={level.id} className="flex items-center space-x-4">
                <span className="text-2xl w-8">{level.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{level.name}</span>
                    <span className="text-gray-500">{solved}/{levelProblems.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        level.color === 'green' ? 'bg-green-500' :
                        level.color === 'blue' ? 'bg-blue-500' :
                        level.color === 'purple' ? 'bg-purple-500' :
                        level.color === 'orange' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">{percent}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* クイックリファレンス */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">🔑 覚えておきたい定数</h3>
          <button 
            onClick={() => setCurrentView('reference')}
            className="text-primary hover:text-blue-600 text-sm font-medium"
          >
            すべて見る →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <QuickConstant value="2" log="0.3" />
          <QuickConstant value="1日" log="4.9" />
          <QuickConstant value="1年" log="7.5" />
          <QuickConstant value="1GB" log="9.0" />
          <QuickConstant value="B→b" log="+0.9" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, subtext }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <div className="flex items-center justify-between mb-2">
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-800">
      {value}
      {subtext && <span className="text-sm font-normal text-gray-500 ml-1">{subtext}</span>}
    </div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const ActionCard = ({ title, description, icon: Icon, color, onClick, badge }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left group hover:scale-105"
  >
    <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className="text-white" size={28} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-3">{description}</p>
    {badge && (
      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

const QuickConstant = ({ value, log }) => (
  <div className="bg-white rounded-lg p-3 text-center shadow-sm">
    <div className="font-bold text-gray-800">{value}</div>
    <div className="text-primary font-mono text-sm">= {log}</div>
  </div>
);

export default Dashboard;
