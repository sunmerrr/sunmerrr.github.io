# Object 생성 방법과 차이

- object 생성방식에는 여러가지가 있다. 크게 차이는 없겠지만 생성방식과 차이점을 정리해보고자 한다.

<br>
<br>

## 생성 방법

1. {}
2. 생성자 함수
3. Object.create 메서드
4. class

   <!-- udemy(JavaScript: The Advanced Concepts (2022 Update)) > 섹션 6: Object Oriented Programming
   3 ~ 4 => udemy(JavaScript: The Advanced Concepts (2022 Update)) > 102 Object.creat() vs Class -->

<br>
<br>

## 1. {}

  - 객체 리터럴 이라고하는 방식으로 우리가 흔히 사용하고 있는 방식이다.
  - {} 의 중괄호 안에 key와 value로 이루어진 property를 작성하여 생성한다.
  - key는 문자 또는 숫자로 이루어진 값으로 정의하며 자바스크립트 네이밍 규칙을 따라 camel case로 작성하는것을 권장한다.
    - camel case로 작성하지 않을경우에는 항상 따옴표('' 또는 "")으로 감싸줘야 한다.
    - symbol 값도 object key로 사용할 수 있다.
  - value는 어느 타입의 값도 올 수 있다.
    - function 또한 value값으로 사용할 수 있으며 객체의 키값으로 사용된 function은 일반 함수와 구분하기 위해 method라는 이름으로 부른다.
    - method의 경우에는 축약해서 사용할 수 있다.
  - 각각의 property는 쉼표(,)로 구분해준다.
  - {} 생성 시 property가 없으면 빈 객체가 생성된다.
  - 객체에 사용되는 중괄호 {} 는 코드 블록을 의미하는것이 아니기 때문에 뒤에 세미콜론(;)이 따라온다.

#### 예시

  **- 포로퍼티가 없는 객체**

    ```
    const empty = {};
    ```

  **- 1개 이상의 프로퍼티가 있는 객체**

    ```
    const obj = {
      word: 'summer',
      num: 123,
      arr: [4, 5, 6],
      printProperties: function () {
        return `문자: ${this.word}, 숫자: ${this.num}, 배열: ${this.arr}`
      },
    };
    ```

  **- function 을 value로 가지고있는 key의 축약형**

    ```
    const obj = {
      string: 'summer',
      number: 123,
      array: [4, 5, 6],
      printProperties () {
        return `문자: ${this.word}, 숫자: ${this.num}, 배열: ${this.arr}`
      },
    };
    ```

## 2. 생성자 함수

  - new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다.
  - 자바스크립트는 Object, String, Number, Boolean, Function, Date, RegExp 등을 생성자 함수로 제공한다.
  - new 연산자와 함께 Object 생성자 함수를 호출하여 객체를 생성 할 수 있다.
  - 생성자 함수를 사용하게되면 똑같은 구조를 가진 객체를 여러개 생성 할 수 있다.

  - 예시
    ```
    function PlusTen(num) {
      this.num = num;
      this.getPlusTen = function () {
        return 10 + this.num;
      };
    }

    const five = new PlusTen(5);
    const seven = new PlusTen(7);

    console.log(five.getPlusTen());  // 15
    console.log(seven.getPlusTen());  // 17
    ```
    1. `function PlusTen() {...}` : 생성자 함수
    2. `const five = new PlusTen(5)` : 객체(인스턴스) 생성 및 반환