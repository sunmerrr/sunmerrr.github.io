---
title: "React 함수 컴포넌트의 Hooks - useRef"
excerpt: "리액트를 다루는 기술 스터디 #8 - useRef"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks, useRef]

toc: true
toc_sticky: true
 
date: 2023-07-11
last_modified_at: 2023-07-14
---

#### 특징
- DOM 요소나 다른 값을 저장하고 관리하는데 사용됨
- 컴포넌트의 생명주기와 상관 없이 값을 유지하기 때문에 컴포넌트 리렌더링이 일어나도 값을 유지함
- `current` 프로퍼티를 이용하지 않으면 useRef 안에 들어있는 값에 접근 할 수 없음

#### 사용
- 예시
  ```jsx
  const {ref name} = useRef({initialValue})

  <div ref={ref name} ></div>
  ```
- initialValue     
  - `current` 프로퍼티에 들어가길 원하는 초기값을 넣어줌
  - 아무 타입이나 될 수 있으며, 첫 렌더링 이후에는 무시됨
- current
  - useRef가 return 하는 값
  - 초기에 넣어준 initialValue를 가지고 있으며, 추후에 value값을 변경 가능함
  - JSX node에 ref를 사용하면 React는 해당 node를 current에 넣음