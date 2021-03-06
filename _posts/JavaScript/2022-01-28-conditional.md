---
title: "조건문"
excerpt: "조건문의 if...else와 삼항연산자, switch&case문 비교"

categories:
  - JavaScript
tags:
  - [condition, control flow, javascript, if, switch, ternary operator]

toc: true
toc_sticky: true
 
date: 2022-01-28
last_modified_at: 2022-01-30
---

## 1. 조건문

  - 특정 조건의 만족 여부에따라 코드의 실행 여부를 컨트롤하는 명령문이라고 할 수 있다.
  - 조건은 항상 참/거짓(불리언)으로 평가된다.
  - 조건문에는 if...else문과 switch&case문 두 가지이지만 삼항연산자가 if...else문을 대체할 수 있기 때문에 함께 정리하려고 한다.


### 조건문을 사용하는 이유
  - 위에 언급했듯이 특정 조건에 만족할때 특정 코드를 실행시키기 위해 사용한다.


### 조건문 사용 방법
  - 오늘 언급하는 세 가지의 방법 모두 하나의 조건을 주고 만족(true)했을때와 불만족(false)했을때의 실행될 명령을 입력해주면 된다.
  - 하지만 몇 조건문에서는 false 일때 따로 실행될 명령문을 지정하지 않기도 한다.


## 2. if...else

  - if 뒤에 조건을 붙여서 조건이 참인 경우 {}블록 안의 코드를 실행한다
  - 조건이 하나인 경우에는 if 하나만 써줄 수 있다.
  - else는 조건이 두 개인 경우에 if 의 조건이 끝나고 실행 되도록 써준다.
  - 그외에 조건이 더 있다면 if 뒤에는 if else로 조건을 걸어주고 조건 제일 마지막에 else를 써준다.

  - 예시

  - `조건이 하나인 경우: if 만 사용`
    ```jsx
    const num = 5;

    if ( num ===  5 ) {
      return 'num 은 5와 같습니다.';
    }
    ```

  - `조건이 두개인 경우: if...else 사용`
    ```jsx
    const num = 5;

    if ( num > 5 ) {
      return 'num 은 5보다 큽니다.';
    } else {
      return 'num 은 5보다 작거나 같습니다.';
    }
    ```


  - `조건이 세 개 이상인 경우: if ... if else ... else`
    ```jsx
    const num = 5;

    if ( num > 5 ) {
      return 'num 은 5보다 큽니다.';
    } if else ( num < 5 ) {
      return 'num 은 5보다 작습니다.';
    } else {
      return 'num 은 5와 같습니다.';
    }
    ```

<br>

## 3. 삼항연산자

  - 삼항연산자는 조건이 두가지인 경우 사용하기 좋다.
  - 조건 뒤에 ?를 붙이고 true일때 return될 값을 쓴다. 그 뒤에는 :를 붙이고 false일때 return될 값을 쓴다.
  - 조건문의 return값이 true/false 두가지 일 경우 if...else보다 가독성이 좋아질 수 있다.
  - 두가지 이상일 경우에도 사용할 수 있지만 가독성은 책임지지 않는다.
  - 조건과 return되는 값이 너무 길면 if...else문을 사용하는 것이 좋다.


  - 예시

  - `일반적인 삼항연산자`
    ```jsx
    const num = 5;

    num > 5 ? 'num 은 5보다 큽니다.' : 'num 은 5보다 작거나 같습니다.';
    // 조건 ? true일때 반환 값 : false일때 반환값
    ```

  - `조건이 두가지 이상일때`
    ```jsx
    const num = 5;

    (num > 5)
      ? 'num은 5보다 큽니다.'
      : (num < 5)
      ? 'num은 5보다 작습니다.'
      : 'num은 5와 같습니다.'
    ```

    <br>

## 4. switch&case

  - 조건이 여러개일 경우 if...else문을 사용해도 좋지만 switch문이 조금더 깔끔할 수 있다.
  - switch문은 if문과 유사하지만 else대신에 조건문 {}블록 안에 case를 사용하여 조건을 비교한다는 점이 다르다.
  - switch 뒤에 조건문을 써주고 {}블록 안의 case 뒤의 코드를 실행시킨다.
  - switch 는 case제일 마지막에 default를 써줌으로써 어떤 case에도 부합하지 않을 경우 리턴해줄 값을 정해줄 수 있다.
  - break문을 사용해주지 않을경우 조건에 부합하는 case를 만나더라도 결과는 달라질 수 있으니 break문을 사용하는것을 잊지 않도록 하자.

  - 예시

  - `switch, case, break, default를 모두 사용`
    ```jsx
    const num = 5;

    switch (num) {
      case 1: 'num은 1입니다.';
        break;
      case 2: 'num은 2입니다.';
        break;
      case 3: 'num은 3입니다.';
        break;
      case 4: 'num은 4입니다.';
        break;
      default: 'num은 5입니다.;
    }
    ```

<br>

## 5. 정리

### 상황별 각 조건문의 활용을 다르게 하면 좋을듯(누구나 다 하는소리..)
  - 조건이 하나일때
    if문을 사용하여 깔끔하게 빼낸다.
    (&& 또는 || 등을 사용해볼 수 있을 것이다.)
  - 조건이 두개일때
    삼항연사자를 사용하는것을 추천하지만 연산자 속에 return되는 값이 너무 길다면 if...else문을 사용하는 것이 가독성이 좋을 것 같다.
  - 조건이 세개 이상일때
    세개 이상의 조건부터는 개발자의 취향에따라서 그리고 속한 팀의 분위기(?)에 따라서 달라질 것이라고 생각한다.
    하지만 조건이 너무 많으면 switch문을 사용하는것이 좋지 않나 하는 개인적인 생각을 가지고 있다.
