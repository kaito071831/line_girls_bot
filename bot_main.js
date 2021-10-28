'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');

const PORT = process.env.PORT || 3000;

const config = {
  channelSecret: 'xxxx',
  channelAccessToken: 'xxxx'
};

const replyFunction = async(event) => {
  const userText = event.message.text;
  let replyText = '';

  if(userText == '天気は？'){
    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'ちょっと待ってね'
    });

    let pushText = '';
    try{
      const res = await axios.get('https://weather.tsukumijima.net/api/forecast/city/170010'); // 現在金沢市の気象データを取得している

      const today_weather = res.data.forecasts[0].telop;

      pushText = `今日の金沢の天気は${today_weather}だよ！`;
      
        if(pushText.indexOf(`雨`) > -1){
          pushText = `今日の金沢の天気は${today_weather}だよ。傘を持って行った方がいいかも！`;
        }
    } catch(error){
      pushText = 'ごめんね。ちょっとわからないかも...';

      console.error(error);
    }

    return client.pushMessage(event.source.userId, {
      type: 'text',
      text: pushText
    });
  }

  if(userText.indexOf('ねえ') > -1){
    replyText = 'どうしたの？';
  }

  if (userText.indexOf('曜') > -1) {
    replyText = '今週もあとちょっとだね！週末はどこかに遊びに行きたいな';
  }

  if (userText.indexOf('れた') > -1) {

    const attractions = ['お疲れさま', '今日も頑張ったね', 'ごはん食べに行く？', '美味しいものでも食べに行こう', 'お仕事してえらい！', 'よしよし'];
    const att_count = attractions.length;
    const index = Math.floor(Math.random() * att_count);

    replyText = attractions[index];
  }

  if (userText.indexOf('好き！') > -1 || userText.indexOf('好き!') > -1) {

    const attractions = ['私も！', '好きー！', '大好きー！', '嬉しいな！', 'やったー！'];
    const att_count = attractions.length;
    const index = Math.floor(Math.random() * att_count);
    
    replyText = attractions[index];
  }

  if (userText.indexOf('おはよ') > -1) {

    const attractions = ['おはよう', 'おはよー','おはよ。よく寝れた？',  'おはよ。眠いよー'];
    const att_count = attractions.length;
    const index = Math.floor(Math.random() * att_count);
    
    replyText = attractions[index] ;
}

  if(userText.indexOf('無理') > -1){
    replyText = '無理しないでね...';
  }

  if(userText === '俺のこと好き？' || userText === '僕のこと好き？'){
    const attractions = ['好きだよ！', '大好き！！', 'きみは？', '恥ずかしいな・・・'];
    const att_count = attractions.length;
    const index = Math.floor(Math.random() * att_count);

    replyText = attractions[index];
  }

  if(replyText === ''){
    const attractions = ['うんうん、そうだよね', 'そういうこともあるよね', 'そうなんだ', 'うん', '頑張りすぎないようにね','うんうん'];
    const att_count = attractions.length;
    const index = Math.floor(Math.random() * att_count);

    replyText = attractions[index];
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText
  });
};

const client = new line.Client(config);

async function handleEvent(event){
  if(event.type !== 'message' || event.message.type !== 'text'){
    return Promise.resolve(null);
  }

  return replyFunction(event);
}

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  if (req.body.events.length === 0) {
    res.send('Hello LINE BOT! (HTTP POST)');
    console.log('検証イベントを受信しました！');
    return;
  } else {
    console.log('受信しました:', req.body.events);
  }
  Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result));
});

app.listen(PORT);
console.log(`ポート${PORT}番でExpressサーバーを実行中です…`);