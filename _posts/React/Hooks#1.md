---
title: "함수 컴포넌트의 Hooks"
excerpt: "리액트를 다루는 기술 스터디 #7-1 - Hooks"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks]

toc: true
toc_sticky: true
 
date: 2023-05-08
last_modified_at: 2023-05-10
---

### 함수 컴포넌트에서 할 수 없었던 다양한 작업을 가능하게 해주는 Hooks
- 리액트 v16.8부터 도입됨
- 내장 함수들은 react로 부터 import 하면 사용 가능

#### useState
- 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해줘서 상태 관리를 가능하게 해줌
- 기본 모양
  `[{상태 값}, {상태 설정 함수}] = useState({초기 값})`
- 상태 설정 함수를 호출하면 컴포넌트는 상태 값을 업데이트하면서 해당 컴포넌트도 새로 리렌더링 함

#### useEffect
- 랜더링 이후에 실행됨
- 클래스형에서 componentDidMount와 componentDidUpdate를 합친 형태
- 기본 모양
  ```js
  useEffect(() => {
    {렌더링 완료}
    return {뒷정리}
  }, [의존 배열])
  ```
  - 렌더링 이후    
    렌더링 이후에 실행할 내용을 작성
  - 뒷정리(clean up)     
    언마운트 또는 업데이트 되기 직전에 실행할 내용을 return 뒤에 작성
  - 의존 배열(dependency array)    
    첫 렌더링 시에만 실행되게 하고 싶다면 빈 배열로 둠
    특정 값이 변할때마다 실행하고 싶다면 의존 배열에 해당 특정 값을 넣음
    배열 이라서 특정 값이 여러개여도 상관 없음

