---
title: "Rest Parameters"
excerpt: "함수에 매개변수 개수를 정해줄 수 없을때"

categories:
  - function
tags:
  - [function, javascript, rest parameters, rest operator]

toc: true
toc_sticky: true
 
date: 2021-06-21
last_modified_at: 2021-06-28
---

## Rest Parameter

### 정의

- 매개변수 앞에 `...` 을 붙여 사용하며 전달받는 모든 인수를 받는다.
- 일반 매개변수와 함께 사용될 수 있으며 이럴 경우 매개변수와 rest parameters에 순차적으로 할당된다.
- rest parameter의 경우 이름처럼 나머지 인수이기 때문에 파라미터의 가장 마지막에 위치해야 한다.
    
- 예시
  - `rest parameters 만 사용하는 경우`
    ```jsx
    function sum(...rest) {
    	return rest.reduce((a, b) => a + b);
    }
    
    console.log(sum(1, 2, 3, 4, 5));  // 15 출력
    ```
    
  - `매개변수와 함께 사용되는 경우`
    ```jsx
    function list(a, b, c, ...rest) {
      return 
    }

### 주의

1. rest parameter는 가장 마지막에 와야한다.
    
    ```jsx
    function sum(...rest, param, param) {
    	return rest.reduce((a, b) => a + b);
    }
    
    console.log(sum(1, 2, 3, 4, 5));  // SyntaxError: Rest element must be last element
    ```
    
2. rest parameter는 하나만 선언 할 수 있다.
    
    ```jsx
    function sum(...rest, ...rest) {
    	return rest.reduce((a, b) => a + b);
    }
    
    console.log(sum(1, 2, 3, 4, 5));  // SyntaxError: Rest element must be last element
    ```
    
3. rest parameter는 length 프로퍼티에 영향을 주지 않는다.
    
    ```jsx
    function sum(param, ...rest) {
      console.log(rest.length)  // 4
    	return rest.reduce((a, b) => a + b);
    }
    
    console.log(sum(1, 2, 3, 4, 5));  // 15
    console.log(sum.length)  // 1
    ```
    

## rest parameter 와 argument

1. arrow function
    
    화살표 함수의 경우 arguments 객체를 갖지 않음으로 가변 인자 함수를 구현할때 꼭 rest parameter를 사용해야 한다.
    
2. 배열 메서드
    
    arguments 객체의 경우 유사 배열 객체이므로 배열 메서드를 사용하려면 번거로운 과정을 거쳐야 했었다. 
    
    rest parameter는 인수 목록을 배열로 직접 전달 받을 수 있기 때문에 번거로움을 피할 수 이싿.