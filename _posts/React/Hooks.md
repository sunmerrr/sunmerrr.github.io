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

#### useEffect
- 외부 시스템과 동기적으로 작동할 수 있도록 해줌 
- 클래스형에서 componentDidMount와 componentDidUpdate를 합친 형태

- 기본 형태
  ```js
  useEffect(() => {
    {setup}
    return {clean up}
  }, [dependencies])
  ```
  - setup    
    렌더링 이후에 실행할 내용을 작성
  - clean up(뒷정리)     
    필요 시 언마운트 또는 업데이트 되기 직전에 실행할 내용을 return 뒤에 작성
  - dependencies(의존 배열)    
    첫 렌더링 시에만 실행되게 하고 싶다면 빈 배열로 둠
    특정 값이 변할때마다 실행하고 싶다면 의존 배열에 해당 특정 값을 넣음
    배열 이라서 특정 값이 여러개여도 상관 없음
##### 사용
- 외부 시스템과 연결
- 커스텀 훅을 감쌀 때
- 리액트에 포함되지 않은 프로그램을 제어할 때
- 데이터를 가져올 때
- 의존성 배열에 들어가는 의존 상태가 명확하게 동적일 때
- 어떠한 결과로 인해서 기존의 상태를 베이스로 상태를 업데이트 할 때
- 읜존성 배열에서 필요하지 않은 객체/함수를 지울 때  
- 서버와 클라이언트 측에 다른 컨텐츠를 보여야 할때
<!-- TODO: 번역이 조금 이상한듯 -->

Updating state based on previous state from an Effect
Reading the latest props and state from an Effect
Displaying different content on the server and the client

##### 참고
- 마운트 시 이펙트 코드가 두 번 실행됨
- 매 리렌더링 시 이펙트 코드가 실행됨
- 무한으로 리렌더링 시킴
- 언마운트가 되지 않았는데 clean up 코드가 실행됨
- 이펙트 코드가 있는데 실행되기 전에 종료되는 것 같음

##### 주의
- 너무 남발하지 말 것  

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

