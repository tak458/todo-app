# todo-app

ブラウザのみで完結する Todo アプリ

GitHub IO : https://tak458.github.io/todo-app/

Storybook : https://tak458.github.io/todo-app/storybook/

## Project setup

```shell
npm ci
```

### Compiles and hot-reloads for development

```shell
npm run dev
```

### Compiles and minifies for production

```shell
npm run build
```

### Build Storybook

```shell
npm run build-storybook
```

### Run your tests

```shell
npm run test
```

### Lints and fixes files

```shell
npm run lint
```

## MarkdownEditor の構文ハイライト

MarkdownEditor は Shiki `4.4.3` を使って入力中の Markdown をハイライトします。

- 対応言語: Markdown（Shiki の `markdown` grammar）
- テーマ: `github-light`
- 実装: Shiki の fine-grained bundle。Markdown grammar と `github-light` theme だけを読み込みます
- 動作: ハイライトは非同期で実行し、完了まで入力内容をプレーン表示します
- テーマ切り替え: 現在はライトテーマ固定です。ダークテーマ対応は別の変更が必要です

### バンドルと入力応答の計測

移行前後の production export を同じ条件で比較しました。JavaScript chunks は `apps/web/out/_next/static/chunks` 配下の `.js` ファイルを合計し、gzip 値は各ファイルを gzip 圧縮して合計しています。入力応答は headless Chromium でタスク追加ダイアログを開き、同じ Markdown を5回入力して、入力開始からハイライト結果が表示されるまでを測定しました。

| 指標 | Prism.js（移行前） | Shiki fine-grained（移行後） |
| --- | ---: | ---: |
| JavaScript chunks | 1,454,567 bytes | 1,665,043 bytes |
| gzip 済み chunks | 424,676 bytes | 478,100 bytes |
| 入力からハイライトまでの中央値 | 15.8 ms | 13.5 ms |
| 初回の入力からハイライトまで | 38.4 ms | 67.8 ms |

Shiki は初回に highlighter の初期化時間が加わります。2回目以降の入力は Prism.js と同程度です。fine-grained bundle により、全言語・全テーマを含む構成の 7,521,700 bytes から必要な Markdown grammar と `github-light` theme だけの構成へ縮小しました。
