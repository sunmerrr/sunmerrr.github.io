---
title: "useEffect"
excerpt: "react function 컴포넌트에서 side effect를 다루는 법"

categories:
  - React
tags:
  - [react, javascript, library, hook, useEffect, side effect]

toc: true
toc_sticky: true
 
date: 2022-04-06
last_modified_at: 2022-04-06
---

- 리엑트 hook을 모른다면? [What is a Hook 👉🏻](https://ko.reactjs.org/docs/hooks-overview.html#but-what-is-a-hook)

## Effect Hook
- useEffect 는 react의 함수형 컴포넌트에서 side effect를 다룰 수 있게 해주는 hook 이다.
  *side effect : 렌더링 시에 실행되지 않고 그 이후에 비동기로 실행되는 부수적인 일들* 