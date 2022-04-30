---
title: "Storage와 Cookie"
excerpt: "web에서 Storage와 Cookie의 차이"

categories:
  - web
tags:
  - [web, Local Storage, Session Storage, Cookie]

toc: true
toc_sticky: true
 
date: 2022-04-26
last_modified_at: 2022-04-26
---

## 브라우저에 정보 저장하기 
- 웹은 따로 저장공간에 특정 정보들을 저장해 줄 수 있다. 그에 따라서 해당 계정이 페이지에 접근 권한이 있는지를 판단하기도 하고, 특정 시기동안 정보를 가지고 있다가 유저에게 제공해 주기도 한다.
- 웹에서 어떤식으로 정보를 저장하고 활용 하는지 정리 해본다

## HTTP Cookie
- 웹 페이지를 돌아다니다보면 쿠키를 허용하라는 메세지를 받아본적이 있을 것이다.
  웹 브라우저에 해당 유저의 정보를 저장하고 있다가 서버의 부가적인 요청, 재접속 시에 해당 정보를 신속하게 불러올 수 있도록 하기위한 목적이다.
- 브라우저에 저장되었다가 서버 요청이 있을때 함께 보내줄 수 있다 (??)
- 쿠키는 약 4KB의 작은 크기의 문자열을 저장할 수 있다.

### 사용 목적
- 로그인 / 장바구니 / 게임 스코어 등 개인 정보 관리
- 사용자 선호 테마 등의 셋팅 저장
- 사용자 행동 분석

- 권장하지 않음 - 모든 요청 시 / 성능 저하

### 사용 방법(간단정리)
- Set-Cookie

<!-- [Cookie Deep Dive](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies) -->

## Web Storage(modern storage APIs)
### Local Storage
- 저장과 불러오기
  - 키와 값
- 공유
- 만료 시점
- 구분 기준


### Session Storage
- 저장과 불러오기
  - 키와 값
- 공유
- 만료 시점



차이점

장단점