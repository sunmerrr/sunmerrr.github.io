---
title: "Event와 Effect 분리하기 - useEventEffect"
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

- Effect로 부터 최신 props와 state를 읽어올때
  - 보통은 우리가 Effect한테 원하는 것은 dependencies에 들어있는 값이 변경될 때마다 Effect를 동작 시키는 것임. 하지만, 우리는 종종 Effect에게 '동작'을 원하는 것이 아니라 최신 데이터만 원할때가 있음. 이럴때는 Evnets와 Effects를 분리시켜야 하는데, 리액트에서 useEffectEvent Hook을 통해서 가능하게 함 [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)


  https://www.youtube.com/watch?v=NZJUEzn10FI