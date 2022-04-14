---
title: "Reduce"
excerpt: "배열 속 요소를 원하는 순서로 정렬하기"

categories:
  - JavaScript
tags:
  - [array, reduce, javascript, compare]

toc: true
toc_sticky: true
 
date: 2021-07-17
last_modified_at: 2021-08-15
---

## reduce는 무엇인가
- reducer의 역할을 수행해주는 메소드이다.
- reducer란?
  이전의 상태나 동작을 받아서 새로운 상태나 동작을 반환해주는 함수

## 사용

```jsx
배열.reduce((누적값, 현재값, 인덱스, 요소) => { 결과값 }, 초기값);
arr.reduce((accumulator, currentValue, currentIndex, array) => { return }, initialValue);
```




### 덧셈
  ```jsx
  let arr = [1, 2, 3, 4, 5];
  let sum = arr.reduce((pre, curval, curidx, arr) => {
    return pre + curval;
  });
  
  console.log(sum);  // 15
  ```
    
### 초기값
    
  ```jsx
  let arr = [1, 2, 3, 4, 5];
  let sum = arr.reduce((pre, curval, curidx, arr) => {
    return pre + curval;
  }, 100);
  
  console.log(sum);  // 115 -> pre가 100으로 설정되어있음
  ```
  
### 인스턴스 개수 세기
    
  ```jsx
  let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
  
  let count = names.reduce((allNames, name) => {
    if (name in allNames) {
      allNames[name]++;
    } else {
      allNames[name] = 1;
    }
    return allNames;
  }, {});
  
  console.log(count);  // { Alice: 2, Bob: 1, Tiff: 1, Bruce: 1 }
  ```
  
  - 같은 코드를 아래와 같이 줄일 수 있음
      
    ```jsx
    let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
    
    let count = names.reduce((allNames, name) => {
      allNames[name] = ++allNames[name] || 1 ;
      return allNames;
    }, {});
    
    console.log(count);
    ```

### 주의

- `initialValue`를 지정하지 않으면 `reduce()`는 인덱스 1부터 시작하며, 0번째 인덱스는 건너뛴다. 이 경우 `accumulater`가 0번째 인덱스에 해당합니다.
- `initialValue` 지정 시 인텍스 0부터 시작함
