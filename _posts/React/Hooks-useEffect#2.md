---
title: "함수 컴포넌트의 Hooks"
excerpt: "리액트를 다루는 기술 스터디 #7-2 - Hooks"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks]

toc: true
toc_sticky: true
 
date: 2023-05-20
last_modified_at: 2023-06-13
---

#### useEffect

##### 참고
- 마운트 시 이펙트 코드가 두 번 실행됨
- 매 리렌더링 시 이펙트 코드가 실행됨
- 무한으로 리렌더링 시킴
- 언마운트가 되지 않았는데 clean up 코드가 실행됨
- 이펙트 코드가 있는데 실행되기 전에 종료되는 것 같음
- useEffect는 항상 undefined를 return 함

##### 주의
- 너무 남발하지 말 것  
- useEffect는 훅이라서 컴포넌트의 상위 수준에서 또는 커스텀 Hooks내에서만 호출해야함. 반복문이나 조건문 안에서는 useEffect를 호출할 수 없음. 필요하다면 컴포넌트를 새로 만들어서 그 안에 state를 옮겨서 사용하는 것을 추천함
- 다른 외부 시스템과 동기적으로 연결하는 동작을 위한것이 아니면 굳이 사용하지 않는게 좋음
- 스트릭 모드에서 리액트는 첫번째 설정 이전에 development에서만 setup + cleanup 을 한번 추가적으로 실행함. setup에서 설정한 로짓을 cleanup에서 제대로 처리하는지 확인하기위한 스트레스 테스트임.
- 의존성 배열이 객체거나 함수를 사용할 경우 우리가 필요로 한 것보다 리렌더링을 자주 발생 시킬 수 있으므로 사용하지 않는 것이 좋음. 쓸데업는 state 업데이트도 Effect 밖에서 해주는 것이 좋음.
- Effect가 어떠한 인터렉션을 통해서 동작하지 않는다면, 리액트는 Effect를 실행하기 전에 스크린을 먼저 업데이트 함. useEffect때문에 지연되는게 너무 보이거나, 화면에 다른 효과를 주고 싶다면 useLayoutEffect를 사용하는 것이 좋음
- 브라우저에서도 Effect로 state를 업데이트 하기 전에 스크린을 그릴 수 있음. 만약 스크린이 그려지기 전에 Effect에 들어있는 state를 업데이트 하거나 효과를 주고 싶다면 useLayoutEffect를 쓰는 것이 좋음
- Effect는 서버 렌더링 시에는 수행되지 않음

