# 전역변수의 문제점

---

<br>

## 전역변수

- 전역변수란 프로그램 전체에서 접근할 수 있는 변수이다. 글로벌 스코프를 갖는 변수라고도 할 수 있겠다.
- 프로젝트 어디에서든 접근하여 참조, 할당, 재할당 할 수 있다.

<br>

- 전역변수의 생성

  - 함수 밖에서 var 키워드를 통해서 선언된 변수
  - 함수 밖에서 키워드 없이 값을 할당받은 변수
  - 함수 안에서 키워드 없이 값을 할당받은 변수

- 예시

  ```
  var a = 'global scope';
  b = 'global scope';
  function func() {
    c = 'global scope'
    var d = 'local scope'
  }

  func();

  console.log(a); // 'global scope'
  console.log(b); // 'global scope'
  console.log(c); // 'global scope'
  console.log(d); // 'ReferenceError: d is not defined at <anonymous>:14:13
  ```

  - 위 예제에서 a, b, c 는 글로벌 스코프를 갖는다.
    (정확하게 b, c 는 전역 변수가아닌 전역 객체의 프로퍼티다.)

- var 키워드로 생성된 변수는 함수 안에서 선언된 경우를 제외하고 모두 전역변수로 할당된다.

<br>
<br>

## 전역변수의 문제점

- 문제점

  - 1. 결합

    - 모든 전역변수들은 암묵적으로 결합되어있다.
    - 이런 경우에는 사용되고 있던 전역 변수가 쉽게 수정될 수 있고, 비슷한 이름으로 할당 될 수 있으며, 같은 이름으로 재할당 될 수 있다는 문제점이 있다.
    - 변수가 어디서 어떻게 변경되었는지 추적이 안된다면 디버그 또한 어려워진다.

    <br>

  2. 네임스페이스 오염

  - 자바스크립트의 전역 스코프는 파일을 분리해서 작성하더라도 모두 똑같은 전역 스코프를 공유한다.
  - 이렇게 될 경우에는 다른 파일에서 선언한 전역변수를 또 다른 파일에서 수정 되며, 우리가 예상하고 사용한 변수와는 다른 결과를 가져오게 될 수 있다.

    <br>

  3. 생명 주기

  - 변수의 생명주기는 해당 변수의 유효범위와 같다. 즉, 함수 안에서 선언한 var 변수의 생명주기는 함수가 호출되고 실행되는 주기와 똑같다.
  - 그런데 전역 변수의 경우에는 전역에 선언되었기 때문에 프로젝트가 실행되는 동안 생명주기가 계속 이어진다.
  - 생명 주기가 길어지면 변수에 접근하고 재할당 할 수 있는 가능성 또한 커진다는 것을 의미한다.

  <br>

  4. 스코프 체인

  - 자바스크립트는 스코프 안에서 참조한 변수 또는 함수가 없는경우 상위 스코프를 검색하는 스코프 체인을 가지고 있다.
  - 전역 변수의 경우에는 스코프 체인의 가장 상위에 존재하게 되며 코드를 실행햇을때 변수를 검색하는

<br>

- All the function have access to the global scope

- function scope vs block scope

<br>
<br>

## 전역변수의 문제점 해결 방법

<br>

- 스코프로 묶어줌
-

<br>

1. IIFE

- immediately invoked function expression 의 약자로 정의와 실행이 함께 일어나는 즉시 실행 함수이다.

- 예시
  ```
  (function example () {
    console.log('invoked!')
  }()
  ```

<br>
<br>

2. Name Space Object

```
var obj = {
  name: 'name',
  number: 14
  func() {
    return `hello, my name is ${this.name}.`
  }
}
```

<br>

- 네임 스페이스를 사용하여

<br>
<br>

3. Module Pattern

- 모듈 패턴은 보통 iife와 함게 사용되므로 iife를 모른다면 조금 어려울 수 있다.

- module pattern이란?
  - 변수와 메소드를 wrapping해줘서

<br>

- module pattern의 사용법

  - 예시

<br>

- 장점

<br>

- 단점

<br>
<br>

4. ES6 Module

<br>

### 1 ~ 4 번의 기능의 차이점
