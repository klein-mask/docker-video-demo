# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Docker学習用のデモプロジェクト。各チャプターで段階的にDockerの概念を学習する構成。

## よく使うコマンド

### Chapter 1 - 基本的なDockerコンテナ

```bash
# 開発環境の起動
cd chapter-1
npm run dev

# Dockerイメージのビルド
docker build -t chapter1-app .

# Dockerコンテナの実行
docker run -p 3000:3000 chapter1-app
```

### Chapter 2 - Docker Compose環境

```bash
# 開発環境の起動
cd chapter-2
npm run dev

# Docker Compose環境の起動
docker-compose up -d

# ログの確認
docker-compose logs -f

# 環境の停止
docker-compose down

# データも含めて完全にクリーンアップ
docker-compose down -v
```

## アーキテクチャ

### Chapter 1
- シンプルなExpress + TypeScriptアプリケーション
- 単一のDockerコンテナで動作
- ポート3000でAPIを提供

### Chapter 2
- **マルチサービスアーキテクチャ**:
  - `api`: Express + TypeScript + Mongoose (ポート3000)
  - `mongo`: MongoDB データベース (内部ポート27017)
  - `mongo-express`: MongoDB管理UI (ポート8081)
- **ネットワーク**: `app-network`カスタムブリッジネットワークで通信
- **データ永続化**: `mongo-data`ボリューム使用
- **MongoDB初期化**: 起動時に自動でダミーユーザー作成

## 重要な実装詳細

### MongoDB接続
- Chapter 2のAPIサービスは`mongodb://mongo:27017/testdb`に接続
- 接続エラー時は5秒間隔で再試行
- 初回接続時にダミーユーザーを自動生成

### TypeScript設定
- Chapter 1: 厳密モード（全strict設定有効）
- Chapter 2: 実用的設定（allowJs: true、sourceMap有効）

### エンドポイント
- `/`: ヘルスチェック
- `/users`: ユーザー一覧取得（Chapter 2のみ）