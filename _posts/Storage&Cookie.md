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
last_modified_at: 2022-05-01
---

## 브라우저에 정보 저장하기 
- 웹은 따로 저장공간에 특정 정보들을 저장해 줄 수 있다. 그에 따라서 해당 계정이 페이지에 접근 권한이 있는지를 판단하기도 하고, 특정 시기동안 정보를 가지고 있다가 유저에게 제공해 주기도 한다.
- 웹에서 어떤식으로 정보를 저장하고 활용 하는지 간단히 정리 해본다

## HTTP Cookie
- 웹 페이지를 돌아다니다보면 쿠키를 허용하라는 메세지를 받아본적이 있을 것이다.
  웹 브라우저에 해당 유저의 정보를 임시저장하고 있다가 서버의 부가적인 요청, 재접속 시에 해당 정보를 신속하게 불러와서 사용자를 식별할수 있게 하기 위함이다.
- 서버 통신 시 서버에서 쿠키를 생성해줄 수도 있고, 브라우저에서 직접 쿠키를 생성할 수도 있다. 또한 서버에서 요청 시 해당 쿠키를 담아서 보내줄 수 있다.
- key와 value로 이루어져 있으며 path, expires 등 속성을 가질 수 있다.
- storage보다 훨씬 작은 크기의 데이터를 저장할 수 있으며 만료 기간 설정 시 만료 기간 전까지 브라우저를 껐다 켜도 쿠키는 유지 된다.

  ### 사용 목적
  - 브라우저에 가지고 있다가 서버의 요청이 있을때 보내어 사용자를 식별 할 수 있도록 해준다.
    - Session : 개인 정보 관리 및 식별
      - 예) 로그인 / 장바구니 담긴 상품 / 게임 스코어 유지 등
    - Personalization : 사용자 셋팅 저장
      - 예) 일주일간 보지 않기 / 30일간 보지 않기 / 사용자 선호 테마 저장 등
    - Tracking : 사용자 행동 패턴 분석 및 기록
      - 예) 최근에 검색한 기록을 통해서 광고 띄우기

<!-- [Cookie Deep Dive](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies) -->

## Web Storage(modern storage APIs)
- 사용자의 정보를 더 직관적으로 저장할 수 있는 방법이다. 
- 스토리지는 저장된 정보를 서버로 전송하지 않는다.
- 키와 값으로 저장하고 키를 통해서 불러올 수 있다.

  ### Local Storage
  - 브라우저를 닫았다가 열어도 저장된 정보를 남겨둔다.
  - 쿠키나 세션 스토리지보다 저장공간이 커서 비교적 많은 양의 정보를 저장할 수 있다.
  - 유효기간 없이 정보를 저장한다.

    #### 사용 예시
    - 저장
      ```js
      // window 객체의 localStorage가 포함되어있고, window. 은 생략할 수 있다.
      localStorage.setItem('myName', 'summer')
      ```

    - 접근
      ```js
      const name = localStorage.getItem('myName')
      ```

    - 항목 삭제
      ```js
      localStorage.removeItem('myName')
      ```

    - localStorage 전체 삭제
      ```js
      localStorage.clear()
      ```

  ### Session Storage
  - 브라우저를 닫으면 저장되었던 정보는 사라진다.
  - 쿠키보다는 많은 정보를 저장할 수 있지만 local storage에 비해 적은 양을 저장할 수 있다.
  - local storage와 마찬가지로 키와 값으로 저장하고 키를 통해서 불러올 수 있다.

  ### 사용 예시
  - 저장, 접근, 삭제 방법은 local storage와 동일하다.


