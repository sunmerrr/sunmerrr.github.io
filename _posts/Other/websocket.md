---
title: ""
excerpt: "웹소켓의 이론을 다루는 글"

categories:
  - Developer
tags:
  - [Software, web, Developer, WebSocket]

toc: true
toc_sticky: true
 
date: 2024-03-18
last_modified_at: 2024-03-22
---   

1. 장점
1. 연결 순서
    - fetch 방식과 약간 다름 (create handshake - sets up a connection - transmits the handshake - validates the response)
    1. 연결 설정
    1. 핸드쉐이크 요청 생성 및 전송
    1. 핸드쉐이크 응답 검증
1. 연결 이후에
1. 끊김 순서
1. 어떠한 이유로 종료되었을때