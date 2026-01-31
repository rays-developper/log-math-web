// クイズ問題データ
// カテゴリ: IT, Energy, Power, Area, Time, Physics, Daily
export const PROBLEMS = [
  // ==========================================
  // Level 1: 基本的な問題（Log算入門）
  // ==========================================
  {
    id: 1,
    level: 1,
    category: 'IT',
    title: "1TBの転送時間",
    description: "1TBのデータを1Gbpsの回線で送る場合、何秒かかる？",
    targetLog: 3.9,
    tolerance: 0.2,
    hint: "1TB=12.0, Byte→bit変換=+0.9, 1Gbps=9.0",
    explanation: "【計算式】12.0(TB) + 0.9(×8でbit化) - 9.0(Gbps) = 3.9\n\n1TB = 10¹²バイト → 10¹²·⁹ビット\n1Gbps = 10⁹ビット/秒\n10¹²·⁹ ÷ 10⁹ = 10³·⁹秒 ≈ 7943秒（約2.2時間）",
    unit: "秒"
  },
  {
    id: 2,
    level: 1,
    category: 'Time',
    title: "1年は何秒？",
    description: "1年間は約何秒でしょうか？",
    targetLog: 7.5,
    tolerance: 0.15,
    hint: "1年 ≈ 365日、1日 = 10^4.9秒",
    explanation: "【計算式】log(365) + 4.9 ≈ 2.56 + 4.9 = 7.46 ≈ 7.5\n\n365 ≈ 400 = 4×10² (log ≈ 2.6)\n1日 = 86400秒 (log = 4.9)\n合計: 10⁷·⁵秒 ≈ 3150万秒\n\n💡 覚え方: 「1年 ≈ π×10⁷秒」",
    unit: "秒"
  },
  {
    id: 3,
    level: 1,
    category: 'Daily',
    title: "コップ1杯の水",
    description: "コップ1杯の水（200ml）は何グラム？",
    targetLog: 2.3,
    tolerance: 0.1,
    hint: "水の密度は1g/ml、200 = 2×100",
    explanation: "【計算式】log(200) = log(2×10²) = 0.3 + 2 = 2.3\n\n200mlの水 = 200グラム（水の密度が1g/ml）\n200 = 2×100 なので log(2)+log(100) = 0.3+2 = 2.3",
    unit: "グラム"
  },
  {
    id: 4,
    level: 1,
    category: 'Area',
    title: "6畳の部屋",
    description: "6畳の部屋の面積は約何m²？",
    targetLog: 1.0,
    tolerance: 0.1,
    hint: "畳1枚 ≈ 1.6m²",
    explanation: "【計算式】log(6 × 1.6) = log(9.6) ≈ 1.0\n\n畳1枚 ≈ 1.6m² (90×180cm)\n6畳 = 6 × 1.6 ≈ 10m²\n\n💡 覚え方: 「6畳 ≈ 10m²」は超便利！",
    unit: "m²"
  },
  {
    id: 5,
    level: 1,
    category: 'Power',
    title: "人間は何ワット？",
    description: "人間の基礎代謝は約何ワット（J/s）？",
    targetLog: 1.9,
    tolerance: 0.15,
    hint: "1日の基礎代謝 ≈ 1500kcal、1kcal ≈ 4200J",
    explanation: "【計算式】\n基礎代謝 1500kcal/日 = 1500 × 4200J ÷ 86400秒\n= 6.3×10⁶ ÷ 8.6×10⁴ ≈ 73W\n\nlog(73) ≈ 1.86 ≈ 1.9\n\n💡 覚え方: 「人間 ≈ 80W電球」",
    unit: "W"
  },
  
  // ==========================================
  // Level 2: 中級問題（フェルミ推定入門）
  // ==========================================
  {
    id: 6,
    level: 2,
    category: 'Physics',
    title: "音の伝わる時間",
    description: "1km離れた場所で雷が落ちた。雷鳴は何秒後に届く？",
    targetLog: 0.47,
    tolerance: 0.15,
    hint: "音速 ≈ 340m/s (log ≈ 2.53)",
    explanation: "【計算式】log(1000) - log(340) = 3.0 - 2.53 = 0.47\n\n1000m ÷ 340m/s = 10⁰·⁴⁷ ≈ 2.9秒\n\n💡 「光ってから3秒後に雷鳴 → 1km先」",
    unit: "秒"
  },
  {
    id: 7,
    level: 2,
    category: 'Area',
    title: "日本の人口密度",
    description: "日本の人口（1.2億人）÷ 面積（38万km²）= 人口密度は？",
    targetLog: 2.5,
    tolerance: 0.15,
    hint: "人口: log ≈ 8.08、面積: log(3.8×10⁵) ≈ 5.58",
    explanation: "【計算式】8.08 - 5.58 = 2.5\n\n1.2億人 = 1.2×10⁸ (log ≈ 8.08)\n38万km² = 3.8×10⁵ (log ≈ 5.58)\n\n人口密度 = 10²·⁵ ≈ 316人/km²",
    unit: "人/km²"
  },
  {
    id: 8,
    level: 2,
    category: 'Physics',
    title: "月まで光で何秒？",
    description: "地球から月までの距離（38万km）を光が進む時間は？",
    targetLog: 0.1,
    tolerance: 0.15,
    hint: "距離: 3.8×10⁸m (log≈8.58)、光速: 3×10⁸m/s (log≈8.48)",
    explanation: "【計算式】8.58 - 8.48 = 0.1\n\n38万km = 3.8×10⁸m\n光速 = 3×10⁸ m/s\n時間 = 10⁰·¹ ≈ 1.26秒\n\n💡 月は光で約1.3秒の距離",
    unit: "秒"
  },
  {
    id: 9,
    level: 2,
    category: 'Power',
    title: "スマホの充電時間",
    description: "15Whのスマホバッテリーを5W充電器で満充電するのに何秒？",
    targetLog: 4.03,
    tolerance: 0.2,
    hint: "15Wh = 15×3600J = 54000J",
    explanation: "【計算式】\n15Wh = 15 × 3600秒 × 1W = 54000J\n充電時間 = 54000J ÷ 5W = 10800秒\n\nlog(10800) = log(1.08×10⁴) ≈ 4.03\n\n約3時間かかる（低速充電）",
    unit: "秒"
  },
  {
    id: 10,
    level: 2,
    category: 'Power',
    title: "急速充電 vs 低速充電",
    description: "同じスマホ(15Wh)を20W急速充電器で充電。5W充電と比べて何倍速い？",
    targetLog: 0.6,
    tolerance: 0.1,
    hint: "20W ÷ 5W = ?",
    explanation: "【計算式】log(20/5) = log(4) = 2×0.3 = 0.6\n\n20W ÷ 5W = 4倍速い\nlog(4) = log(2²) = 2×log(2) = 0.6\n\n💡 4倍速 = 45分で満充電！",
    unit: "倍"
  },
  {
    id: 11,
    level: 2,
    category: 'Energy',
    title: "おにぎりのエネルギー",
    description: "おにぎり1個（180kcal）は何ジュール？",
    targetLog: 5.88,
    tolerance: 0.2,
    hint: "1kcal ≈ 4200J (log ≈ 3.62)",
    explanation: "【計算式】log(180) + 3.62 = 2.26 + 3.62 = 5.88\n\n180kcal × 4200J/kcal = 756,000J ≈ 7.5×10⁵J\n\n💡 おにぎり1個 ≈ 750kJ",
    unit: "J"
  },
  {
    id: 12,
    level: 2,
    category: 'Area',
    title: "東京ドーム何個分？",
    description: "皇居（1.15km²）は東京ドーム（4.7ha）何個分？",
    targetLog: 1.39,
    tolerance: 0.15,
    hint: "1km² = 100ha、皇居 = 115ha",
    explanation: "【計算式】\n皇居 = 1.15km² = 115ha\n東京ドーム = 4.7ha\n\n115 ÷ 4.7 ≈ 24.5個\nlog(24.5) ≈ 1.39\n\n💡 皇居 ≈ 東京ドーム25個分",
    unit: "個"
  },

  // ==========================================
  // Level 3: 上級問題（複合計算）
  // ==========================================
  {
    id: 13,
    level: 3,
    category: 'Physics',
    title: "富士山からの自由落下",
    description: "富士山の頂上（3776m）から物を落とすと、何秒で地面に着く？（空気抵抗無視）",
    targetLog: 1.44,
    tolerance: 0.15,
    hint: "h = ½gt² → t = √(2h/g)、g ≈ 10 m/s²",
    explanation: "【計算式】\nt² = 2h/g = 2×3776/10 = 755.2\nt = √755.2 ≈ 27.5秒\n\nlog(t) = log(√755.2) = 0.5×log(755.2) = 0.5×2.88 = 1.44",
    unit: "秒"
  },
  {
    id: 14,
    level: 3,
    category: 'IT',
    title: "Googleの検索回数",
    description: "Googleは1日に約85億回検索される。1秒あたり何回？",
    targetLog: 4.99,
    tolerance: 0.15,
    hint: "85億 = 8.5×10⁹、1日 = 86400秒 (log ≈ 4.94)",
    explanation: "【計算式】log(8.5×10⁹) - log(86400) = 9.93 - 4.94 = 4.99\n\n85億 ÷ 86400 ≈ 98,000回/秒\n\n💡 毎秒10万回近い検索！",
    unit: "回/秒"
  },
  {
    id: 15,
    level: 3,
    category: 'Power',
    title: "データセンター vs 原発",
    description: "大規模データセンター（100MW）は原発1基（1GW）の何分の1？",
    targetLog: -1.0,
    tolerance: 0.1,
    hint: "100MW = 10⁸W、1GW = 10⁹W",
    explanation: "【計算式】log(10⁸) - log(10⁹) = 8 - 9 = -1\n\n100MW ÷ 1000MW = 0.1 = 1/10\n\n💡 大規模DC = 原発の1/10の電力",
    unit: "(比率)"
  },
  {
    id: 16,
    level: 3,
    category: 'Energy',
    title: "ガソリン車の燃費",
    description: "ガソリン1L（34MJ）で50km走る車。1kmあたり何kJ消費？",
    targetLog: 2.83,
    tolerance: 0.15,
    hint: "34MJ = 34000kJ、50km = 10^1.7km",
    explanation: "【計算式】\n34000kJ ÷ 50km = 680kJ/km\n\nlog(680) = log(6.8×10²) = 0.83 + 2 = 2.83\n\n💡 1kmあたり約700kJ消費",
    unit: "kJ/km"
  },
  {
    id: 17,
    level: 3,
    category: 'Power',
    title: "家庭の年間電気代",
    description: "平均500Wで電気を使う家庭の年間電力量（kWh）は？",
    targetLog: 3.64,
    tolerance: 0.15,
    hint: "500W × 1年(時間) = ? Wh → kWhに変換",
    explanation: "【計算式】\n500W × 8760時間/年 = 4,380,000Wh = 4380kWh\n\nlog(4380) ≈ 3.64\n\n💡 一般家庭 ≈ 年間4000〜5000kWh",
    unit: "kWh"
  },
  {
    id: 18,
    level: 3,
    category: 'Area',
    title: "アメリカと日本",
    description: "アメリカ（983万km²）は日本（37.8万km²）の何倍？",
    targetLog: 1.41,
    tolerance: 0.15,
    hint: "983万 = 9.83×10⁶、37.8万 = 3.78×10⁵",
    explanation: "【計算式】\nlog(9.83×10⁶) - log(3.78×10⁵) = 6.99 - 5.58 = 1.41\n\n10^1.41 ≈ 26倍\n\n💡 アメリカは日本の約26倍の広さ",
    unit: "倍"
  },
  {
    id: 19,
    level: 3,
    category: 'Energy',
    title: "人間は1日何J消費？",
    description: "1日2000kcal摂取する人が消費するエネルギーは何J？",
    targetLog: 6.92,
    tolerance: 0.15,
    hint: "1kcal ≈ 4200J (log ≈ 3.62)",
    explanation: "【計算式】\nlog(2000) + log(4200) = 3.3 + 3.62 = 6.92\n\n2000 × 4200 = 8,400,000J = 8.4MJ\n\n💡 人間 ≈ 1日8〜9MJ消費",
    unit: "J"
  },
  {
    id: 20,
    level: 3,
    category: 'Power',
    title: "風力発電で家庭何軒？",
    description: "2MWの風力発電1基で、平均500W使用の家庭を何軒まかなえる？（稼働率30%として）",
    targetLog: 3.08,
    tolerance: 0.2,
    hint: "実効出力 = 2MW × 0.3 = 600kW",
    explanation: "【計算式】\n実効出力 = 2,000,000W × 0.3 = 600,000W\n家庭数 = 600,000 ÷ 500 = 1,200軒\n\nlog(1200) ≈ 3.08\n\n💡 風車1基 ≈ 1000軒分の電力",
    unit: "軒"
  },

  // ==========================================
  // Level 4: 超上級問題（総合力）
  // ==========================================
  {
    id: 21,
    level: 4,
    category: 'Physics',
    title: "全身のDNAの長さ",
    description: "1細胞のDNA（2m）× 全身の細胞（37兆個）= 合計何km？",
    targetLog: 10.87,
    tolerance: 0.2,
    hint: "37兆 = 3.7×10¹³ (log≈13.57)、2m (log=0.3)、km変換で-3",
    explanation: "【計算式】\n0.3(2m) + 13.57(37兆) - 3(km変換) = 10.87\n\n2m × 3.7×10¹³ = 7.4×10¹³m = 7.4×10¹⁰km\n\n💡 地球-太陽間(1.5億km)の約500倍！",
    unit: "km"
  },
  {
    id: 22,
    level: 4,
    category: 'IT',
    title: "世界のデータ量",
    description: "世界のデータ総量（約100ZB = 10²³バイト）をBlu-ray（25GB）に保存すると何枚必要？",
    targetLog: 12.6,
    tolerance: 0.2,
    hint: "100ZB = 10²³B、25GB = 2.5×10¹⁰B",
    explanation: "【計算式】\nlog(10²³) - log(2.5×10¹⁰) = 23 - 10.4 = 12.6\n\n10¹²·⁶ ≈ 4×10¹²枚 = 4兆枚\n\n💡 4兆枚のBlu-rayが必要！",
    unit: "枚"
  },
  {
    id: 23,
    level: 4,
    category: 'Power',
    title: "日本全体の電力",
    description: "日本の年間発電量（約1兆kWh）を原発（1GW×稼働率80%）だけでまかなうには何基必要？",
    targetLog: 2.15,
    tolerance: 0.2,
    hint: "1基の年間発電量 = 1GW × 0.8 × 8760時間 = 7×10⁹Wh = 7×10⁶kWh",
    explanation: "【計算式】\n1基の年間 = 10⁹W × 0.8 × 8760h = 7×10¹²Wh = 7×10⁶kWh\n必要基数 = 10¹²kWh ÷ 7×10⁶kWh ≈ 143基\n\nlog(143) ≈ 2.15\n\n💡 実際は約30基程度が稼働",
    unit: "基"
  },
  {
    id: 24,
    level: 4,
    category: 'Energy',
    title: "人類のエネルギー消費",
    description: "世界の年間エネルギー消費（約600EJ = 6×10²⁰J）。1秒あたり何W？",
    targetLog: 13.28,
    tolerance: 0.2,
    hint: "1年 = 3.15×10⁷秒 (log=7.5)",
    explanation: "【計算式】\nlog(6×10²⁰) - 7.5 = 20.78 - 7.5 = 13.28\n\n6×10²⁰J ÷ 3.15×10⁷秒 ≈ 1.9×10¹³W = 19TW\n\n💡 人類全体で約20TW消費",
    unit: "W"
  },
  {
    id: 25,
    level: 4,
    category: 'Area',
    title: "ソーラーで日本の電力",
    description: "日本の電力（200GW）を太陽光（150W/m²×稼働率15%）で賄うには何km²必要？",
    targetLog: 4.85,
    tolerance: 0.2,
    hint: "実効出力 = 150×0.15 = 22.5W/m²",
    explanation: "【計算式】\n必要面積 = 2×10¹¹W ÷ 22.5W/m² = 8.9×10⁹m²\nkm²に変換: 8.9×10⁹ ÷ 10⁶ = 8900km²\n\nlog(8900) ≈ 3.95 → 約4で概算OK\n\n💡 山手線内側(63km²)の約140倍\n💡 四国(18,300km²)の約半分",
    unit: "km²"
  },
  {
    id: 26,
    level: 4,
    category: 'IT',
    title: "YouTubeの1日のデータ量",
    description: "YouTube視聴（世界で1日10億時間、平均5Mbps）の1日のデータ転送量は何PB？",
    targetLog: 3.45,
    tolerance: 0.25,
    hint: "10億時間 = 10⁹×3600秒、5Mbps = 5×10⁶bps、8で割ってByte",
    explanation: "【計算式】\n10⁹時間 × 3600秒 × 5×10⁶bps ÷ 8 = 2.25×10¹⁸Byte\n= 2250PB\n\nlog(2250) ≈ 3.35\n\n💡 1日で約2000PB（2EB）以上！",
    unit: "PB"
  },
  {
    id: 27,
    level: 4,
    category: 'Physics',
    title: "地球一周歩くと？",
    description: "地球の赤道（4万km）を時速5kmで歩くと何日かかる？",
    targetLog: 3.9,
    tolerance: 0.15,
    hint: "4万km ÷ 5km/h = 8000時間、1日=24時間",
    explanation: "【計算式】\n4×10⁴km ÷ 5km/h = 8000時間\n8000 ÷ 24 ≈ 333日\n\nlog(333) ≈ 2.52\n\n💡 約1年弱で地球一周（休憩なしなら）",
    unit: "日"
  },
  {
    id: 28,
    level: 4,
    category: 'Power',
    title: "EVの充電コスト",
    description: "60kWhバッテリーのEV。電気代30円/kWhで満充電のコストは？（Log値で）",
    targetLog: 3.26,
    tolerance: 0.15,
    hint: "60kWh × 30円/kWh = ?円",
    explanation: "【計算式】\n60 × 30 = 1800円\n\nlog(1800) = log(1.8×10³) ≈ 3.26\n\n💡 ガソリン車（50L×160円=8000円）の約1/4！",
    unit: "円"
  },

  // ==========================================
  // Level 5: 神問題（総合応用）
  // ==========================================
  {
    id: 29,
    level: 5,
    category: 'Energy',
    title: "広島原爆 vs おにぎり",
    description: "広島原爆のエネルギー（63TJ）はおにぎり（750kJ）何個分？",
    targetLog: 7.92,
    tolerance: 0.2,
    hint: "63TJ = 6.3×10¹³J、おにぎり = 7.5×10⁵J",
    explanation: "【計算式】\nlog(6.3×10¹³) - log(7.5×10⁵) = 13.8 - 5.88 = 7.92\n\n10⁷·⁹² ≈ 8400万個\n\n💡 原爆1個 ≈ おにぎり8000万個分のエネルギー",
    unit: "個"
  },
  {
    id: 30,
    level: 5,
    category: 'IT',
    title: "ChatGPTの推論コスト",
    description: "GPT-4が1回の応答（1000トークン）に使う電力を0.001kWhとする。1日1億回使われると年間何MWh？",
    targetLog: 4.56,
    tolerance: 0.2,
    hint: "0.001kWh × 10⁸回/日 × 365日",
    explanation: "【計算式】\n10⁻³kWh × 10⁸ × 365 = 3.65×10⁷kWh = 36500MWh\n\nlog(36500) ≈ 4.56\n\n💡 年間約3.7万MWh = 約1万世帯分",
    unit: "MWh"
  },
  {
    id: 31,
    level: 5,
    category: 'Physics',
    title: "太陽のエネルギー",
    description: "太陽が1秒間に放出するエネルギー（3.8×10²⁶W）。これは原発（1GW）何基分？",
    targetLog: 17.58,
    tolerance: 0.2,
    hint: "3.8×10²⁶W ÷ 10⁹W",
    explanation: "【計算式】\nlog(3.8×10²⁶) - log(10⁹) = 26.58 - 9 = 17.58\n\n10¹⁷·⁵⁸ ≈ 4×10¹⁷基\n\n💡 太陽 = 原発4京基分！（想像を絶する）",
    unit: "基"
  },
  {
    id: 32,
    level: 5,
    category: 'Area',
    title: "世界の農地",
    description: "世界の農地（約5000万km²）で80億人を養う。1人あたり何m²？",
    targetLog: 3.8,
    tolerance: 0.15,
    hint: "5×10⁷km² = 5×10¹³m²、80億人 = 8×10⁹人",
    explanation: "【計算式】\nlog(5×10¹³) - log(8×10⁹) = 13.7 - 9.9 = 3.8\n\n10³·⁸ ≈ 6300m²/人\n\n💡 1人あたりサッカー場1面弱の農地が必要",
    unit: "m²/人"
  },
  {
    id: 33,
    level: 5,
    category: 'Time',
    title: "宇宙の年齢",
    description: "宇宙の年齢（138億年）は何秒？",
    targetLog: 17.64,
    tolerance: 0.2,
    hint: "1年 = 10^7.5秒、138億 = 1.38×10¹⁰年",
    explanation: "【計算式】\nlog(1.38×10¹⁰) + 7.5 = 10.14 + 7.5 = 17.64\n\n10¹⁷·⁶⁴ ≈ 4.4×10¹⁷秒\n\n💡 宇宙の年齢 ≈ 10¹⁷·⁵秒 と覚えよう",
    unit: "秒"
  },
  {
    id: 34,
    level: 5,
    category: 'IT',
    title: "ムーアの法則",
    description: "半導体の集積度が18ヶ月で2倍になる。30年後は何倍？",
    targetLog: 6.0,
    tolerance: 0.2,
    hint: "30年 = 360ヶ月、360÷18 = 20回の倍増",
    explanation: "【計算式】\n倍増回数 = 360 ÷ 18 = 20回\n倍率 = 2²⁰ = 10⁶\n\nlog(2²⁰) = 20 × 0.3 = 6.0\n\n💡 30年で100万倍！これがムーアの法則",
    unit: "倍"
  },
  {
    id: 35,
    level: 5,
    category: 'Energy',
    title: "マグニチュード差",
    description: "M8の地震はM6の地震の何倍のエネルギー？（Mが1増えると約32倍）",
    targetLog: 3.0,
    tolerance: 0.1,
    hint: "M差2 = 32² = 1024倍",
    explanation: "【計算式】\nM差 = 8 - 6 = 2\nエネルギー比 = 32² = 1024 ≈ 10³\n\nlog(1024) ≈ 3.0\n\n💡 M8はM6の約1000倍のエネルギー！",
    unit: "倍"
  },

  // ==========================================
  // 速度系の問題
  // ==========================================
  {
    id: 36,
    level: 1,
    category: 'Speed',
    title: "km/hをm/sに変換",
    description: "時速100km/hは秒速何m/s？",
    targetLog: 1.44,
    tolerance: 0.15,
    hint: "100km/h ÷ 3.6 = ?m/s",
    explanation: "【計算式】\n100km/h ÷ 3.6 ≈ 27.8m/s\n\nlog(27.8) ≈ 1.44\n\n💡 km/h → m/s は÷3.6（約−0.56）",
    unit: "m/s"
  },
  {
    id: 37,
    level: 2,
    category: 'Speed',
    title: "新幹線 vs 音速",
    description: "新幹線（300km/h）は音速（340m/s）の何倍？",
    targetLog: -0.61,
    tolerance: 0.15,
    hint: "新幹線 = 83m/s (log≈1.92)、音速 (log≈2.53)",
    explanation: "【計算式】\n新幹線 300km/h = 83m/s\n83 ÷ 340 = 0.24 = 10⁻⁰·⁶¹\n\n💡 新幹線は音速の約1/4",
    unit: "倍"
  },
  {
    id: 38,
    level: 2,
    category: 'Speed',
    title: "ボルトの100m",
    description: "ウサイン・ボルトは100mを9.58秒で走る。平均時速は？",
    targetLog: 1.57,
    tolerance: 0.15,
    hint: "100m ÷ 9.58s = ?m/s、そして×3.6でkm/h",
    explanation: "【計算式】\n100 ÷ 9.58 ≈ 10.4m/s\n10.4 × 3.6 ≈ 37.5km/h\n\nlog(37.5) ≈ 1.57\n\n💡 人類最速は約37km/h",
    unit: "km/h"
  },
  {
    id: 39,
    level: 3,
    category: 'Speed',
    title: "光速と音速の比",
    description: "光速（3×10⁸m/s）は音速（340m/s）の何倍？",
    targetLog: 5.95,
    tolerance: 0.15,
    hint: "光速 (log≈8.48) - 音速 (log≈2.53)",
    explanation: "【計算式】\n8.48 - 2.53 = 5.95\n\n3×10⁸ ÷ 340 ≈ 88万倍\n\n💡 光は音の約100万倍速い",
    unit: "倍"
  },
  {
    id: 40,
    level: 3,
    category: 'Speed',
    title: "ISS何周？",
    description: "ISS（秒速7.7km）は1日で地球を何周する？",
    targetLog: 1.19,
    tolerance: 0.15,
    hint: "1日=86400秒、地球一周=4万km",
    explanation: "【計算式】\n移動距離 = 7.7km/s × 86400s = 665,280km\n周回数 = 665,280 ÷ 40,000 ≈ 16.6周\n\nlog(16.6) ≈ 1.22\n\n💡 ISSは1日に約16周！",
    unit: "周"
  },
  {
    id: 41,
    level: 4,
    category: 'Speed',
    title: "最寄りの恒星まで",
    description: "光速の10%で飛ぶ宇宙船でプロキシマ・ケンタウリ（4.2光年）まで何年？",
    targetLog: 1.62,
    tolerance: 0.15,
    hint: "4.2光年 ÷ 0.1光速 = ?年",
    explanation: "【計算式】\n4.2光年 ÷ 0.1 = 42年\n\nlog(42) ≈ 1.62\n\n💡 光速の10%でも42年かかる...",
    unit: "年"
  },

  // ==========================================
  // 距離系の問題（ミクロ〜宇宙）
  // ==========================================
  {
    id: 42,
    level: 1,
    category: 'Distance',
    title: "原子と原子核",
    description: "原子（10⁻¹⁰m）は原子核（10⁻¹⁵m）の何倍大きい？",
    targetLog: 5.0,
    tolerance: 0.1,
    hint: "-10 - (-15) = ?",
    explanation: "【計算式】\n10⁻¹⁰ ÷ 10⁻¹⁵ = 10⁵\n\n💡 原子は原子核の10万倍大きい！\n中心に野球ボール(原子核)を置くと、電子は東京ドームの端を飛ぶ",
    unit: "倍"
  },
  {
    id: 43,
    level: 2,
    category: 'Distance',
    title: "DNA何個で1cm？",
    description: "DNAの幅（2nm）を並べて1cmにするには何個必要？",
    targetLog: 6.7,
    tolerance: 0.15,
    hint: "1cm = 10⁻²m、DNA = 2×10⁻⁹m",
    explanation: "【計算式】\n10⁻² ÷ (2×10⁻⁹) = 5×10⁶\n\nlog(5×10⁶) = 0.7 + 6 = 6.7\n\n💡 500万本のDNAで1cm",
    unit: "個"
  },
  {
    id: 44,
    level: 2,
    category: 'Distance',
    title: "地球から月まで光で",
    description: "地球-月間（38万km）を光が進む時間は何秒？",
    targetLog: 0.1,
    tolerance: 0.1,
    hint: "距離: log≈8.58、光速: log≈8.48",
    explanation: "【計算式】\n3.8×10⁸m ÷ 3×10⁸m/s = 1.27秒\n\nlog(1.27) ≈ 0.1\n\n💡 月は光で約1.3秒の距離",
    unit: "秒"
  },
  {
    id: 45,
    level: 3,
    category: 'Distance',
    title: "太陽まで光で",
    description: "地球-太陽間（1AU = 1.5億km）を光が進む時間は何秒？",
    targetLog: 2.7,
    tolerance: 0.15,
    hint: "1.5×10¹¹m ÷ 3×10⁸m/s",
    explanation: "【計算式】\n1.5×10¹¹ ÷ 3×10⁸ = 500秒 ≈ 8分20秒\n\nlog(500) ≈ 2.7\n\n💡 太陽からの光は8分前の姿",
    unit: "秒"
  },
  {
    id: 46,
    level: 4,
    category: 'Distance',
    title: "銀河を横断",
    description: "天の川銀河の直径（10万光年）を光で横断するのに何秒？",
    targetLog: 12.5,
    tolerance: 0.2,
    hint: "1年 = 3.15×10⁷秒",
    explanation: "【計算式】\n10⁵年 × 3.15×10⁷秒/年 = 3.15×10¹²秒\n\nlog(3.15×10¹²) ≈ 12.5\n\n💡 銀河横断に10万年、秒にすると10¹²秒超",
    unit: "秒"
  },
  {
    id: 47,
    level: 5,
    category: 'Distance',
    title: "宇宙の大きさ/原子",
    description: "観測可能な宇宙（4.4×10²⁶m）は原子（10⁻¹⁰m）の何倍？",
    targetLog: 36.6,
    tolerance: 0.2,
    hint: "26.6 - (-10) = ?",
    explanation: "【計算式】\nlog(4.4×10²⁶) - log(10⁻¹⁰) = 26.64 - (-10) = 36.64\n\n💡 宇宙は原子の10³⁶倍以上！\nこれがスケールの全体像",
    unit: "倍"
  },

  // ==========================================
  // 時間・歴史系の問題
  // ==========================================
  {
    id: 48,
    level: 1,
    category: 'History',
    title: "人類史 vs 宇宙史",
    description: "宇宙の年齢（138億年）は現生人類誕生（30万年前）の何倍？",
    targetLog: 4.66,
    tolerance: 0.15,
    hint: "1.38×10¹⁰ ÷ 3×10⁵",
    explanation: "【計算式】\nlog(1.38×10¹⁰) - log(3×10⁵) = 10.14 - 5.48 = 4.66\n\n💡 宇宙は人類の約5万倍長い",
    unit: "倍"
  },
  {
    id: 49,
    level: 2,
    category: 'History',
    title: "恐竜時代の長さ",
    description: "恐竜は約1.6億年間繁栄した。これは現生人類（30万年）の何倍？",
    targetLog: 2.73,
    tolerance: 0.15,
    hint: "1.6×10⁸ ÷ 3×10⁵",
    explanation: "【計算式】\nlog(1.6×10⁸) - log(3×10⁵) = 8.2 - 5.48 = 2.72\n\n10²·⁷² ≈ 530倍\n\n💡 恐竜は人類の500倍以上長く繁栄した",
    unit: "倍"
  },
  {
    id: 50,
    level: 2,
    category: 'Time',
    title: "1年は何ミリ秒？",
    description: "1年間は約何ミリ秒？",
    targetLog: 10.5,
    tolerance: 0.15,
    hint: "1年 = 10^7.5秒、ミリ秒は×1000",
    explanation: "【計算式】\n1年 ≈ 3.15×10⁷秒 = 3.15×10¹⁰ミリ秒\n\nlog(3.15×10¹⁰) = 10.5\n\n💡 1年 ≈ 300億ミリ秒",
    unit: "ミリ秒"
  },
  {
    id: 51,
    level: 3,
    category: 'History',
    title: "農耕以前の人類",
    description: "現生人類誕生（30万年前）から農耕開始（1万年前）まで、人類史の何%？",
    targetLog: 1.99,
    tolerance: 0.1,
    hint: "(30万-1万) ÷ 30万 × 100",
    explanation: "【計算式】\n(3×10⁵ - 10⁴) ÷ 3×10⁵ × 100 ≈ 96.7%\n\nlog(96.7) ≈ 1.99\n\n💡 人類史の97%は狩猟採集時代！",
    unit: "%"
  },
  {
    id: 52,
    level: 4,
    category: 'History',
    title: "文明5000年を1日に圧縮",
    description: "5000年の文明史を24時間に圧縮。産業革命（250年前）は何時何分から？",
    targetLog: 2.83,
    tolerance: 0.2,
    hint: "250年 ÷ 5000年 × 24時間 = 経過時間（時間）",
    explanation: "【計算式】\n産業革命の開始 = 24 - (250/5000 × 24) = 24 - 1.2 = 22.8時間後\n= 22時48分\n\n💡 文明5000年を1日とすると、産業革命は23時前から！\n\n実際の問いはlog(分換算):\n1.2時間 = 72分前 → 現在から72分前開始\nlog(72) ≈ 1.86",
    unit: "時間後から開始"
  },
  {
    id: 53,
    level: 3,
    category: 'Time',
    title: "心臓の鼓動",
    description: "人の心臓は1分間に60回鼓動する。一生（80年）で何回鼓動する？",
    targetLog: 9.4,
    tolerance: 0.15,
    hint: "60回/分 × 60分 × 24時間 × 365日 × 80年",
    explanation: "【計算式】\n60 × 60 × 24 × 365 × 80 = 2.52×10⁹回\n\nlog(2.52×10⁹) ≈ 9.4\n\n💡 一生で約25億回！",
    unit: "回"
  },

  // ==========================================
  // 単位変換・物理の問題
  // ==========================================
  {
    id: 54,
    level: 2,
    category: 'Energy',
    title: "1kWh = ?J",
    description: "1kWhは何ジュールか？",
    targetLog: 6.56,
    tolerance: 0.1,
    hint: "1kWh = 1000W × 3600秒",
    explanation: "【計算式】\n1kWh = 1000W × 3600s = 3,600,000J = 3.6MJ\n\nlog(3.6×10⁶) = 6.56\n\n💡 Wh = W × h = W × 3600s\n電力(W) × 時間(s) = エネルギー(J)",
    unit: "J"
  },
  {
    id: 55,
    level: 3,
    category: 'Energy',
    title: "電気ポットの電気代",
    description: "1000Wの電気ポットで3分お湯を沸かす。使用エネルギーは何J？",
    targetLog: 5.26,
    tolerance: 0.15,
    hint: "1000W × 180秒 = ?J",
    explanation: "【計算式】\n1000W × 180s = 180,000J = 180kJ\n\nlog(180,000) ≈ 5.26\n\n💡 W(J/s) × s = J（ワット秒がジュール）",
    unit: "J"
  },
  {
    id: 56,
    level: 2,
    category: 'Power',
    title: "電力から電力量",
    description: "100Wの電球を10時間つけると何Wh？",
    targetLog: 3.0,
    tolerance: 0.1,
    hint: "100W × 10h = ?Wh",
    explanation: "【計算式】\n100W × 10h = 1000Wh = 1kWh\n\nlog(1000) = 3.0\n\n💡 電力(W) × 時間(h) = 電力量(Wh)",
    unit: "Wh"
  },
  {
    id: 57,
    level: 3,
    category: 'Speed',
    title: "徒歩で地球一周",
    description: "時速5kmで休まず歩くと、地球一周（4万km）に何日かかる？",
    targetLog: 2.52,
    tolerance: 0.15,
    hint: "4万km ÷ 5km/h = ?時間、÷24で日数",
    explanation: "【計算式】\n40,000 ÷ 5 = 8,000時間\n8,000 ÷ 24 ≈ 333日\n\nlog(333) ≈ 2.52\n\n💡 休まず歩いても約1年！",
    unit: "日"
  },
  {
    id: 58,
    level: 4,
    category: 'Physics',
    title: "原子炉の熱効率",
    description: "原発1基（熱出力3GW、電気出力1GW）の熱効率は？",
    targetLog: 1.52,
    tolerance: 0.1,
    hint: "効率 = 電気出力 ÷ 熱出力 × 100%",
    explanation: "【計算式】\n1GW ÷ 3GW × 100 = 33.3%\n\nlog(33.3) ≈ 1.52\n\n💡 原子力の熱効率は約33%（火力は40-60%）",
    unit: "%"
  },
  {
    id: 59,
    level: 5,
    category: 'Energy',
    title: "太陽から地球へのエネルギー",
    description: "太陽の放射エネルギー（3.8×10²⁶W）のうち、地球（断面積1.3×10¹⁴m²）が受け取る割合は？（4πr²で拡散、r=1AU）",
    targetLog: -8.8,
    tolerance: 0.25,
    hint: "地球断面積 ÷ (4π × (1AU)²)",
    explanation: "【計算式】\n球面積 = 4π × (1.5×10¹¹)² ≈ 2.8×10²³m²\n割合 = 1.3×10¹⁴ ÷ 2.8×10²³ ≈ 4.6×10⁻¹⁰\n\nlog(4.6×10⁻¹⁰) ≈ -9.3\n\n💡 太陽エネルギーの10億分の1以下しか受け取っていない",
    unit: "(比率)"
  },
  {
    id: 60,
    level: 3,
    category: 'IT',
    title: "光ファイバーの遅延",
    description: "東京-ロサンゼルス間（9000km）の光ファイバー通信の遅延は約何ミリ秒？（光速の2/3で伝搬）",
    targetLog: 1.63,
    tolerance: 0.15,
    hint: "9×10⁶m ÷ (2×10⁸m/s) × 1000ms",
    explanation: "【計算式】\n9×10⁶m ÷ (3×10⁸ × 2/3)m/s = 9×10⁶ ÷ 2×10⁸ = 0.045秒 = 45ms\n\nlog(45) ≈ 1.65\n\n💡 太平洋横断で約45ms（往復90ms）の遅延",
    unit: "ms"
  },
  
  // ==========================================
  // 確率問題（eの世界）
  // ==========================================
  {
    id: 61,
    level: 2,
    category: 'Probability',
    title: "1%ガチャを50%で当てる",
    description: "確率1%のガチャを50%の確率で少なくとも1回当てるには、何回引く必要がある？",
    targetLog: 1.84,
    tolerance: 0.15,
    hint: "ln(2)/p ≈ 0.69/0.01、ln(2)≈0.69",
    explanation: "【計算式】\n確率pのガチャをn回引いて「少なくとも1回当たる」確率 = 1-(1-p)ⁿ\n\n50%になる条件: (1-p)ⁿ = 0.5\nn = ln(0.5)/ln(1-p) ≈ ln(2)/p = 0.69/0.01 = 69回\n\nlog(69) ≈ 1.84\n\n💡 覚え方: 「確率pなら0.7/p回で50%」",
    unit: "回"
  },
  {
    id: 62,
    level: 2,
    category: 'Probability',
    title: "1%ガチャを63%で当てる",
    description: "確率1%のガチャを約63%の確率で少なくとも1回当てるには、何回引く必要がある？",
    targetLog: 2.00,
    tolerance: 0.1,
    hint: "63% ≈ 1-1/e、回数は1/pに等しい",
    explanation: "【計算式】\n確率pのガチャをn=1/p回引くと、当たらない確率は:\n(1-p)^(1/p) → e^(-1) ≈ 0.37（pが小さい時）\n\nよって「少なくとも1回当たる」確率 ≈ 1-1/e ≈ 63%\n\n1/0.01 = 100回 → log(100) = 2.00\n\n💡 覚え方: 「1/p回で約63%」これがeの本質！",
    unit: "回"
  },
  {
    id: 63,
    level: 2,
    category: 'Probability',
    title: "0.1%ガチャを50%で当てる",
    description: "確率0.1%のSSRガチャを50%の確率で当てるには、何回引く必要がある？",
    targetLog: 2.84,
    tolerance: 0.15,
    hint: "ln(2)/p = 0.69/0.001",
    explanation: "【計算式】\nn = ln(2)/p = 0.69/0.001 = 690回\n\nlog(690) ≈ 2.84\n\n💡 0.1%なら693回で50%、約700回が目安",
    unit: "回"
  },
  {
    id: 64,
    level: 3,
    category: 'Probability',
    title: "1%ガチャを95%で当てる",
    description: "確率1%のガチャを95%の確率で少なくとも1回当てるには、何回引く必要がある？",
    targetLog: 2.48,
    tolerance: 0.15,
    hint: "ln(20)/p ≈ 3/0.01、95%達成には50%の約4.3倍",
    explanation: "【計算式】\n95%の条件: (1-p)ⁿ = 0.05\nn = ln(0.05)/ln(0.99) ≈ ln(20)/0.01 ≈ 3/0.01 = 300回\n\nlog(300) ≈ 2.48\n\n💡 ln(20) ≈ 3、95%は50%の約4.3倍の試行が必要",
    unit: "回"
  },
  {
    id: 65,
    level: 2,
    category: 'Probability',
    title: "誕生日問題：50%達成",
    description: "クラスに何人いれば、同じ誕生日のペアが50%以上の確率で存在する？",
    targetLog: 1.36,
    tolerance: 0.1,
    hint: "約√365×1.2 ≈ 23人、√365≈19",
    explanation: "【計算式】\n誕生日問題の近似公式: n ≈ √(2×365×ln(2)) ≈ √(506) ≈ 22.5\n\n正確には23人で約50.7%\nlog(23) ≈ 1.36\n\n💡 目安は「√日数」の1.2倍程度。365日なら√365≈19、×1.2で約23人",
    unit: "人"
  },
  {
    id: 66,
    level: 3,
    category: 'Probability',
    title: "誕生日問題：97%達成",
    description: "クラスに何人いれば、同じ誕生日のペアがほぼ確実（97%以上）に存在する？",
    targetLog: 1.70,
    tolerance: 0.1,
    hint: "50人で約97%",
    explanation: "【計算式】\n50人いると、全員の誕生日が異なる確率は:\n365/365 × 364/365 × ... × 316/365 ≈ 3%\n\nよって同じ誕生日のペアが存在する確率 ≈ 97%\nlog(50) ≈ 1.70\n\n💡 50人のクラスならほぼ確実に誕生日かぶりあり！",
    unit: "人"
  },
  {
    id: 67,
    level: 3,
    category: 'Probability',
    title: "ハッシュ衝突確率",
    description: "100万個のランダムID（32bit空間）を生成したとき、衝突確率が50%になるID数は約何個？（誕生日問題の応用）",
    targetLog: 4.86,
    tolerance: 0.2,
    hint: "√(2³² × ln(2)) ≈ √(3×10⁹) ≈ 77000",
    explanation: "【計算式】\n誕生日問題の公式: n ≈ √(2N×ln(2)) ≈ 1.2×√N\n\n32bit空間: N = 2³² ≈ 4×10⁹\nn ≈ 1.2×√(4×10⁹) ≈ 1.2×63000 ≈ 77000\n\nlog(77000) ≈ 4.89\n\n💡 32bitハッシュは約7.7万件で50%衝突リスク！",
    unit: "個"
  },
  {
    id: 68,
    level: 2,
    category: 'Probability',
    title: "ln(10)の値",
    description: "自然対数 ln(10) の値は約いくつ？（logからlnへの変換に使う）",
    targetLog: 0.36,
    tolerance: 0.1,
    hint: "ln(10) = 1/log₁₀(e) ≈ 1/0.43",
    explanation: "【計算式】\nln(10) = 1/log₁₀(e) = 1/0.4343 ≈ 2.303\n\nlog(2.303) ≈ 0.36\n\n💡 log₁₀(x) → ln(x) は ×2.3\n💡 ln(x) → log₁₀(x) は ×0.43 (= log₁₀(e))",
    unit: ""
  },
  {
    id: 69,
    level: 3,
    category: 'Probability',
    title: "複利計算：元本2倍",
    description: "年利5%の複利で元本を2倍にするには何年かかる？",
    targetLog: 1.15,
    tolerance: 0.15,
    hint: "ln(2)/r = 0.69/0.05 ≈ 14年（72の法則）",
    explanation: "【計算式】\n複利で2倍: (1+r)ⁿ = 2\nn = ln(2)/ln(1+r) ≈ ln(2)/r = 0.69/0.05 = 13.8年\n\nlog(14) ≈ 1.15\n\n💡 72の法則: 72÷年利(%)=2倍になる年数\n   72÷5=14.4年、ほぼ一致！",
    unit: "年"
  },
  {
    id: 70,
    level: 4,
    category: 'Probability',
    title: "20人クラスの誕生日問題",
    description: "20人のクラスで同じ誕生日のペアがいる確率は約何%？",
    targetLog: 1.62,
    tolerance: 0.15,
    hint: "1 - (365!/345!)/(365^20)、約41%",
    explanation: "【計算式】\n全員異なる確率 = 365/365 × 364/365 × ... × 346/365\n≈ e^(-n(n-1)/2/365) ≈ e^(-190/365) ≈ e^(-0.52) ≈ 0.59\n\n同じ誕生日ペアがいる確率 ≈ 1 - 0.59 = 0.41 = 41%\n\nlog(41) ≈ 1.61\n\n💡 20人でも約4割の確率！意外と高い",
    unit: "%"
  },
  {
    id: 71,
    level: 3,
    category: 'Probability',
    title: "ポアソン分布：期待値10で0回",
    description: "平均10回起きる事象が1回も起きない確率は約何%？（10^-何%で答える）",
    targetLog: -3.34,
    tolerance: 0.2,
    hint: "e^(-10) ≈ 10^(-4.3)、log₁₀(e)≈0.43",
    explanation: "【計算式】\nポアソン分布: P(0) = e^(-λ) = e^(-10)\n\nlog₁₀(e^(-10)) = -10 × log₁₀(e) = -10 × 0.43 = -4.3\n\n確率 ≈ 10^(-4.3) ≈ 0.00005 ≈ 0.005%\n\n💡 10^(-4.3)% → 実質ありえない事象！",
    unit: "(log₁₀確率)"
  },
  {
    id: 72,
    level: 2,
    category: 'Probability',
    title: "log(1+x)の近似",
    description: "x=0.1のとき、log₁₀(1+x)は約いくつ？（|x|<<1での近似を使う）",
    targetLog: -1.36,
    tolerance: 0.15,
    hint: "log₁₀(1+x) ≈ x × log₁₀(e) ≈ 0.43x",
    explanation: "【計算式】\n|x|<<1 のとき ln(1+x) ≈ x\nよって log₁₀(1+x) ≈ x × log₁₀(e) ≈ 0.43x\n\nx=0.1 → log₁₀(1.1) ≈ 0.43 × 0.1 = 0.043\n\nlog(0.043) ≈ -1.37\n\n（正確値: log₁₀(1.1) = 0.0414）\n\n💡 「1+x のlog ≈ 0.4x」で概算できる！",
    unit: ""
  },
];

