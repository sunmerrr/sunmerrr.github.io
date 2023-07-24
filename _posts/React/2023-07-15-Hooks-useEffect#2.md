---
title: "함수 컴포넌트의 Hooks - useEffect 톺아보기 #2"
excerpt: "리액트를 다루는 기술 스터디 #7-3 - Hooks: useEffect"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks, useEffect]

toc: true
toc_sticky: true
 
date: 2023-07-12
last_modified_at: 2023-07-15
---

## useEffect

## 참고
- 마운트 시 이펙트 코드가 두 번 실행됨    
  development 에서 StaticMode를 켜두면 useEffect를 실제로 두 번 실행함(내부의 setup 함수와 clean up 함수가 두 번 실행되는 것) 
- 매 리렌더링 시 이펙트 코드가 실행됨    
  1. 의존성 배열을 넣어두지 않으면 매 리렌더링 시 useEffect 코드가 실행됨
  1. 의존성 배열을 넣어두었는데도 계속 리렌더링 될때마다 실행된다면 의존성 배열에 들어있는 한 요소가 계속 변하면서 useEffect를 실행 시키는 것(콘솔로 찍어보면서 확인)
  - 다음과 같은 방법으로 개선 시킬 수 있음
    - state를 Effect로 부터 받아와서 업데이트
    - 필요없는 의존성 배열의 객체나 함수 요소를 삭제
    - Effect로 부터 최신 props나 state 읽어오기
  
- 무한 리렌더링이 됨    
  무한 리렌드링 되는 경우는 1번과 2번이 모두 만족할때 발생함    
    1. Effect가 어떠한 state에 의해서 업데이트 됨
    1. statee가 계속 리렌더링을 발생시키는데 Effect가 해당 state를 의존성 배열에 가지고 있음
  * 외부 시스템 연동을 위해 사용중일 때
    * 외부 시스템과 동기화를 위해 state를 필요로 했었나
    * 앱의 데이터 흐름 조작을 위해서 state를 필요로 했었나
  * 외부 시스템 연동을 위해 사용중이 아니라면 [Effect를 삭제](https://react.dev/learn/you-might-not-need-an-effect)하는 것도 방법임
- 언마운트가 되지 않았는데 clean up 코드가 실행됨
  - clean up 코드는 꼭 언마운트 될때만 동작한는 것이 아니라 의존성 배열 속 요소의 변화를 감지할때도 일어남
  - 또한, development에서는 react가 setup 코드와 clean up 코드를 한번 더 실행함
- 이펙트 코드를 통해 시각적 잡업이 수행되는데 실행되기 전에 깜박임
  - 시각적 작업은 [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)에서 수행해주는 것을 권장함
- useEffect는 항상 undefined를 return 함

## 주의
- 너무 남발하지 말 것  
- useEffect는 훅이라서 컴포넌트의 상위 수준에서 또는 커스텀 Hooks내에서만 호출해야함. 
- 반복문이나 조건문 안에서는 useEffect를 호출할 수 없음. 필요하다면 컴포넌트를 새로 만들고, 그 안에 state를 옮겨서 사용하는 것을 추천함
- 다른 외부 시스템과 동기적으로 연결하는 동작을 위한것이 아니면 굳이 사용하지 않는게 좋음
- 스트릭 모드에서 리액트는 첫번째 설정 이전에 development에서만 setup + cleanup 을 한번 추가적으로 실행함. setup에서 설정한 로짓을 cleanup에서 제대로 처리하는지 확인하기위한 스트레스 테스트임.
- 의존성 배열이 객체거나 함수를 사용할 경우 우리가 필요로 한 것보다 리렌더링을 자주 발생 시킬 수 있으므로 사용하지 않는 것이 좋음. 쓸데업는 state 업데이트도 Effect 밖에서 해주는 것이 좋음.
- Effect가 어떠한 인터렉션을 통해서 동작하지 않는다면, 리액트는 Effect를 실행하기 전에 스크린을 먼저 업데이트 함. useEffect때문에 지연되는게 너무 보이거나, 화면에 다른 효과를 주고 싶다면 [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)를 사용하는 것이 좋음
- 브라우저에서도 Effect로 state를 업데이트 하기 전에 스크린을 그릴 수 있음. 만약 스크린이 그려지기 전에 Effect에 들어있는 state를 업데이트 하거나 효과를 주고 싶다면 useLayoutEffect를 쓰는 것이 좋음
- Effect는 서버 렌더링 시에는 수행되지 않음


###### [원문 - react.dev/reference/useEffect](https://react.dev/reference/react/useEffect)

