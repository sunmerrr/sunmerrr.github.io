---
title: "리액트 이벤트 핸들링"
excerpt: "리액트를 다루는 기술 스터디 #3 - 이벤트 핸들링"

categories:
  - React
tags:
  - [react, javascript, library, event, event handling]

toc: true
toc_sticky: true
 
date: 2023-04-10
last_modified_at: 2023-04-11
---

#### 이벤트를 사용할 때 주의 사항
1. 이름은 카멜 표기법으로 작성
1. 이벤트 실행 코드는 함수 형태의 값으로 전달
1. DOM 요소에만 이벤트 설정
    - component에 이벤트를 설정해 줄 수 없음
      - event가 아니라 props로 인식해서 자식에게 전달만 해줄 뿐 아무런 이벤트를 실행하지 않음
      - 대신 자식 컴포넌트가 event함수를 props로 전달받아서 자식 DOM에 설정해줄 수 있음
