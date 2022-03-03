---
title: "Default Parameters"
excerpt: "매개변수의 기본값"

categories:
  - function
tags:
  - [function, javascript, default parameters, parameters]

toc: true
toc_sticky: true
 
date: 2021-07-17
last_modified_at: 2021-07-18
---

## 개념

- 함수의 매개변수에 인수를 전달해주지 않으면 undefined를 기본값으로 갖는다.
- 다른 기본 값을 설정하는 것이 유용할 수 있는 상황에서 default parameter를 사용한다.

## 사용

- 기본값 미 사용
    
  함수 내부에서 매개변수를 기본값으로 정하지 않고 값이 undefined인 경우 값을 할당하도록 하였다.
  
  - 예시
    ```jsx
    function multiply(a, b) {
      b = (typeof b !== 'undefined') ? b : 1
      return a * b;
    }
    
    multiply(5, 9)  // 45
    multiply(5)  // 5
    ```
        

- 기본값 사용(default parameter)
    
  기본값 매개변수로 함수 내부에서 검사하지 않아도 되도록 할 수 있다.

  - 예시
    ```jsx
    function multiply(a, b = 1) {
      return a * b
    }
    
    multiply(5, 9)  // 45
    multiply(5)  // 5
    multiply(5, undefined)  // 5
    ```
      
  <!-- - type은 javascript에 의해 임의로 변경될 수 있다.
    ```jsx
    function type(num = 1) {
      console.log(typeof num);
      console.log(num);
    }
    
    type()            // 'number'  1
    type(undefined)   // 'number'  1
    
    type('')          // 'string'  ''
    type(null)        // 'object'  null
    ``` -->
        

## 주의할 점

<!-- [기본값 매개변수 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters#%ED%98%B8%EC%B6%9C_%EC%8B%9C_%ED%8F%89%EA%B0%80) -->

- 함수는 호출 될 때마다 새로운 매개변수를 생성한다.
- 기본값은 맨 마지막에 정의해줘야한다. 인수는 순서대로 매개변수에 할당되기때문에 앞쪽에 정의된 기본값은 덮어씌워질 수 있고 뒤쪽에 정의된 일반 매개변수는 인수를 전달받지 못할 수 있다.
- 기본값보다 앞쪽에 나온 매개변수는 뒤쪽의 기본값에 사용할 수 있다.

- MDN에서 이런 예제를 다뤘다.

<!-- ```jsx
function go() {
  return ':P';
}

function withDefaults(
  a,
  b = 5,
  c = b,
  d = go(),
  e = this,
  f = arguments,
  g = this.value
) {
  return [a, b, c, d, e, f, g];
}

withDefaults.call({ value: '=^_^=' });   // [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]

function withoutDefaults(a, b, c, d, e, f, g) {
  switch (arguments.length) {
    case 0:
      a;
    case 1:
      b = 5;
    case 2:
      c = b;
    case 3:
      d = go();
    case 4:
      e = this;
    case 5:
      f = arguments;
    case 6:
      g = this.value;
    default:
  }
  return [a, b, c, d, e, f, g];
}

withoutDefaults.call({ value: '=^_^=' });   // [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]

``` -->