// Log値の定数一覧
// 精度: 小数点以下2桁（3桁目四捨五入）
// accuracy: 'down' = 切り捨て(真値が大きい、赤), 'up' = 切り上げ(真値が小さい、青), 'exact' = 近い(黒)
// 判定基準: 誤差 > +0.003 なら down(赤), < -0.003 なら up(青), それ以外は exact(黒)

export const LOG_CONSTANTS = [
  // ==========================================
  // 基本的な数学定数
  // ==========================================
  { id: 'c1', name: '2', value: 0.30, accuracy: 'down', category: 'Math', description: '🔑 最重要！log₁₀(2) = 0.301', memo: '2倍 = +0.30 を体に染み込ませよう' },
  { id: 'c2', name: '3', value: 0.48, accuracy: 'down', category: 'Math', description: 'log₁₀(3) = 0.477', memo: '約0.5として計算してOK' },
  { id: 'c3', name: '5', value: 0.70, accuracy: 'exact', category: 'Math', description: 'log₁₀(5) = 0.699', memo: '10÷2で覚える' },
  { id: 'c4', name: '7', value: 0.85, accuracy: 'up', category: 'Math', description: 'log₁₀(7) = 0.845', memo: '約0.85' },
  { id: 'c5', name: 'π (円周率)', value: 0.50, accuracy: 'exact', category: 'Math', description: 'log₁₀(3.14) = 0.497', memo: '3とほぼ同じ' },
  { id: 'c6', name: 'e (自然対数の底)', value: 0.43, accuracy: 'down', category: 'Math', description: 'log₁₀(2.718) = 0.434', memo: '約0.43' },
  { id: 'c7', name: '√10', value: 0.50, accuracy: 'exact', category: 'Math', description: 'log₁₀(√10) = 0.500', memo: '√10 ≈ 3.16、これが0.5刻みの基準' },
  
  // ==========================================
  // 時間関連 (基準: 秒) - 物理〜人類史〜宇宙
  // ==========================================
  { id: 't0a', name: '1ナノ秒 (10⁻⁹秒)', value: -9.00, accuracy: 'exact', category: 'Time', description: 'log₁₀(10⁻⁹) = -9.00', memo: '光が30cm進む時間' },
  { id: 't0b', name: '1マイクロ秒 (10⁻⁶秒)', value: -6.00, accuracy: 'exact', category: 'Time', description: 'log₁₀(10⁻⁶) = -6.00', memo: 'CPUの1クロック程度' },
  { id: 't0c', name: '1ミリ秒 (10⁻³秒)', value: -3.00, accuracy: 'exact', category: 'Time', description: 'log₁₀(10⁻³) = -3.00', memo: '音が34cm進む、人の反応限界' },
  { id: 't1', name: '1分 (60秒)', value: 1.78, accuracy: 'exact', category: 'Time', description: 'log₁₀(60) = 1.778', memo: '約1.8として概算可' },
  { id: 't2', name: '1時間 (3600秒)', value: 3.56, accuracy: 'up', category: 'Time', description: 'log₁₀(3600) = 3.556', memo: '🔑 よく使う！' },
  { id: 't3', name: '1日 (86400秒)', value: 4.94, accuracy: 'up', category: 'Time', description: 'log₁₀(86400) = 4.937', memo: '🔑 超重要！約5と覚える' },
  { id: 't4', name: '1週間', value: 5.78, accuracy: 'down', category: 'Time', description: 'log₁₀(604800) = 5.782', memo: '1日+log(7) = 4.94+0.85' },
  { id: 't5', name: '1ヶ月 (30日)', value: 6.41, accuracy: 'down', category: 'Time', description: 'log₁₀(2592000) = 6.414', memo: '1日+log(30) = 4.94+1.48' },
  { id: 't6', name: '1年 (365日)', value: 7.50, accuracy: 'exact', category: 'Time', description: 'log₁₀(31536000) = 7.499', memo: '🔑 超重要！π×10⁷秒' },
  { id: 't7', name: '10年', value: 8.50, accuracy: 'exact', category: 'Time', description: 'log₁₀(10年) = 8.499', memo: '1年+1' },
  { id: 't8', name: '100年 (1世紀)', value: 9.50, accuracy: 'exact', category: 'Time', description: 'log₁₀(100年) = 9.499', memo: '約30億秒' },
  { id: 't9', name: '人の寿命 (80年)', value: 9.40, accuracy: 'down', category: 'Time', description: 'log₁₀(80年) = 9.402', memo: '約25億秒' },
  { id: 't10', name: '1000年 (1ミレニアム)', value: 10.50, accuracy: 'exact', category: 'Time', description: 'log₁₀(1000年) = 10.499', memo: '文明スケール' },
  { id: 't11', name: '現代文明 (5000年前)', value: 11.20, accuracy: 'exact', category: 'Time', description: 'log₁₀(5000年) = 11.198', memo: 'メソポタミア・エジプト' },
  { id: 't12', name: '農耕開始 (1万年前)', value: 11.50, accuracy: 'exact', category: 'Time', description: 'log₁₀(10⁴年) = 11.499', memo: '新石器革命' },
  { id: 't13', name: '現生人類誕生 (30万年前)', value: 12.98, accuracy: 'up', category: 'Time', description: 'log₁₀(3×10⁵年) = 12.976', memo: 'ホモ・サピエンス登場' },
  { id: 't14', name: '恐竜絶滅 (6600万年前)', value: 15.32, accuracy: 'up', category: 'Time', description: 'log₁₀(6.6×10⁷年) = 15.319', memo: '白亜紀末' },
  { id: 't15', name: '生命誕生 (40億年前)', value: 17.10, accuracy: 'exact', category: 'Time', description: 'log₁₀(4×10⁹年) = 17.101', memo: '地球に最初の生命' },
  { id: 't16', name: '地球誕生 (46億年前)', value: 17.16, accuracy: 'down', category: 'Time', description: 'log₁₀(4.6×10⁹年) = 17.162', memo: '約46億年前' },
  { id: 't17', name: '宇宙誕生 (138億年前)', value: 17.64, accuracy: 'exact', category: 'Time', description: 'log₁₀(1.38×10¹⁰年) = 17.639', memo: '🔑 ビッグバン、約10¹⁷·⁵秒' },
  
  // ==========================================
  // 速度 (基準: m/s)
  // ==========================================
  { id: 'v1', name: 'カタツムリ (0.001m/s)', value: -3.00, accuracy: 'exact', category: 'Speed', description: 'log₁₀(10⁻³) = -3.00', memo: '1mm/s、非常にゆっくり' },
  { id: 'v2', name: '歩行速度 (1.4m/s)', value: 0.15, accuracy: 'up', category: 'Speed', description: 'log₁₀(1.4) = 0.146', memo: '約5km/h、不動産の徒歩1分=80m基準' },
  { id: 'v3', name: 'ジョギング (3m/s)', value: 0.48, accuracy: 'down', category: 'Speed', description: 'log₁₀(3) = 0.477', memo: '約10km/h' },
  { id: 'v4', name: 'ウサイン・ボルト (10m/s)', value: 1.00, accuracy: 'exact', category: 'Speed', description: 'log₁₀(10) = 1.00', memo: '🔑 人類最速 ≈ 36km/h' },
  { id: 'v5', name: '自転車 (7m/s)', value: 0.85, accuracy: 'up', category: 'Speed', description: 'log₁₀(7) = 0.845', memo: '約25km/h' },
  { id: 'v6', name: '一般道 (14m/s)', value: 1.15, accuracy: 'up', category: 'Speed', description: 'log₁₀(14) = 1.146', memo: '50km/h ≈ 14m/s' },
  { id: 'v7', name: '高速道路 (28m/s)', value: 1.45, accuracy: 'up', category: 'Speed', description: 'log₁₀(28) = 1.447', memo: '100km/h ≈ 28m/s' },
  { id: 'v8', name: '新幹線 (83m/s)', value: 1.92, accuracy: 'exact', category: 'Speed', description: 'log₁₀(83) = 1.919', memo: '300km/h、約2と覚える' },
  { id: 'v9', name: '旅客機 (250m/s)', value: 2.40, accuracy: 'exact', category: 'Speed', description: 'log₁₀(250) = 2.398', memo: '900km/h、時速で約10³' },
  { id: 'v10', name: 'コンコルド (600m/s)', value: 2.78, accuracy: 'exact', category: 'Speed', description: 'log₁₀(600) = 2.778', memo: 'マッハ1.8、超音速機' },
  { id: 'v11', name: '音速 (340m/s)', value: 2.53, accuracy: 'exact', category: 'Speed', description: 'log₁₀(340) = 2.531', memo: '🔑 マッハ1、約1200km/h' },
  { id: 'v12', name: '銃弾 (1000m/s)', value: 3.00, accuracy: 'exact', category: 'Speed', description: 'log₁₀(10³) = 3.00', memo: 'ライフル弾、音速の約3倍' },
  { id: 'v13', name: 'ISS (7.7km/s)', value: 3.89, accuracy: 'up', category: 'Speed', description: 'log₁₀(7700) = 3.886', memo: '約4、90分で地球一周' },
  { id: 'v14', name: '地球脱出速度 (11km/s)', value: 4.04, accuracy: 'exact', category: 'Speed', description: 'log₁₀(11000) = 4.041', memo: '第二宇宙速度' },
  { id: 'v15', name: '地球公転 (30km/s)', value: 4.48, accuracy: 'down', category: 'Speed', description: 'log₁₀(30000) = 4.477', memo: '太陽の周りを公転' },
  { id: 'v16', name: '太陽系脱出 (42km/s)', value: 4.62, accuracy: 'down', category: 'Speed', description: 'log₁₀(42000) = 4.623', memo: '第三宇宙速度' },
  { id: 'v17', name: 'ボイジャー1号 (17km/s)', value: 4.23, accuracy: 'exact', category: 'Speed', description: 'log₁₀(17000) = 4.230', memo: '人類最遠の探査機' },
  { id: 'v18', name: '光速 (3×10⁸m/s)', value: 8.48, accuracy: 'down', category: 'Speed', description: 'log₁₀(3×10⁸) = 8.477', memo: '🔑 宇宙最速、約8.5' },
  
  // ==========================================
  // 距離 (基準: m) - 原子核から宇宙まで
  // ==========================================
  { id: 'd0a', name: '原子核半径 (10⁻¹⁵m)', value: -15.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(10⁻¹⁵) = -15.00', memo: 'フェムトメートル、陽子の大きさ' },
  { id: 'd0b', name: '原子半径 (10⁻¹⁰m)', value: -10.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(10⁻¹⁰) = -10.00', memo: 'オングストローム、水素原子' },
  { id: 'd0c', name: 'DNA幅 (2nm)', value: -8.70, accuracy: 'exact', category: 'Distance', description: 'log₁₀(2×10⁻⁹) = -8.699', memo: '二重らせんの直径' },
  { id: 'd0d', name: 'ウイルス (100nm)', value: -7.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(10⁻⁷) = -7.00', memo: 'コロナウイルスなど' },
  { id: 'd0e', name: '細菌 (1μm)', value: -6.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(10⁻⁶) = -6.00', memo: '大腸菌など' },
  { id: 'd0f', name: '細胞 (10μm)', value: -5.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(10⁻⁵) = -5.00', memo: '赤血球は約7μm' },
  { id: 'd0g', name: '髪の毛の太さ (0.1mm)', value: -4.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(10⁻⁴) = -4.00', memo: '約100μm' },
  { id: 'd0h', name: 'アリ (3mm)', value: -2.52, accuracy: 'down', category: 'Distance', description: 'log₁₀(3×10⁻³) = -2.523', memo: '小さな生き物' },
  { id: 'd0i', name: '1cm', value: -2.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(10⁻²) = -2.00', memo: '指の幅' },
  { id: 'd0j', name: '手の長さ (20cm)', value: -0.70, accuracy: 'exact', category: 'Distance', description: 'log₁₀(0.2) = -0.699', memo: '身近な基準' },
  { id: 'd1', name: '人の身長 (1.7m)', value: 0.23, accuracy: 'exact', category: 'Distance', description: 'log₁₀(1.7) = 0.230', memo: '約0.23' },
  { id: 'd2', name: 'ウサイン・ボルト100m', value: 2.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(100) = 2.00', memo: '100m = 10²' },
  { id: 'd3', name: '東京タワー (333m)', value: 2.52, accuracy: 'down', category: 'Distance', description: 'log₁₀(333) = 2.522', memo: '約2.5' },
  { id: 'd4', name: 'スカイツリー (634m)', value: 2.80, accuracy: 'down', category: 'Distance', description: 'log₁₀(634) = 2.802', memo: '世界一高い電波塔' },
  { id: 'd4b', name: '富士山 (3776m)', value: 3.58, accuracy: 'down', category: 'Distance', description: 'log₁₀(3776) = 3.577', memo: '日本最高峰' },
  { id: 'd4c', name: 'エベレスト (8849m)', value: 3.95, accuracy: 'down', category: 'Distance', description: 'log₁₀(8849) = 3.947', memo: '世界最高峰、約4' },
  { id: 'd5', name: 'マラソン (42km)', value: 4.62, accuracy: 'down', category: 'Distance', description: 'log₁₀(42000) = 4.623', memo: '42.195km' },
  { id: 'd6', name: '東京-大阪 (500km)', value: 5.70, accuracy: 'exact', category: 'Distance', description: 'log₁₀(5×10⁵) = 5.699', memo: '新幹線で2時間半' },
  { id: 'd7', name: '日本列島 (3000km)', value: 6.48, accuracy: 'down', category: 'Distance', description: 'log₁₀(3×10⁶) = 6.477', memo: '北海道から沖縄' },
  { id: 'd8', name: '地球の半径 (6400km)', value: 6.81, accuracy: 'up', category: 'Distance', description: 'log₁₀(6.4×10⁶) = 6.806', memo: '🔑 約6.8' },
  { id: 'd9', name: '地球の円周 (4万km)', value: 7.60, accuracy: 'down', category: 'Distance', description: 'log₁₀(4×10⁷) = 7.602', memo: '赤道一周' },
  { id: 'd10', name: '地球-月 (38万km)', value: 8.58, accuracy: 'exact', category: 'Distance', description: 'log₁₀(3.8×10⁸) = 8.580', memo: '光で1.3秒' },
  { id: 'd11', name: '1AU 地球-太陽 (1.5億km)', value: 11.18, accuracy: 'down', category: 'Distance', description: 'log₁₀(1.5×10¹¹) = 11.176', memo: '🔑 光で8分' },
  { id: 'd11b', name: '冥王星軌道 (40AU)', value: 12.78, accuracy: 'exact', category: 'Distance', description: 'log₁₀(6×10¹²) = 12.778', memo: '太陽系の端' },
  { id: 'd12', name: '1光年 (9.5兆km)', value: 15.98, accuracy: 'down', category: 'Distance', description: 'log₁₀(9.5×10¹⁵) = 15.978', memo: '🔑 約16' },
  { id: 'd12b', name: '最寄りの恒星 (4.2光年)', value: 16.60, accuracy: 'exact', category: 'Distance', description: 'log₁₀(4×10¹⁶) = 16.602', memo: 'プロキシマ・ケンタウリ' },
  { id: 'd12c', name: '天の川銀河直径 (10万光年)', value: 21.00, accuracy: 'exact', category: 'Distance', description: 'log₁₀(10²¹) = 21.00', memo: '私たちの銀河' },
  { id: 'd12d', name: 'アンドロメダ銀河 (250万光年)', value: 22.38, accuracy: 'down', category: 'Distance', description: 'log₁₀(2.4×10²²) = 22.380', memo: '最も近い大型銀河' },
  { id: 'd12e', name: '観測可能な宇宙 (465億光年)', value: 26.64, accuracy: 'down', category: 'Distance', description: 'log₁₀(4.4×10²⁶) = 26.643', memo: '宇宙の地平線' },
  
  // ==========================================
  // 面積 (基準: m²)
  // ==========================================
  { id: 'a1', name: 'A4用紙 (0.06m²)', value: -1.22, accuracy: 'exact', category: 'Area', description: 'log₁₀(0.06) = -1.222', memo: '21×29.7cm ≈ 600cm²' },
  { id: 'a2', name: '畳1枚 (1.6m²)', value: 0.20, accuracy: 'down', category: 'Area', description: 'log₁₀(1.6) = 0.204', memo: '約90×180cm' },
  { id: 'a3', name: '6畳部屋 (10m²)', value: 1.00, accuracy: 'exact', category: 'Area', description: 'log₁₀(10) = 1.00', memo: '🔑 6畳≈10m²と覚える' },
  { id: 'a4', name: 'テニスコート (260m²)', value: 2.41, accuracy: 'down', category: 'Area', description: 'log₁₀(260) = 2.415', memo: 'シングルス: 23.8×8.2m' },
  { id: 'a5', name: 'サッカー場 (7000m²)', value: 3.85, accuracy: 'up', category: 'Area', description: 'log₁₀(7000) = 3.845', memo: '約100×70m ≈ 0.7ha' },
  { id: 'a6', name: '東京ドーム (4.7ha)', value: 4.67, accuracy: 'down', category: 'Area', description: 'log₁₀(47000) = 4.672', memo: '🔑 面積の基準として有名' },
  { id: 'a7', name: '1km² (100ha)', value: 6.00, accuracy: 'exact', category: 'Area', description: 'log₁₀(10⁶) = 6.00', memo: '1000m×1000m' },
  { id: 'a8', name: '皇居 (1.15km²)', value: 6.06, accuracy: 'exact', category: 'Area', description: 'log₁₀(1.15×10⁶) = 6.061', memo: '東京ドーム約25個分' },
  { id: 'a9', name: '山手線内側 (63km²)', value: 7.80, accuracy: 'exact', category: 'Area', description: 'log₁₀(6.3×10⁷) = 7.799', memo: '東京ドーム約1350個分' },
  { id: 'a10', name: '東京都 (2194km²)', value: 9.34, accuracy: 'exact', category: 'Area', description: 'log₁₀(2.194×10⁹) = 9.341', memo: '約2200km²' },
  { id: 'a11', name: '日本 (37.8万km²)', value: 11.58, accuracy: 'down', category: 'Area', description: 'log₁₀(3.78×10¹¹) = 11.577', memo: '🔑 約38万km²' },
  { id: 'a12', name: 'アメリカ (983万km²)', value: 12.99, accuracy: 'down', category: 'Area', description: 'log₁₀(9.83×10¹²) = 12.993', memo: '日本の約26倍' },
  { id: 'a13', name: '地球表面 (5.1億km²)', value: 14.71, accuracy: 'exact', category: 'Area', description: 'log₁₀(5.1×10¹⁴) = 14.708', memo: '陸地は約30%' },
  
  // ==========================================
  // エネルギー・仕事 (基準: J = Ws)
  // ==========================================
  { id: 'e1', name: '1cal (カロリー)', value: 0.62, accuracy: 'exact', category: 'Energy', description: 'log₁₀(4.18) = 0.621', memo: '1cal = 4.18J' },
  { id: 'e2', name: '1kcal (食品のカロリー)', value: 3.62, accuracy: 'exact', category: 'Energy', description: 'log₁₀(4180) = 3.621', memo: '🔑 1kcal = 4180J ≈ 4kJ' },
  { id: 'e3', name: 'おにぎり1個 (180kcal)', value: 5.88, accuracy: 'up', category: 'Energy', description: 'log₁₀(7.5×10⁵) = 5.875', memo: '約750kJ' },
  { id: 'e4', name: '1日の摂取カロリー (2000kcal)', value: 6.92, accuracy: 'down', category: 'Energy', description: 'log₁₀(8.4×10⁶) = 6.924', memo: '約8.4MJ/日' },
  { id: 'e5', name: 'スマホバッテリー (15Wh)', value: 4.73, accuracy: 'down', category: 'Energy', description: 'log₁₀(54000) = 4.732', memo: '15Wh = 54kJ' },
  { id: 'e6', name: 'ノートPCバッテリー (60Wh)', value: 5.33, accuracy: 'down', category: 'Energy', description: 'log₁₀(2.16×10⁵) = 5.334', memo: '60Wh = 216kJ' },
  { id: 'e7', name: '1kWh (電力量の単位)', value: 6.56, accuracy: 'up', category: 'Energy', description: 'log₁₀(3.6×10⁶) = 6.556', memo: '🔑 1kWh = 3.6MJ' },
  { id: 'e8', name: '家庭1日の電力量 (10kWh)', value: 7.56, accuracy: 'up', category: 'Energy', description: 'log₁₀(3.6×10⁷) = 7.556', memo: '約36MJ/日' },
  { id: 'e9', name: 'ガソリン1L (34MJ)', value: 7.53, accuracy: 'down', category: 'Energy', description: 'log₁₀(3.4×10⁷) = 7.531', memo: '🔑 ガソリンはエネルギー密度高い' },
  { id: 'e10', name: 'TNT 1kg (4.2MJ)', value: 6.62, accuracy: 'down', category: 'Energy', description: 'log₁₀(4.2×10⁶) = 6.623', memo: '爆発物の基準' },
  { id: 'e11', name: '広島原爆 (63TJ)', value: 13.80, accuracy: 'exact', category: 'Energy', description: 'log₁₀(6.3×10¹³) = 13.799', memo: '約15キロトンTNT' },
  
  // ==========================================
  // 電力・仕事率 (基準: W = J/s)
  // ==========================================
  { id: 'w1', name: 'LED電球 (10W)', value: 1.00, accuracy: 'exact', category: 'Power', description: 'log₁₀(10) = 1.00', memo: '白熱電球60W相当の明るさ' },
  { id: 'w2', name: 'スマホ充電 (5W)', value: 0.70, accuracy: 'exact', category: 'Power', description: 'log₁₀(5) = 0.699', memo: '低速充電器（5V×1A）' },
  { id: 'w3', name: '急速充電 (20W)', value: 1.30, accuracy: 'exact', category: 'Power', description: 'log₁₀(20) = 1.301', memo: 'iPhone急速充電' },
  { id: 'w4', name: '超急速充電 (100W)', value: 2.00, accuracy: 'exact', category: 'Power', description: 'log₁₀(100) = 2.00', memo: 'ノートPC/高速スマホ充電' },
  { id: 'w5', name: 'ノートPC (50W)', value: 1.70, accuracy: 'exact', category: 'Power', description: 'log₁₀(50) = 1.699', memo: '一般的な使用時' },
  { id: 'w6', name: 'デスクトップPC (300W)', value: 2.48, accuracy: 'down', category: 'Power', description: 'log₁₀(300) = 2.477', memo: 'ゲーミングPCなど' },
  { id: 'w7', name: '人間の基礎代謝 (80W)', value: 1.90, accuracy: 'down', category: 'Power', description: 'log₁₀(80) = 1.903', memo: '🔑 人は80Wの発熱体' },
  { id: 'w8', name: 'エアコン (1kW)', value: 3.00, accuracy: 'exact', category: 'Power', description: 'log₁₀(1000) = 3.00', memo: '6〜8畳用' },
  { id: 'w9', name: 'ドライヤー (1.2kW)', value: 3.08, accuracy: 'exact', category: 'Power', description: 'log₁₀(1200) = 3.079', memo: '強モード' },
  { id: 'w10', name: '電子レンジ (1.5kW)', value: 3.18, accuracy: 'down', category: 'Power', description: 'log₁₀(1500) = 3.176', memo: '出力は500-1000W' },
  { id: 'w11', name: '一般家庭ピーク (3kW)', value: 3.48, accuracy: 'down', category: 'Power', description: 'log₁₀(3000) = 3.477', memo: '30Aブレーカー' },
  { id: 'w12', name: '一般家庭平均 (500W)', value: 2.70, accuracy: 'exact', category: 'Power', description: 'log₁₀(500) = 2.699', memo: '年間約4400kWh÷8760時間' },
  { id: 'w13', name: 'EV充電 (7kW)', value: 3.85, accuracy: 'up', category: 'Power', description: 'log₁₀(7000) = 3.845', memo: '普通充電' },
  { id: 'w14', name: 'EV急速充電 (50kW)', value: 4.70, accuracy: 'exact', category: 'Power', description: 'log₁₀(50000) = 4.699', memo: 'CHAdeMO等' },
  { id: 'w15', name: '風力発電1基 (2MW)', value: 6.30, accuracy: 'exact', category: 'Power', description: 'log₁₀(2×10⁶) = 6.301', memo: '大型風車' },
  { id: 'w16', name: 'メガソーラー (10MW)', value: 7.00, accuracy: 'exact', category: 'Power', description: 'log₁₀(10⁷) = 7.00', memo: '約3万枚のパネル' },
  { id: 'w17', name: '火力発電所1基 (500MW)', value: 8.70, accuracy: 'exact', category: 'Power', description: 'log₁₀(5×10⁸) = 8.699', memo: '大規模な発電所' },
  { id: 'w18', name: '原子力発電所1基 (1GW)', value: 9.00, accuracy: 'exact', category: 'Power', description: 'log₁₀(10⁹) = 9.00', memo: '🔑 100万kW' },
  { id: 'w19', name: '日本の総発電能力 (200GW)', value: 11.30, accuracy: 'exact', category: 'Power', description: 'log₁₀(2×10¹¹) = 11.301', memo: '約2億kW' },
  { id: 'w20', name: 'サーバーラック (10kW)', value: 4.00, accuracy: 'exact', category: 'Power', description: 'log₁₀(10⁴) = 4.00', memo: '高密度ラック' },
  { id: 'w21', name: 'データセンター (100MW)', value: 8.00, accuracy: 'exact', category: 'Power', description: 'log₁₀(10⁸) = 8.00', memo: '大規模DC、原発の1/10' },
  { id: 'w22', name: 'ハイパースケールDC (500MW)', value: 8.70, accuracy: 'exact', category: 'Power', description: 'log₁₀(5×10⁸) = 8.699', memo: 'Google/AWS級' },
  
  // ==========================================
  // IT・データサイズ (基準: byte / bit)
  // ==========================================
  { id: 'i1', name: '1 KB', value: 3.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10³) = 3.00', memo: '厳密には1024だが≈1000' },
  { id: 'i2', name: '1 MB', value: 6.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10⁶) = 6.00', memo: '高画質写真1枚' },
  { id: 'i3', name: '1 GB', value: 9.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10⁹) = 9.00', memo: 'HD動画10分' },
  { id: 'i4', name: '1 TB', value: 12.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10¹²) = 12.00', memo: 'HDD/SSDの容量' },
  { id: 'i5', name: '1 PB', value: 15.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10¹⁵) = 15.00', memo: '大規模DB/DC' },
  { id: 'i6', name: 'Byte→bit変換 (×8)', value: 0.90, accuracy: 'down', category: 'IT', description: 'log₁₀(8) = 0.903', memo: '🔑 重要！B→bは+0.90' },
  { id: 'i7', name: '1 Mbps', value: 6.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10⁶) = 6.00', memo: 'HD動画ストリーミング' },
  { id: 'i8', name: '1 Gbps', value: 9.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10⁹) = 9.00', memo: '光回線' },
  { id: 'i9', name: '10 Gbps', value: 10.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10¹⁰) = 10.00', memo: 'DC内ネットワーク' },
  { id: 'i10', name: 'WiFi 6 (1.2Gbps)', value: 9.08, accuracy: 'exact', category: 'IT', description: 'log₁₀(1.2×10⁹) = 9.079', memo: '実効速度' },
  { id: 'i11', name: '5G (10Gbps)', value: 10.00, accuracy: 'exact', category: 'IT', description: 'log₁₀(10¹⁰) = 10.00', memo: '理論最大値' },
  
  // ==========================================
  // 人口・数量
  // ==========================================
  { id: 'n1', name: '日本の人口 (1.2億人)', value: 8.08, accuracy: 'exact', category: 'Population', description: 'log₁₀(1.2×10⁸) = 8.079', memo: '約8' },
  { id: 'n2', name: '東京都の人口 (1400万人)', value: 7.15, accuracy: 'up', category: 'Population', description: 'log₁₀(1.4×10⁷) = 7.146', memo: '日本の約10%' },
  { id: 'n3', name: 'アメリカの人口 (3.3億人)', value: 8.52, accuracy: 'down', category: 'Population', description: 'log₁₀(3.3×10⁸) = 8.518', memo: '日本の約2.7倍' },
  { id: 'n4', name: '世界人口 (80億人)', value: 9.90, accuracy: 'down', category: 'Population', description: 'log₁₀(8×10⁹) = 9.903', memo: '🔑 約10で概算' },
  { id: 'n5', name: '人体の細胞数 (37兆個)', value: 13.57, accuracy: 'exact', category: 'Population', description: 'log₁₀(3.7×10¹³) = 13.568', memo: '約37兆' },
  { id: 'n6', name: 'アボガドロ数', value: 23.78, accuracy: 'exact', category: 'Population', description: 'log₁₀(6×10²³) = 23.778', memo: '1molあたりの粒子数' },
  
  // ==========================================
  // 確率・指数関数 (eの世界)
  // ==========================================
  { id: 'prob1', name: 'e (自然対数の底)', value: 0.43, accuracy: 'down', category: 'Probability', description: 'log₁₀(2.718) = 0.434', memo: '🔑 log₁₀(e) ≈ 0.43、確率計算の核心' },
  { id: 'prob2', name: 'log₁₀(e)', value: 0.43, accuracy: 'down', category: 'Probability', description: 'log₁₀(e) = 0.4343', memo: '🔑 ln(x) を log₁₀(x) に変換: ×0.43' },
  { id: 'prob3', name: 'ln(10) = 1/log₁₀(e)', value: 2.30, accuracy: 'down', category: 'Probability', description: 'ln(10) = 2.303', memo: '🔑 log₁₀(x) を ln(x) に変換: ×2.3' },
  { id: 'prob4', name: '1/e ≈ 0.37', value: -0.43, accuracy: 'up', category: 'Probability', description: 'log₁₀(1/e) = -0.434', memo: '🔑 n回中「1回も当たらない」確率' },
  { id: 'prob5', name: '1-1/e ≈ 0.63', value: -0.20, accuracy: 'exact', category: 'Probability', description: 'log₁₀(0.632) = -0.199', memo: '🔑 n回中「少なくとも1回当たる」確率' },
  { id: 'prob6', name: 'ln(2) ≈ 0.69', value: -0.16, accuracy: 'exact', category: 'Probability', description: 'log₁₀(0.693) = -0.159', memo: '🔑 50%になる回数の係数' },
  { id: 'prob7', name: '1%ガチャを50%で引く回数', value: 1.84, accuracy: 'down', category: 'Probability', description: 'log₁₀(69) = 1.839', memo: 'ln(2)/0.01 ≈ 69回' },
  { id: 'prob8', name: '1%ガチャを63%で引く回数', value: 2.00, accuracy: 'exact', category: 'Probability', description: 'log₁₀(100) = 2.00', memo: '1/p = 100回で約63%' },
  { id: 'prob9', name: '1%ガチャを95%で引く回数', value: 2.48, accuracy: 'down', category: 'Probability', description: 'log₁₀(300) = 2.477', memo: 'ln(20)/0.01 ≈ 300回（3倍が目安）' },
  { id: 'prob10', name: '0.1%ガチャを50%で引く回数', value: 2.84, accuracy: 'down', category: 'Probability', description: 'log₁₀(693) = 2.841', memo: 'ln(2)/0.001 ≈ 693回' },
  { id: 'prob11', name: '誕生日問題 23人', value: 1.36, accuracy: 'exact', category: 'Probability', description: 'log₁₀(23) = 1.362', memo: '50%で同じ誕生日のペア発生' },
  { id: 'prob12', name: '誕生日問題 50人', value: 1.70, accuracy: 'exact', category: 'Probability', description: 'log₁₀(50) = 1.699', memo: '97%で同じ誕生日のペア発生' },
  { id: 'prob13', name: '√365 ≈ 19', value: 1.28, accuracy: 'exact', category: 'Probability', description: 'log₁₀(19) = 1.279', memo: '誕生日問題の目安人数' },
  
  // ==========================================
  // 物理定数
  // ==========================================
  { id: 'p1', name: '重力加速度 g (10 m/s²)', value: 1.00, accuracy: 'exact', category: 'Physics', description: 'log₁₀(10) = 1.00', memo: '🔑 正確には9.8' },
  { id: 'p2', name: '音速 (340 m/s)', value: 2.53, accuracy: 'exact', category: 'Physics', description: 'log₁₀(340) = 2.531', memo: '気温20℃での値' },
  { id: 'p3', name: '光速 (3×10⁸ m/s)', value: 8.48, accuracy: 'down', category: 'Physics', description: 'log₁₀(3×10⁸) = 8.477', memo: '🔑 約8.5' },
  { id: 'p4', name: '水の密度 (1000 kg/m³)', value: 3.00, accuracy: 'exact', category: 'Physics', description: 'log₁₀(1000) = 3.00', memo: '1g/cm³ = 1000kg/m³' },
  { id: 'p5', name: '大気圧 (10⁵ Pa)', value: 5.00, accuracy: 'exact', category: 'Physics', description: 'log₁₀(10⁵) = 5.00', memo: '1気圧 ≈ 100kPa' },
  { id: 'p6', name: '地球の質量 (6×10²⁴ kg)', value: 24.78, accuracy: 'exact', category: 'Physics', description: 'log₁₀(6×10²⁴) = 24.778', memo: '約25' },
  { id: 'p7', name: '太陽の質量 (2×10³⁰ kg)', value: 30.30, accuracy: 'exact', category: 'Physics', description: 'log₁₀(2×10³⁰) = 30.301', memo: '地球の33万倍' },
  
  // ==========================================
  // 単位変換（重要！）
  // ==========================================
  { id: 'u1', name: 'km → m', value: 3.00, accuracy: 'exact', category: 'Unit', description: '1km = 10³m → +3.00', memo: '🔑 距離の変換' },
  { id: 'u2', name: 'hour → sec', value: 3.56, accuracy: 'up', category: 'Unit', description: '1時間 = 3600秒 → +3.56', memo: '約+3.5' },
  { id: 'u3', name: 'day → sec', value: 4.94, accuracy: 'up', category: 'Unit', description: '1日 = 86400秒 → +4.94', memo: '🔑 約+5' },
  { id: 'u4', name: 'year → sec', value: 7.50, accuracy: 'exact', category: 'Unit', description: '1年 ≈ 3.15×10⁷秒 → +7.50', memo: '🔑 超重要' },
  { id: 'u5', name: 'kWh → J', value: 6.56, accuracy: 'up', category: 'Unit', description: '1kWh = 3.6MJ → +6.56', memo: '電力量の変換' },
  { id: 'u6', name: 'kcal → J', value: 3.62, accuracy: 'exact', category: 'Unit', description: '1kcal ≈ 4200J → +3.62', memo: '約+3.6' },
  { id: 'u7', name: 'Byte → bit', value: 0.90, accuracy: 'down', category: 'Unit', description: '×8 → +0.90', memo: '🔑 データ転送計算で必須' },
  { id: 'u8', name: 'ha → m²', value: 4.00, accuracy: 'exact', category: 'Unit', description: '1ha = 10⁴m² → +4.00', memo: '100m×100m' },
  { id: 'u9', name: 'km² → m²', value: 6.00, accuracy: 'exact', category: 'Unit', description: '1km² = 10⁶m² → +6.00', memo: '面積の変換' },
  { id: 'u10', name: 'km/h → m/s', value: -0.56, accuracy: 'up', category: 'Unit', description: '÷3.6 → -0.56、約-0.5', memo: '🔑 時速→秒速は÷3.6' },
  { id: 'u11', name: 'm/s → km/h', value: 0.56, accuracy: 'up', category: 'Unit', description: '×3.6 → +0.56、約+0.5', memo: '秒速→時速は×3.6' },
  { id: 'u12', name: '光年 → m', value: 15.98, accuracy: 'down', category: 'Unit', description: '1光年 ≈ 10¹⁶m → +15.98', memo: '天文単位の変換' },
  { id: 'u13', name: 'eV → J', value: -18.80, accuracy: 'exact', category: 'Unit', description: '1eV = 1.6×10⁻¹⁹J', memo: '電子ボルトの変換' },
  { id: 'u14', name: 'Wh → J', value: 3.56, accuracy: 'up', category: 'Unit', description: '1Wh = 3600J → +3.56', memo: '🔑 1Wh = 1W × 1時間' },
  { id: 'u15', name: 'AU → m', value: 11.18, accuracy: 'down', category: 'Unit', description: '1AU = 1.5×10¹¹m → +11.18', memo: '天文単位' },
];

// カテゴリのリスト
export const CATEGORIES = [
  { id: 'all', name: 'すべて', color: 'gray', icon: '📋' },
  { id: 'Math', name: '数学', color: 'blue', icon: '🔢' },
  { id: 'Probability', name: '確率・e', color: 'rose', icon: '🎲' },
  { id: 'Time', name: '時間', color: 'green', icon: '⏰' },
  { id: 'Speed', name: '速度', color: 'emerald', icon: '🚀' },
  { id: 'Distance', name: '距離', color: 'purple', icon: '📏' },
  { id: 'Area', name: '面積', color: 'yellow', icon: '📐' },
  { id: 'Energy', name: 'エネルギー', color: 'orange', icon: '⚡' },
  { id: 'Power', name: '電力・仕事率', color: 'red', icon: '🔌' },
  { id: 'IT', name: 'IT・データ', color: 'cyan', icon: '💻' },
  { id: 'Population', name: '人口・数量', color: 'pink', icon: '👥' },
  { id: 'Physics', name: '物理', color: 'indigo', icon: '🔬' },
  { id: 'Unit', name: '単位変換', color: 'teal', icon: '🔄' },
];

// レベル表示用
export const USER_LEVELS = [
  { minSolved: 0, title: 'Log初心者', emoji: '🌱' },
  { minSolved: 5, title: 'Log見習い', emoji: '📖' },
  { minSolved: 10, title: 'Log使い', emoji: '✨' },
  { minSolved: 20, title: 'Log職人', emoji: '🔧' },
  { minSolved: 35, title: 'Logマスター', emoji: '🎓' },
  { minSolved: 50, title: 'Log博士', emoji: '🔬' },
  { minSolved: 75, title: 'Log仙人', emoji: '🧙' },
  { minSolved: 100, title: 'Log神', emoji: '👑' },
];

// 9x10の対数変換マップを生成
// row: 1-9 (1.x, 2.x, ... 9.x)
// col: 0-9 (.x0, .x1, ... .x9)
// 例: logMap[0][2] = log(1.2) の値
export const LOG_MAP = (() => {
  const map = [];
  for (let row = 1; row <= 9; row++) {
    const rowData = [];
    for (let col = 0; col <= 9; col++) {
      const num = row + col * 0.1;
      const exactLog = Math.log10(num);
      const rounded = Math.round(exactLog * 100) / 100;
      const diff = exactLog - rounded;
      let accuracy;
      if (diff > 0.003) {
        accuracy = 'down'; // 切り捨て（真値が大きい）→ 赤
      } else if (diff < -0.003) {
        accuracy = 'up'; // 切り上げ（真値が小さい）→ 青
      } else {
        accuracy = 'exact'; // 近い → 黒
      }
      rowData.push({
        num: num.toFixed(1),
        log: rounded.toFixed(2),
        accuracy
      });
    }
    map.push(rowData);
  }
  return map;
})();

// 逆変換マップ (log値 → 元の数値) - 0.00〜0.99のlog値に対する10^xの値
export const INVERSE_LOG_MAP = (() => {
  const map = [];
  // 10行 (0.0〜0.9) × 10列 (.00〜.09)
  for (let row = 0; row < 10; row++) {
    const rowData = [];
    for (let col = 0; col < 10; col++) {
      const logValue = row * 0.1 + col * 0.01;
      const actualValue = Math.pow(10, logValue);
      const rounded = Math.round(actualValue * 100) / 100;
      
      // 精度チェック
      let accuracy = 'exact';
      if (rounded > actualValue + 0.005) {
        accuracy = 'up'; // 切り上げ
      } else if (rounded < actualValue - 0.005) {
        accuracy = 'down'; // 切り捨て
      }
      
      rowData.push({
        log: logValue.toFixed(2),
        value: rounded.toFixed(2),
        accuracy
      });
    }
    map.push(rowData);
  }
  return map;
})();

// 色の取得ヘルパー関数
export const getAccuracyColor = (accuracy) => {
  switch (accuracy) {
    case 'up': return 'text-blue-600'; // 切り上げ（真値が小さい）
    case 'down': return 'text-red-600'; // 切り捨て（真値が大きい）
    default: return 'text-gray-900'; // 近い
  }
};

export const getAccuracyBgColor = (accuracy) => {
  switch (accuracy) {
    case 'up': return 'bg-blue-50';
    case 'down': return 'bg-red-50';
    default: return 'bg-white';
  }
};

