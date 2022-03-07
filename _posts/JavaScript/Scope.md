---
title: "scope"
excerpt: "변수와 매개변수의 접근성과 생존기간을 결정한다."

categories:
  - scope
tags:
  - [global scope, local scope, function-level scope, lexical scope, javascript]

toc: true
toc_sticky: true
 
date: 2021-06-18
last_modified_at: 2021-07-21
---

## 정의
- Scope는 모든 프로그래밍 언어에서 기본적으로 가지고 있는 개념이다.
- 유효 범위 즉, 전역과 지역을 나누는 단위 라고 할 수 있다.
- 변수와 매개변수의 접근성과 생존기간을 결정한다.


### 함수 레벨 스코프(function-level scope)
- var 키워드의 스코프는 기본적으로 함수 레벨 스코프(function-level scope)이다.
  - 함수 코드 블록{ } 내에서 선언된 변수는 함수 코드블록 내에서만 유효하고 함수 외부에서는 유효하지 않다.
  - ECMAScript6에 도입된 `let`, `const`키워드를 사용하면 블록 레벨 스코프로 적용할 수 있다.

- var 키워드의 생략
  - var 키워드를 생략하고 변수를 선언할 경우 전역 변수로 선언된다
    ```jsx
    function scopeExam() {
      scope = 20;
      console.log('scope : ' + scope);
    }
    
    function scopeExam2() {
      console.log('scope : ' + scope);
    }
    
    scopeExam()   // 20
    scopeExam2()  // 20
    ```
  - var 키워드를 사용하면 생기는 다양한 문제점과 한계가 있다.
    그부분에 대해서는 [전역변수의 문제점과 전역변수 피하기](https://sunmerrr.github.io/glovalvariable/globalVariable/)에 정리해두었다.


### 렉시컬 스코프(Lexical scope) 또는 정적 스코프
 
- 함수를 어디서 호출했는지 보다 어디서 선언했는지에 따라 상위 스코프가 결정되는 것을 말한다.
    
  ```jsx
  var x = 1;
  
  function foo() {
    var x = 10;
    bar();        // foo 함수 안에서 호출되었지만 선언 자체는 전역변수 바로 아래에서 선언되었기 때문에 bar의 상위 스코프는 전역이 된다.
  }
  
  function bar() {
    console.log(x);
  }
  
  foo();  // 1
  bar();  // 1
  ```
    

## Global Scope

- 스크립트 전체에 참조 됨 → **스크립트 내 어느곳에서든 참조 가능**

## Local Scope

- 정의된 함수 안에서만 참조 됨 → **함수 밖에서는 참조 할 수 없음**