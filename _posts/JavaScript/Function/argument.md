---
title: "Arguments"
excerpt: "함수는 만들어서 두고두고 재사용하기 위해서 존재한다."

categories:
  - function
tags:
  - [function, javascript, argument]

toc: true
toc_sticky: true
 
date: 2021-06-27
last_modified_at: 2021-06-28
---

## arguments 개념

- 함수는 arguments라는 지역 변수를 가지고 있으며, 이를 통해서 함수를 호출할때 입력되는 인수를 볼 수 있다.
- 함수안에서 볼수 있고 이름과 특성은 정해져 있다.
    - 이름 : arguments
    - 특성 : 유사 배열 형태의 객체. 배열은 아니지만 배열의 `.length` 속성은 사용할 수 있다.
- 자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않으며, 모든 인수는 암묵적으로 arguments 객체의 프로퍼티로 저장된다.

## 사용

- 예시 1
    ```jsx
    function sum(a, b) {
    	console.log(arguments);
    	return a + b;
    }
    
    console.log(sum());  // NaN
    console.log(sum(1));  // NaN
    console.log(sum(1, 2));  // 3
    console.log(sum(1, 2, 3));  // 3
    ```
    
    - 위 예시의 함수 속 콘솔은 아래와 같이 나온다.
    
    - `console.log(sum());  // NaN` 의 경우
        - 인수가 전달되지 않는 매개변수는 undifined로 초기화된 상태를 유지하며, 위 함수에서는 Not-A-Number을 출력하게 된다.
        
        ```jsx
        {
          length: 0,
          callee: ƒ sum(),
          __proto__: {
            ...
          }
        }
        ```
        
    - `console.log(sum(1));  // NaN` 의 경우
        - 인수가 전달되지 않는 매개변수는 undifined로 초기화된 상태를 유지하며, 위 함수에서는 Not-A-Number을 출력하게 된다.
        
        ```jsx
        {
          '0': 1,
          length: 1,
          callee: ƒ sum(),
          __proto__: {
            ...
          }
        }
        ```
        
    - `console.log(sum(1, 2));  // 3` 의 경우
        
        ```jsx
        {
          '0': 1,
          '1': 2,
          length: 2,
          callee: ƒ sum(),
          __proto__: {
            ...
          }
        }
        ```
        
    - `console.log(sum(1, 2, 3));  // 3` 의 경우
        - 매개변수의 개수보다 더 많은 인수가 전달된 경우에는 초과된 인수를 무시한 후 결과값을 출력한다.
        - 하지만 버려지지 않고 arguments 객체의 프로퍼티로 보관되어있는 것을 볼 수 있다.
        
        ```jsx
        {
          '0': 1,
          '1': 2,
          '2': 3,
          length: 3,
          callee: ƒ sum(),
          __proto__: {
            ...
          }
        }
        ```
        

- 예시 2 (권장하지 않는 방식)
    - `function.arguments`
        
        ```jsx
        function f(n) { g(n - 1); }  // 2-1, 5-1
        
        function g(n) {  // 2-2, 5-2
          console.log('before: ' + g.arguments[0]);  // 3, 6
          if (n > 0) { f(n); }  // 4
          console.log('after: ' + g.arguments[0]);  // 7, 8(?)
        }
        
        f(2);  // 1
        
        console.log('returned: ' + g.arguments);  // 9
        ```
        
        - 위 코드의 순서는?
            1. f에 인수 2를 대입 하여 f함수 호출 
            2. f함수의 매게변수는 g(n-1)이므로 g(1)로 g함수 호출 
            3. g함수 첫번재 줄 `before : 1` 출력 
            4. 두번째 줄 if 조건 만족하여 f(1)로 f함수 호출 
            5. f함수의 매게변수는 g(n-1)이므로 g(0)으로 g함수 호출 
            6. g함수 첫번째 줄 `before : 0` 출력 
            7. 두번째 줄 if 조건에 부합하지 않음으로 패스하고 세번째 줄 `after : 0` 출력
            8. **여기서 끝이 아니라 `after : 1` 이 또 출력(?) → 함수 g(n)내에서 이미  실행된 1의 숫자 값이 있기 때문에 출력되는 것으로 추정되지만 왜 0보다 나중에 출력되는 걸까?**
            9. `console.log('returned: ' + g.arguments);` 의 g.arguments는 g함수 밖이라서 `return: null` 값으로 출력
            
            - [https://s3-us-west-2.amazonaws.com/secure.notion-static.com/271f042e-8060-4394-a947-fadc212e58b5/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/271f042e-8060-4394-a947-fadc212e58b5/Untitled.png)