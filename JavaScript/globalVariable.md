# 전역변수의 문제점과 전역변수 피하기

---

<br>

## 1. 전역변수

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

## 2. 전역변수의 문제점

- 문제점

  1. 결합과 중복 선언

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

<br>
<br>

## 3. 전역변수의 문제점 해결 방법

<br>

- 스코프로 묶어준다.
- let, const 등 다른 키워드로 변수를 선언한다.
- 함수 안에서만 사용할 수 있는 변수를 선언하여 변수의 주기를 짧게 한다.

<br>

1. Name Space Object

- 전역에 해당하는 객체를 하나 만들어서 네임스페이스를 만들어준다.
- 이렇게 관리하게되면 변수나 함수의 이름이 중첩되거나 변형되는 것을 방지한다.
- 네임 스페이스 구역 안에 다른 네임스페이스를 생성해줄수도 있다.

<br>

- 예시

  ```
  var obj = {
    name: 'name',
    func() {
      return `hello, my name is ${this.name}.`
    }
  }

  obj.birth = 0422
  obj.birth.month = 4
  obj.birth.day = 22

  ```

<br>
<br>

(아래 설명하는 IIFE 와 Module Pattern은 closure와 매우 비슷해 보인다. 실제로 Module Pattern은 클로저를 기반으로 작동한다는 것을 기억하자!)

2. IIFE

- immediately invoked function expression 의 약자로 정의와 실행이 함께 일어나는 즉시 실행 함수이다.
- 함수를 선언과 동시에 즉시 실행하여 함수의 지역을 생성하고, 함수 안에 선언된 변수들은 함수의 지역안에 생성된 지역변수가 된다.
- 외부에서는 함수 안의 변수에 접근할 수 없으며, 변수의 중첩, 재할당등 전역변수의 문제를 피해갈 수 있다.

- 예시

  ```

  (example = function () {
    var myName = 'Tony'
    return myName
  })()

  example()  // 'Tony'
  myName  //  ReferenceError: myName is not defined

  ```

<br>
<br>

3. Module Pattern

- module pattern이란?
  - 즉시 실행 함수로 감싸 지역을 만들고 그 안에 클래스를 넣은 것이라고 생각하면 된다.
  - 클로저의 기능중 하나라고 생각해도 될것 같다.
  - 만약 클로저를 모른다면 스코프를 생성하고 전역 변수를 방지하는 차원에서만 알고 넘어가면 좋을 것 같다.

<br>

- 예시

  ```
  var counter = (function() {
    var number = 0; // 클로저로 인해서 전역변수가 아닌 지역변수가 되며 외부에서는 접근할 수 없다.

    return function () {  // 외부로 공개할 함수나 메서드나 객체, 변수를 반환해준다.
      return ++number;
    }
  }());

  console.log(counter())  // 1
  console.log(counter())  // 2
  console.log(counter())  // 3
  console.log(counter.number)  // undefined

  ```

<br>
<br>

4. ES6 Module

- 기존에 javascript에서는 지원되지 않던 모듈 기능을 추가한 것이다.
- 아직까지는 Chrome 61, FF 60, SF 10.1, Edge 16 이상 정도에서 지원한다고 한다.
- ES6 Module을 사용하면 var 키워드는 전역 키워드가 되지 않으며 하나의 script파일을 하나의 스코프를 갖을 수 있게 된다.

- 사용방법

  - script 태그를 추가할때 type="module"로 지정하여 추가해주고, javascript의 파일 확장자 명은 mjs로 지정해준다.
  - 파일 확장자명을 mjs로 하지 않아도 되지만 ECMAScript에서 권장하고 있기 때문에 되도록이면 mjs로 해주자

  - 예시

    ```
    <script? type='module' src='test.mjs'></script?>
    <script? type='module' src='ES6ModuleTest.mjs'></script?>

    ```

- 주의) 몇몇의 구형 브라우저에서는 지원되지 않는 기능이라서 잘 살펴보고 사용해야한다.

<br>
<br>

5. let, const 키워드

### 1 ~ 5 번의 기능의 차이점
