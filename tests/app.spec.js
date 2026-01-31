import { test, expect } from '@playwright/test';

// ナビゲーションボタンを取得するヘルパー
const getNavButton = (page, name) => {
  return page.locator('nav').getByRole('button', { name: new RegExp(name, 'i') });
};

// 画面遷移を待つヘルパー
const navigateTo = async (page, tabName) => {
  await getNavButton(page, tabName).click();
  await page.waitForTimeout(300);
};

test.describe('ナビゲーション', () => {
  test('トップページが正しく表示される', async ({ page }) => {
    await page.goto('/');
    
    // タイトルが表示される
    await expect(page.locator('h1')).toContainText('Logarithmetic');
    
    // ナビゲーションリンクが存在する
    await expect(getNavButton(page, 'ホーム')).toBeVisible();
    await expect(getNavButton(page, '学習')).toBeVisible();
    await expect(getNavButton(page, '実戦')).toBeVisible();
    await expect(getNavButton(page, '定数表')).toBeVisible();
  });

  test('各ページに遷移できる', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 学習モードに遷移
    await navigateTo(page, '学習');
    // 学習モードでは章選択画面が表示される
    await expect(page.getByText('段階的に学ぼう')).toBeVisible();
    
    // 実戦モードに遷移
    await navigateTo(page, '実戦');
    // 実戦モードではモード選択が表示される
    await expect(page.getByRole('heading', { name: '通常モード' })).toBeVisible();
    
    // 定数表に遷移
    await navigateTo(page, '定数表');
    await expect(page.getByText('定数表（Cheat Sheet）')).toBeVisible();
    
    // ホームに戻る
    await navigateTo(page, 'ホーム');
    await expect(page.getByText('問題クリア')).toBeVisible();
  });
});

test.describe('学習モード', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await navigateTo(page, '学習');
  });

  test('章の一覧が表示される', async ({ page }) => {
    // 章のボタンが表示される（.first()で最初の要素を取得）
    await expect(page.getByRole('button', { name: /Log算の基礎/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /時間の感覚/ }).first()).toBeVisible();
  });

  test('章を選択するとスライドが表示される', async ({ page }) => {
    // Log算の基礎を選択（exact matchを使用）
    await page.getByRole('button', { name: 'Log算の基礎 9 スライド', exact: true }).click();
    await page.waitForTimeout(300);
    
    // スライドが表示される
    await expect(page.getByText('Log算へようこそ！')).toBeVisible();
    
    // 次へボタンがある
    await expect(page.getByRole('button', { name: /次へ/i })).toBeVisible();
  });

  test('スライドを進める・戻れる', async ({ page }) => {
    await page.getByRole('button', { name: 'Log算の基礎 9 スライド', exact: true }).click();
    await page.waitForTimeout(300);
    
    // 次へボタンをクリック
    await page.getByRole('button', { name: /次へ/i }).click();
    await page.waitForTimeout(200);
    
    // 2枚目のスライドが表示される
    await expect(page.getByText('掛け算 → 足し算')).toBeVisible();
    
    // 戻るボタンをクリック
    await page.getByRole('button', { name: /前へ/i }).click();
    await page.waitForTimeout(200);
    
    // 1枚目に戻る
    await expect(page.getByText('Log算へようこそ！')).toBeVisible();
  });
});

