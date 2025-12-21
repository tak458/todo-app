# todo-app

ブラウザのみで完結する Todo アプリ

GitHub IO : https://tak458.github.io/todo-app/

Storybook : https://tak458.github.io/todo-app/storybook/

## Require

- node.js 24

## 開発

gitignore しているファイルの削除

```powershell
Get-Process turbo | Stop-Process -Force
dir -r -Filter ".next"|%{rm -r -Force $_}
dir -r -Filter "node_modules"|%{rm -r -Force $_}
dir -r -Filter ".turbo"|%{rm -r -Force $_}
dir -r -Filter "coverage"|%{rm -r -Force $_}
dir -r -Filter "*.tsbuildinfo"|%{rm -r -Force $_}
dir -r -Filter "out"|%{rm -r -Force $_}
dir -r -Filter "dist"|%{rm -r -Force $_}
dir -r -Filter "reports"|%{rm -r -Force $_}
rm -r -Force "package-lock.json"
```
