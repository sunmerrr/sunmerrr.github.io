---
title: "WebSocket으로 만들어보는 채팅 앱 #1 server"
excerpt: "간단한 라이브 채팅 앱 프론트에서 백엔드까지 만들어보기"

categories:
  - React
tags:
  - [react, api, library, WebSocket, server, node.js, express]

toc: true
toc_sticky: true
 
date: 2023-09-27
last_modified_at: 2023-09-29
---

**node.js와 express, javascript로 만들어보는 채팅 앱**
**서버쪽은 잘 모르기 때문에 **

## 1. 서버 만들기
#### 1. node.js 설치
  [node.js 다운로드](https://nodejs.org/ko/download)

#### 2. express.js 설치
  `npm install express --save`

#### 3. WebSocket 모듈 설치
  `npm install ws`

#### 4. 코드 작성
- 서버 생성
  ```js
  // 필요한 모듈 불러오기
  const express = require('express');
  const http = require('http'); // http는 Node.js에 기본으로 내장되어있다.
  const WebSocket = require('ws');

  // 서버 설정 하기
  const app = express();
  const server = http.createServer(app);
  const socket = new WebSocket.Server({server})

  // static 파일 불러오는 express.static 미들 웨어
  app.use(express.static('public'))

  // WebSocket 연결
  socket.on('connection', (ws, req) => {

    // 클라이언트 측에서 오는 메세지 수신 이벤트 리스너
    ws.on('message', (msg) => {
      // 메세지를 연결된 모든 클라이언트에게 브로드캐스트 해줌
      socket.clients.map((client) => {
        if(client !==ws && client.readyState === WebSocket.OPEN) {
          client.send(msg)
        }
      })
    }
  });

  // 8080 포트로 서버를 실행하고 클라이언트가 요청을 보냈을때 콘솔에 해당 메세지를 출력한다.
  server.listen(8080, () => {
    console.log('Server is running on port 8080')
  })  
  ```

- 실행
  `node server.js`

생각했던 것보다 서버가 작성이 가능하다.