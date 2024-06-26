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

- 실시간 성을 흉내내기 위한 http polling 방식
  - 클라이언트의 요청에 의해 서버가 응답하는 구조(동시에 양방향 통신이 안됨)
  - 요청 주기를 정해서 소통하게 되는데 반복 주기가 적을수록 실시간성을 높일 수도 있음
  - 주기가 짧은 만큼 서버에 요청하고 응답받는 횟수가 많아짐
  - 전송되어야 할 데이터가 없어도 지속적으로 통신을 해야함
  - 계속되는 요청과 응답의 헤더 생성으로 낭비되는 네트워크 자원 증가
  - 또한, 통신 시 생성되는 헤더는 어플리케이션을 수행하는데 필요한 데이터가 아님

1. 장점
    - 양방향 통신 지원: 클라이언트의 요청 없이도 서버에서 데이터를 클라이언트로 전송할 수 있음
    - 브라우저의 네이티브 소켓을 제공
    - 핸드쉐이크 시에만 요청 및 응답 헤더를 포함하고 데이터 송수신 시에는 2바이트의 프레임만 사용(1/500~1/1000 정도의 데이터 감소)
    - 데이터 전송 시 클라이언트의 요청 단계가 없기 때문에 같은 시간안에 더 많은 데이터의 처리가 가능

1. 연결 순서
    - http: 연결 요청 - 핸드쉐이크 생성 - 연결 설정 - 핸드쉐이크 전송 - 응답 검증
    - websocket: 연결 요청 -> 응답(핸드쉐이트) -> 연결 -> socket 통신으로 업그레이드

1. 어떠한 이유로 종료되었을때
    - 서버가 종료되었거나 컴퓨터가 강제 종료 되었을때의 경우에는 error를 볼 수 없다.(서버 종료 시 error를 보내지 않음) 
    - 사용자가 '연결 종료'등의 버튼이 아닌, 브라우저를 닫거나 컴퓨터를 꺼버린 경우에는 disconnect 알림을 서버에 보낼 수 없다.

5초에 한번씩 메세지를 보내는데 어느정도의 시간이 지나도록 메세지가 오지 않거나 서버에서 처리가 안되면 서버나 클라이언트가 비정상 종료된다고 본다.
(tcp는 전송 계층 담당이라 비정상 종료는 애플리케이션 계층으로 처리)

- 대체제.   
  - server-sent Event: 이벤트 발생 시 서버측에서 이벤트를 보냄
- 근데 시원하게 이렇게된다! 라는 자료를 발견하지 못한 것 같다.(니가 하면 되잖아)
참고 : https://stackoverflow.com/questions/26971026/handling-connection-loss-with-websockets
참고 : https://hyeon9mak.github.io/web-socket-disconnection-detection/