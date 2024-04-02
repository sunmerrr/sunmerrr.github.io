---
title: "웹소켓을 뜯어보자: 연결과 끊김 속 의도치 않은 끊어짐은"
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
1. http 연결 자체는 아래와 같이 됨(간략)
    1. 사이트에 접속
    1. DNS 서버에서 통해서 userinfo(사이트 정보) ip 얻음
    1. http 요청 생성(패키징)
    1. http 메세지 발송
    1. 상대 서버에서 패키징 풀어서 정보 확인
    1. 상대 서버에서 응답 생성(패키징)
    1. 응답 전송
    1. html 등 필요한 정보 웹에 보여줌

1. 장점
1. 연결 순서
    - fetch 방식과 약간 다름 (Fetch: 핸드쉐이크 생성 - 연결 설정 - 핸드쉐이크 전송 - 응답 검증)
    - http 요청 -> 응답 -> socket 통신으로 업그레이드
    1. 연결 설정
    1. 핸드쉐이크 요청 생성 및 전송
    1. 핸드쉐이크 응답 검증
1. 연결 이후에

1. 끊김 순서
1. 어떠한 이유로 종료되었을때
5초에 한번씩 메세지를 보내는데 어느정도 이상 메세지가 오지 않거나 서버에서 처리가 안되면 서버나 클라이언트가 비정상 종료된다고 본다.
(tcp는 전송 계층 담당이라 비정상 종료는 애플리케이션 계층으로 처리)

- 대체제.   
  - server-sent Event: 이벤트 발생 시 서버측에서 이벤트를 보냄
- 근데 시원하게 이렇게된다! 라는 자료를 발견하지 못한 것 같다.(니가 하면 되잖아)
참고 : https://stackoverflow.com/questions/26971026/handling-connection-loss-with-websockets