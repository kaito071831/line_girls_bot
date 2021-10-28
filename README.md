# line_girls_bot
---
## 概要
### LINEでメッセージを送ると彼女っぽく返事を返してくれるBot。

## 経緯
### 講義中にQiitaの記事を読み漁ってた時に参考記事を偶然発見した結果、魔が差して作ってしまいました。

## 参考記事
### 疑似彼氏、作りました。(https://qiita.com/mnana/items/3836aee1b749670804dc)

## 更新履歴
| 更新日付 | 更新内容 |
| ---- | ---- |
|2021-10-28|参考記事を元に疑似彼女Botを作成してリポジトリにpushした|

## 環境
- Node.js 16.13.0
- ngrok 2.3.40

## 使用方法
1. [LINE Developers](https://developers.line.biz/)で新規チャネルを作成
2. bot_main.jsのconfigオブジェクトにあるchannelSecretにチャネルシークレットを、channelAccessTokenにはチャネルアクセストークンを設定する
3. WebhooksURLの設定する。ローカルでサーバーを用意する場合はコマンドラインに以下のように入力する。
```
ngrok http 3000
```
4. ngrokの画面からForwardingの項目のhttpsから始まるURLをチャネルのWebhookのURL欄に貼り付ける。
5. 以下のコマンドでローカルサーバーを立ち上げる
```
node bot_main.js
```