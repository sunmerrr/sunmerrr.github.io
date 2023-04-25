---
title: "리액트 컴포넌트 반복"
excerpt: "리액트를 다루는 기술 스터디 #5 - 컴포넌트 반복 [map]"

categories:
  - React
tags:
  - [react, javascript, library, ref, referenct]

toc: true
toc_sticky: true
 
date: 2023-04-14
last_modified_at: 2023-04-17
---


### 배열 메소드를 통해 컴포넌트 반복 다루기
- 자바스크립트 배열의 map()함수를 통해서 반복되는 컴포넌트를 다룸

#### map 함수란?(아주 간단히)
- 자바스크립트 배열 객체의 내장 함수
- 파라미터로 전달된 함수를 사용하여 배열 내 각 요소를 원하는 규칙에 따라 수행 후 새로운 배열을 리턴함
- 예시
  ```js
  var numbers = [1, 2, 3, 4, 5];

  var processed = numbers.map((num) => {
    return num * num;
  });

  console.log(processed) // [1, 4, 9, 16, 25]
  ```

#### 컴포넌트에 활용해보기
- 컴포넌트 내부에서 JSX와 함께 작성할 수 있음
- JSX로 작성할때는 DOM 요소를 작성해도 되고, 컴포넌트를 사용해도 됨
- 컴포넌트나 DOM요소를 map으로 반복 하게 될때는 react에서 어떤 순서의 DOM 값에서 변화가 있었는지 식별 할 수 있도록 key를 넣어줘야 함
- key 값은 언제나 유일해야 하며, 데이터가 가진 고윳값이나 배열의 index로 설정해줌
  ```jsx
  const IterationSample = () => {
    const names = ['snowman', 'ice', 'snow', 'wind'];
    const nameList = names.map((name, index) => <li key={index}>{name}</li>);
    return <ul>{nameList}</ul>;
  }
  ```