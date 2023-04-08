---
title: "리액트의 컴포넌트"
excerpt: "리액트를 다루는 기술 스터디 #2 - 컴포넌트"

categories:
  - React
tags:
  - [react, javascript, library, component]

toc: true
toc_sticky: true
 
date: 2023-04-07
last_modified_at: 2023-04-07
---

### 리액트의 class형 컴포넌트 vs function형
- class형 컴포넌트와 function형 컴포넌트를 생성하며 차이점을 보려고 한다.

##### 단축키
*Extentions에서 ES7+ React/Redux/React-Native snippets 설치하면 사용가능*
- rafce: arrow function component를 export default로 생성
- rce : class component를 export default로 생성

#### props
- 컴포넌트 속성을 설정할때 사용하는 요소
- 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값
- 컴포넌트 스스로는 props를 읽기 전용으로만 사용 가능

#### state

- 리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미