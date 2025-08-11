# Docker Video Demo

Dockerの基礎から実践までを段階的に学習するためのデモプロジェクトです。

## 📚 プロジェクト構成

### Chapter 1: Docker基礎
シンプルなExpress.jsアプリケーションをDockerコンテナ化する基本的な例

**学習内容:**
- Dockerfileの作成
- イメージのビルド
- コンテナの実行
- ポートマッピング

### Chapter 2: Docker Compose
複数のサービスを連携させたマイクロサービスアーキテクチャの構築

**学習内容:**
- Docker Composeによる複数サービスの管理
- サービス間通信
- データベース連携（MongoDB）
- 管理UIの統合（Mongo Express）
- ボリュームによるデータ永続化

## 🚀 クイックスタート

### Chapter 1を試す

```bash
cd chapter-1

# 開発環境で実行
npm install
npm run dev

# Dockerで実行
docker build -t chapter1-app .
docker run -p 3000:3000 chapter1-app

# 動作確認
curl http://localhost:3000
```

### Chapter 2を試す

```bash
cd chapter-2

# Docker Composeで全サービスを起動
docker-compose up -d

# 動作確認
curl http://localhost:3000        # APIエンドポイント
curl http://localhost:3000/users  # ユーザー一覧

# MongoDB管理画面
open http://localhost:8081

# ログを確認
docker-compose logs -f

# 停止
docker-compose down
```

## 🛠 技術スタック

- **Node.js 18**: JavaScriptランタイム
- **TypeScript**: 型安全な開発
- **Express.js**: Webフレームワーク
- **MongoDB**: NoSQLデータベース
- **Mongoose**: MongoDB ODM
- **Docker**: コンテナ化
- **Docker Compose**: マルチコンテナ管理

## 📋 必要な環境

- Docker Desktop（Docker Engine 20.10以降）
- Node.js 18以降（ローカル開発時）
- npm または yarn

## 📖 各チャプターの詳細

### Chapter 1 - 基本構成

```
chapter-1/
├── Dockerfile          # シングルステージビルド
├── package.json        # 依存関係定義
├── tsconfig.json       # TypeScript設定（厳密モード）
└── src/
    └── index.ts        # Expressサーバー
```

**エンドポイント:**
- `GET /`: ヘルスチェック

### Chapter 2 - マルチサービス構成

```
chapter-2/
├── Dockerfile          # APIサービス用
├── docker-compose.yml  # サービス定義
├── package.json        # MongoDB依存関係を追加
├── tsconfig.json       # TypeScript設定
└── src/
    └── index.ts        # MongoDB連携サーバー
```

**サービス構成:**
- `api`: メインAPIサーバー（ポート3000）
- `mongo`: MongoDBデータベース
- `mongo-express`: DB管理UI（ポート8081）

**エンドポイント:**
- `GET /`: ヘルスチェック
- `GET /users`: ユーザー一覧取得

## 🔧 開発のヒント

### ビルドの最適化
- マルチステージビルドの活用
- レイヤーキャッシュの効率的な利用
- 不要なファイルの除外（.dockerignore）

### デバッグ
```bash
# コンテナ内部へのアクセス
docker exec -it <container-id> sh

# ログの確認
docker logs <container-id>
docker-compose logs <service-name>
```

### クリーンアップ
```bash
# 未使用のイメージを削除
docker image prune

# システム全体のクリーンアップ
docker system prune -a

# Docker Composeの完全クリーンアップ
docker-compose down -v
```

## 📝 ライセンス

MIT