// レベル定義
export const LEVELS = [
  { id: 1, name: '初級', description: '基本的なLog感覚を養う', color: 'green', emoji: '🌱' },
  { id: 2, name: '中級', description: 'フェルミ推定に挑戦', color: 'blue', emoji: '📘' },
  { id: 3, name: '上級', description: '複合的な計算をLog算で', color: 'purple', emoji: '🎓' },
  { id: 4, name: '超上級', description: '現実世界の大規模問題', color: 'orange', emoji: '🔥' },
  { id: 5, name: '神', description: '宇宙規模・総合応用', color: 'red', emoji: '👑' },
];

// 問題カテゴリ定義
export const PROBLEM_CATEGORIES = [
  { id: 'all', name: 'すべて', icon: '📋' },
  { id: 'IT', name: 'IT・データ', icon: '💻' },
  { id: 'Energy', name: 'エネルギー', icon: '⚡' },
  { id: 'Power', name: '電力', icon: '🔌' },
  { id: 'Area', name: '面積', icon: '📐' },
  { id: 'Time', name: '時間', icon: '⏰' },
  { id: 'Speed', name: '速度', icon: '🚀' },
  { id: 'Distance', name: '距離', icon: '📏' },
  { id: 'History', name: '歴史', icon: '📜' },
  { id: 'Physics', name: '物理', icon: '🔬' },
  { id: 'Daily', name: '日常', icon: '🏠' },
  { id: 'Probability', name: '確率', icon: '🎲' },
];

