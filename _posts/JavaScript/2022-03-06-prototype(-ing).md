---
title: "prototype(ing)"
excerpt: "javacript는 프로토타입 기반 객체지향 프로그래밍 언어이다."

categories:
  - JavaScript
tags:
  - [prototype, javascript, OOP, Object Oriented Programming, inheritance]

toc: true
toc_sticky: true
 
date: 2022-03-06
last_modified_at: 2022-03-06
---

## 개념

- 자바스크립트는 프로토타입 기반의 객체지향 프로그래밍 언어이다.
- 프로토타입은 부모 객체의 특징 묶음 이라고 볼 수 있다.
- 자바스크립트는 프로토타입을 기반으로 객체의 상속을 구현한다.

## 상속

- 객체의 프로토타입은 모든 자식 객체에게 상속되어 부모의 특성(프로퍼티, 메서드)을 공유하고 사용할 수 있다.
- 부모의 특성을 상속해줌으로 인해서 코드의 중복을 최소화 할 수 있는 장점이 있다.
  - 생성자 함수로 부가세 포함 가격 예시
    ```jsx
    function Price(price) {
      this.price
      this.amountDue = function () {
        return Math.round(this.price + (this.price * 0.1))
      }
    }

    const shirts = new Price(126000);
    const pants = new Price(76000);
    ```
    - 위와 같이 계산을 할 경우 shirts와 pants가 부가세 포함 금액을 구하는 동일한 메서드를 생성/소유 하게 된다.
    - 생성자 함수를 통해서 부가세가 포함된 금액을 구하기 위해서는 똑같은 메서드를 계속해서 생성하고 각각의 객체가 소유하고 있게 된다.

## 활용

- 프로토타입은 Price 생성자 함수의 prototype 프로퍼티에 바인딩 되어 있다.
- 프로토타입에 원하는 프로퍼티나 메서드를 추가해주기 위해서는 `Object.progotype.property` 또는 `Object.progotype.method` 형식으로 작성해주면 된다.
- 부모의 프로토타입에 추가해준 프로퍼티/메서드는 자식 객체에서 자유롭게 사용 및 참조가 가능하다.
  - 프로토타입을 통해서 부모 상속 예시
    ```jsx
    function Price(price) {
      this.price;
    }

    Price.prototype.amountDue = function () {
      return Math.round(this.price + (this.price * 0.1)) + '원'
    }

    const shirts = new Price(126000);
    const pants = new Price(76000);

    // 부모의 프로토타입 메서드를 자유롭게 사용
    console.log(shirts.amountDue())  // '165000원' 출력 
    console.log(pants.amountDue())  // '83600원' 출력
    ```