test.describe('実戦モード', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await navigateTo(page, '実戦');
  });

  test('モード選択が表示される', async ({ page }) => {
    // 通常モードとサバイバルモードが表示される
    await expect(page.getByRole('heading', { name: '通常モード' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'サバイバルモード' })).toBeVisible();
  });

  test('通常モードで問題一覧が表示される', async ({ page }) => {
    // 通常モードを選択
    await page.getByRole('heading', { name: '通常モード' }).click();
    await page.waitForTimeout(500);
    
    // おすすめ問題セクションが表示される
    await expect(page.getByText('おすすめ問題')).toBeVisible();
    
    // 問題一覧が表示される
    await expect(page.getByText('問題一覧')).toBeVisible();
  });

  test('問題を解答できる', async ({ page }) => {
    await page.getByRole('heading', { name: '通常モード' }).click();
    await page.waitForTimeout(500);
    
    // 最初の問題を選択
    await page.locator('button:has-text("Lv.")').first().click();
    await page.waitForTimeout(300);
    
    // 回答フォームが表示される
    await expect(page.getByPlaceholder(/例.*3\.5/i)).toBeVisible();
    
    // 回答を入力
    await page.getByPlaceholder(/例.*3\.5/i).fill('3.5');
    await page.getByRole('button', { name: '回答' }).click();
    
    // フィードバックが表示される（正解または不正解）
    await expect(page.getByText(/正解|惜しい/)).toBeVisible();
  });

  test('ヒントを表示できる', async ({ page }) => {
    await page.getByRole('heading', { name: '通常モード' }).click();
    await page.waitForTimeout(500);
    await page.locator('button:has-text("Lv.")').first().click();
    await page.waitForTimeout(300);
    
    // ヒントボタンをクリック
    await page.getByText('ヒントを見る').click();
    
    // ヒントが表示される（黄色い背景のエリア）
    await expect(page.locator('.border-yellow-500')).toBeVisible();
  });
});

test.describe('サバイバルモード', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await navigateTo(page, '実戦');
    await page.getByRole('heading', { name: 'サバイバルモード' }).click();
  });

  test('サバイバルモードのメニューが表示される', async ({ page }) => {
    // 難易度選択が表示される
    await expect(page.getByText('難易度選択')).toBeVisible();
    await expect(page.getByText('イージー')).toBeVisible();
    await expect(page.getByText('ノーマル')).toBeVisible();
    await expect(page.getByText('ハード')).toBeVisible();
    
    // スタートボタンが表示される
    await expect(page.getByText('ゲームスタート')).toBeVisible();
  });

  test('ゲームを開始できる', async ({ page }) => {
    // ゲームスタート
    await page.getByText('ゲームスタート').click();
    await page.waitForTimeout(500);
    
    // 残機が表示される
    await expect(page.getByText('残機')).toBeVisible();
    
    // スコアが表示される
    await expect(page.getByText('スコア')).toBeVisible();
    
    // 問題が表示される
    await expect(page.getByPlaceholder(/Log値を入力/i)).toBeVisible();
  });
});

