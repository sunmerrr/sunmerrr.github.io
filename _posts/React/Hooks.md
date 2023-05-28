---
title: "함수 컴포넌트의 Hooks"
excerpt: "리액트를 다루는 기술 스터디 #7-2 - Hooks"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks]

toc: true
toc_sticky: true
 
date: 2023-05-10
last_modified_at: 2023-05-20
---

#### useReducer
- 다양한 상태를 다양한 상황에 따라서 다른 값으로 업데이트 해줄 수 있는 hook
- 현재 상태와 업데이트 행위를 담은 함수를 전달받고 새로운 상태를 반환
- 기본 형태
  ```js
  [state, dispatch] = useReducer({reducer 함수}, {초기 state 값})
  ```
  - state(상태 값)
  - dispatch    
    액션을 발생시키는 함수
    dispatch(action) 등의 형태로 사용함
  - reducer 함수     
    따로 정의 한 함수의 이름을 전달해줌
  - 초기 state 값
    초기 state 값을 지정하는 곳
    형태는 자율

#### useMemo
- 컴포넌트 내부에서 발생하는 연산을 최적화 해줄 수 있음
- 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고 특정 값이 바뀌지 않았다면 이전 연산 값을 다시 사용함
- 기본 형태
  ```js
  const cachedValue = useMemo(calculateValue, dependencies)
  ```
- TODO: 예제 코드 쓰기
- 예제 화면
  ![화면-기록-2023-05-11-오후-7 16 31](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/7e4184bb-ea74-400d-80e6-6bb3f9a2ef38)

