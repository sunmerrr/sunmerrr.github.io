---
title: "웹소켓과 socket.io"
excerpt: "WebSocket Streaming"

categories:
  - React
tags:
  - [react, javascript, library, websocket, streaming, socket.io]

toc: true
toc_sticky: true
 
date: 2023-04-20
last_modified_at: 2023-05-02
---


### HTTP
- 웹 통신 프로토콜 이라고 생각하면 쉬움
- 특징
  - 유저가 request를 보내기 전까지는 서버에서 메세지를 보내지 못함
  - stateless
  - 요청과 응답 이후 서버와 연결이 끊어짐

### WebSocket
- http와다른 프로토콜
- 브라우저가 요청을 보내면 웹소켓에서 응답하고 계속 연결되어있음
- 서버는 상대가 누구인지 기억하고 있음
- 요저의 request가 없어도 서버에서 메세지를 보낼 수 있음

### socket.io 
  - WebSocket을 훤씬 간편하게 사용할 수 있게 해줌 
  - WebSocket의 확장 버젼은 아님(주의) 
  
  #### 사용 
  - server 
    - 셋팅 
    - on 
    - 'connecting','disconnecting' 
    - emit({name}, arg1, arg2, done()) 
  - client 
    - setting 
    - on 
    - emit({name}, arg1, arg2, () => {})