test.describe('定数表', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await navigateTo(page, '定数表');
  });

  test('定数表が表示される', async ({ page }) => {
    // タイトルが表示される
    await expect(page.getByText('定数表（Cheat Sheet）')).toBeVisible();
    
    // カテゴリフィルターが表示される
    await expect(page.getByRole('button', { name: /すべて/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /🔢 数学/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /⏰ 時間/ })).toBeVisible();
  });

  test('検索機能が動作する', async ({ page }) => {
    // 検索ボックスに入力
    await page.getByPlaceholder(/定数を検索/i).fill('光速');
    await page.waitForTimeout(500);
    
    // 光速の定数が表示される
    await expect(page.getByText('光速 (3×10⁸m/s)')).toBeVisible();
  });

  test('カテゴリフィルターが動作する', async ({ page }) => {
    // 時間カテゴリを選択
    await page.getByRole('button', { name: /⏰ 時間/ }).click();
    await page.waitForTimeout(300);
    
    // 時間関連の定数が表示される
    await expect(page.getByText('1日 (86400秒)')).toBeVisible();
  });

  test('色分け凡例が表示される', async ({ page }) => {
    // 色分け凡例が表示される
    await expect(page.getByText('Log値の色分け')).toBeVisible();
    await expect(page.getByText(/切り捨て/)).toBeVisible();
    await expect(page.getByText(/切り上げ/)).toBeVisible();
  });

  test('x→log(x)変換表が正しく表示される', async ({ page }) => {
    // x→log(x)タブをクリック
    await page.getByRole('button', { name: 'x → log(x)' }).click();
    await page.waitForTimeout(300);
    
    // 対数変換マップのタイトルが表示される
    await expect(page.getByText('9×10 対数変換マップ')).toBeVisible();
    
    // テーブルのヘッダーが表示される
    await expect(page.getByRole('columnheader', { name: 'n \\ .x' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: '.0' })).toBeVisible();
    
    // 実際のlog値が表示される（例: log(2) = 0.30）
    await expect(page.getByRole('cell', { name: '0.30' }).first()).toBeVisible();
    
    // 使い方の説明が表示される
    await expect(page.getByText('log(3.7)')).toBeVisible();
  });

  test('log→10^log変換表が正しく表示される', async ({ page }) => {
    // log→10^logタブをクリック
    await page.getByRole('button', { name: 'log → 10^log' }).click();
    await page.waitForTimeout(300);
    
    // 逆変換マップのタイトルが表示される
    await expect(page.getByText('逆変換マップ')).toBeVisible();
    
    // テーブルが表示される
    await expect(page.getByRole('columnheader', { name: '.00' })).toBeVisible();
    
    // 実際の10^x値が表示される（例: 10^0 = 1.00）
    await expect(page.getByRole('cell', { name: '1.00' }).first()).toBeVisible();
    
    // 使い方の説明が表示される
    await expect(page.getByText('10^0.13', { exact: true })).toBeVisible();
  });

  test('確率・eカテゴリの定数が表示される', async ({ page }) => {
    // 確率カテゴリを選択
    await page.getByRole('button', { name: /🎲 確率/ }).click();
    await page.waitForTimeout(300);
    
    // 確率関連の定数が表示される
    await expect(page.getByText('e (自然対数の底)')).toBeVisible();
    await expect(page.getByRole('heading', { name: /ln\(10\)/ })).toBeVisible();
  });
});

test.describe('学習モード - 確率の章', () => {
  test('確率とeの章が選択できる', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await navigateTo(page, '学習');
    
    // 確率とeの章が表示される
    await expect(page.getByRole('button', { name: /確率とe/ })).toBeVisible();
    
    // 章を選択
    await page.getByRole('button', { name: /確率とe/ }).click();
    await page.waitForTimeout(300);
    
    // 最初のスライドが表示される
    await expect(page.getByText('確率計算の秘密兵器「e」')).toBeVisible();
    
    // 重要な数値（0.43と2.3）が表示される
    await expect(page.getByText('0.43', { exact: true })).toBeVisible();
    await expect(page.getByText('2.3', { exact: true })).toBeVisible();
  });

  test('確率の章のスライドを進められる', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await navigateTo(page, '学習');
    
    await page.getByRole('button', { name: /確率とe/ }).click();
    await page.waitForTimeout(300);
    
    // 次へボタンをクリック
    await page.getByRole('button', { name: /次へ/i }).click();
    await page.waitForTimeout(200);
    
    // 2枚目のスライド（ガチャ確率）が表示される
    await expect(page.getByText('ガチャ確率の計算')).toBeVisible();
  });
});

test.describe('進捗管理', () => {
  test('問題を解くと進捗が保存される', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 問題を解く
    await navigateTo(page, '実戦');
    await page.getByRole('heading', { name: '通常モード' }).click();
    await page.waitForTimeout(500);
    await page.locator('button:has-text("Lv.")').first().click();
    await page.waitForTimeout(300);
    
    // 適当な回答
    await page.getByPlaceholder(/例.*3\.5/i).fill('2.0');
    await page.getByRole('button', { name: '回答' }).click();
    
    // ダッシュボードに戻る
    await navigateTo(page, 'ホーム');
    
    // 進捗が表示されている
    await expect(page.getByText(/クリア問題/)).toBeVisible();
  });
});
