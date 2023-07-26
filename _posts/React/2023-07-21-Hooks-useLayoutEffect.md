---
title: "함수 컴포넌트의 Hooks - useLayoutEffect"
excerpt: "리액트를 다루는 기술 스터디 #7-4 - Hooks: useLayoutEffect"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks, useLayoutEffect]

toc: true
toc_sticky: true
 
date: 2023-07-18
last_modified_at: 2023-07-21
---

#### useLayoutEffect
- 동작 방식 자체는 useEffect와 동일
  ```jsx
  useLayoutEffect(() => {
    {setup}
    return {clean up}
  }, [dependencies])
  ```
- useEffect와 같이 컴포넌트 내에서 Effect를 처리하는데 사용 됨

##### useEffect와 차이점

  | useEffect | useLayoutEffect |
  | --- | --- |
  |화면이 업데이트된 이후에 **비동기적으로** 실행|브라우저가 화면을 그리기 직전에 **동기적으로** 실행|
  |컴포넌트가 렌더링되고 화면에 반영된 이후에 처리해야하는 작업에 주로 사용|렌더링 이후에 화면을 업데이트하기 전에 작업 처리|
  |데이터 패칭, 구독 설정, 외부 API 호출 등과 같은 외부 서비스를 연동할때 사용|DOM 요소 조작, DOM 조작에 따른 레이아웃 계산 등을 진행 시 사용|
  |렌더링 이후 화면의 변경으로 인해서 발생할 수 있는 이슈를 회피하기에 적절|레이아웃 계산이나리플로우를 발생시키기 전에 DOM 조작을 수행하는데 적절|
  
  - 예시
    ```jsx
    import { useState, useEffect, useLayoutEffect } from "react";

    function LayoutEffectComponent() {
      const [widthWithLayout, setWidthWithLayout] = useState(window.innerWidth);
      const [widthWithEffect, setWidthWithEffect] = useState(window.innerWidth);

      useLayoutEffect(() => {
        // 윈도우의 너비 값을 widthWithLayout state에 넣어주는 함수 
        function handleResize() setWidthWithLayout(window.innerWidth);

        console.log("useLayoutEffect 이벤트 셋업");
        window.addEventListener("resize", handleResize);

        return () => {
          console.log("useLayoutEffect 이벤트 클린업");
          window.removeEventListener("resize", handleResize);
        };
      }, []);

      useEffect(() => {
        // 윈도우의 너비 값을 widthWithEffect state에 넣어주는 함수
        function handleResize() setWidthWithEffect(window.innerWidth);

        console.log("useEffect 이벤트 셋업");
        window.addEventListener("resize", handleResize);

        return () => {
          console.log("useEffect 이벤트 클린업");
          window.removeEventListener("resize", handleResize);
        };
      }, []);

      return (
        <div>
          <div>useLayoutEffect: {widthWithLayout}px</div>
          <div>useEffect: {widthWithEffect}px</div>
        </div>
      );
    }
    ```

    - 실행 순서
      ![useLayoutEffect Performance](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/380b215a-bc90-417c-a65e-7c3a6a3d160e)
      1. LayoutEffectComponent.js 마운트
      1. useState 정의
      1. useLayoutEffect 실행
      1. react JSX element 객체 생성
      1. static mode 설정
      1. useEffect 실행
    - [테스트 해보러가기](https://codesandbox.io/s/distracted-ramanujan-lk3rcf?file=/src/App.js)

##### 주의사항
- useLayoutEffect는 동기적으로 실행되기 때문에 성능에 영향을 미칠 수 있음
- DOM 조작이 많거나 복잡한 경우에는 불필요한 리플로우가 발생할 수 있음
- 렌더링 이후에 처리해도 문제가 없는 경우에는 useEffect를 사용하는 것을 권장

