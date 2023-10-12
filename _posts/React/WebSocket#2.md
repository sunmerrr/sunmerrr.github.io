---
title: "WebSocket으로 만들어보는 채팅 앱 #2 client"
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

## 1. 클라이언트 만들기
#### 1. index.html
- 생성    
  서버에서 public 하위에 있는 index.html을 자동으로 불러오도록 설정(`app.use(express.static('public')`)해주었기 때문에 파일 구조는 아래와 같이 한다.    
  ```
  your_project_folder/
  |-- server.js (위의 수정된 서버 코드)
  |-- public/
  |   |-- index.html
  |   |-- other_static_files.js
  |   |-- ...
  ``` 
  
- 초기 작성     
  <!DOCTYPE html> 이거부터 다 써주기 귀찮으니까 검색해서 가져오자    
  또는, 빈 index.html에 `html:5`라고 쳐보자(ES7+ React/Redux/React-Native snippets 사용)

  그리고 메세지를 작성하는 input과 발송하는 button 태그를 만들어 준다.
  ```js
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
  </head>
  <body>
    <h4>채팅 페이지</h4>
    <div id="message-container"></div>
    <form id="send-container">
      <input type="text" id="message-input">
      <button type="submit" id="send-button">메세지 발송</button>
    </form>
  </body>
  </html>
  ```

- socket 연결    
  스크립트 태그를 추가해준다.
  ```js
  <script>
    // socket 연결 - 소켓은 http://가 아닌 ws://~ 으로 작성
    let socket = new WebSocket("ws://localhost:8080");

    socket.onopen = (event) => {
      // socket 이 성공적으로 연결되었을때 콘솔에 나타냄
      console.log("Socket connected sucessfully")
    }
  </script>
  ```

- 버튼 활성화
  메세지 발송 버튼을 누르면 메세지가 갈 수 있도록 셋팅해보자.
  일단 버튼을 누르면 고정된 메세지를 보내는 onclick 이벤트를 추가한다.
  ```js
  <button type="submit" id="send-button" onclick="socket.send('hello')">메세지 발송</button>
  ```