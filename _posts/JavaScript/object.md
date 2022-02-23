---
title: "Object(객체)"
excerpt: "javascript object의 특징"

categories:
  - object
tags:
  - [object, javascript, property, method]

toc: true
toc_sticky: true
 
date: 2021-07-23
last_modified_at: 2021-07-27
---


# 객체

  - 다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료구조
    → 다양한 타입의 값 : 원시값을 제외한 나머지(함수, 배열, 정규 표현식 등)
  - 변경 가능한 값
  - 0개 이상의 프로퍼티로 구성
  - 프로퍼티 값이 함수일 경우 메서드라고 함
  <br>

## 1. 객체 리터럴에 의한 객체 생성


  - 객체 리터럴 : 객체를 생성하기 위한 표기법
  - 변수에 { }(중괄호) 속 0개 이상의 프로퍼티를 정의
  - 객체 리터럴의 { }는 코드 블록을 의미하지 않음
  - 자바스크립트의 유연함과 강력함을 대표하는 객체생성 방식
  - 객체 생성 이후에도 프로퍼티는 동적으로 추가 할 수 있음
  - 객체 리터럴 외의 객체 생성 방식은 모두 함수를 통해서 생성 함
  <br>

## 2. 프로퍼티

  - 객체는 프로퍼티의 집합 임
  - 프로퍼티는 키(key)와 값(value)로 구성
  - 프로퍼티는 , (쉼표) 로 구분
  - 문자열 또는 (문자)표현식을 이용해 키(key) 동적 생성
      
  - 예시
    ```jsx
    let obj = {};
    let key = 'hello';
    
    obj[key] = 'world';
    console.log(obj);  // { hello : 'world' } 
    ```
    <br>

    ### 프로퍼티 키(key)

      - 키(key) : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
      - 프로퍼티 키(key)는 값(value)에 접근할 수 있는 이름으로써 식별자 역할을 함
      - 빈 문자열을 프로퍼티 키(key)로 사용하지는 말자
      - 키에 문자열 또는 심벌값 외의 값으로 사용하면 암묵적 타입 변환을 통해 문자열이 됨
      - 이미 존재하는 키를 중복선언 시 나중에 선언한 프로퍼티 키(key) 가 기존것을 덮어씀


    ### 프로퍼티 값(value)

      - 값(value) : 자바스크립트에서 사용할 수 있는 모든 값
        <br>

## 3. 메서드

  - 프로퍼티 값(value)이 함수일 경우 일반 함수와 구분하기 위해 메서드(method)라고 부름
  - 객체에 묶여잇는 함수를 의미 함
  <br>

## 4. 프로퍼티 접근

  - 존재하지 않는 프로퍼티에 접근 시 에러나지 않음 → undefined를 반환
  - 키(key)가 식별자 네이밍 규칙을 준수하지 않을 시 대괄호 표기법 사용
  - 키(key)가 숫자로 이루어진 경우 ' '(따옴표)를 생략할 수 있음 → 단 반드시 대괄호 표기법을 사용
  - 아래 예제에 대해 설명하시오(모던 자바스크립트 Deep Dive 132p)
    
  - 예시
    ```jsx
    let person = {
    	'last-name': 'lee',
    	1: 10,
    };
    
    person.'last-name';
    person.last-name;
    person[last-name];
    person['last-name'];
    ```
    <br>

    ### 마침표 표기법

      - dot notation : 객체이름.키

    ### 대괄호 표기법

      - bracket notation : 객체이름['키']
      - 여기서 키 값은 반드시 ' '(따옴표) 로 감싼 문자열 이어야 함
      - ' '(따옴표)로 감싸지 않을경우 식별자로 인식 → [참고](https://www.notion.so/object-5c506c3427b246ca8d0a93902178fa18)
      <br>

## 5. 프로퍼티 값 갱신

  - 이미 존재하는 프로퍼티에 값 할당 시 값 갱신
  <br>

## 6. 프로퍼티 동적 생성

  - 존재하지 않는 프로퍼티에 값 할당 시 프로퍼티를 생성하며 동시에 값을 할당함
  <br>

## 7. 프로퍼티 삭제

  - delete 연산자 사용

  - 예시  
    ```jsx
    let person = {
    	name: 'lee',
    };
    
    delete person.name;  // name 프로퍼티 삭제
    delete person.age;   // age는 없는 프로퍼티 이므로 무시
    ```
    <br>
    
  - 피연산자는 프로퍼티 값에 접근 가능한 표현식이어야 함
  - 존재하지 않는 포로퍼티 삭제 시 무시
  <br>

## 9. 객체 리터럴의 확장 기능

  - ES6에서 추가된 표현이으로 기능의 확장으로 축약하여 사용할 수 있다.

    ### 프로퍼티 축약 표현

      - 프로퍼티 값으로 변수 사용 가능
      - 변수 이름과 키 값 동일 시 프로퍼티 키 생략 가능하며 키는 변수 이름으로 자동 생성 됨
        
      - 예시
        ```jsx
        let x = 1, y = 2;
        
        const obj = { x, y };
        
        console.log(obj);  // { x: 1, y: 2 }
        ```
        <br>

    ### 계산된 프로퍼티 이름(computed property name)

      - 문자열(또는 문자열로 변환 가능한 표현식)을 이용하여 프로퍼티 키를 동적으로 생성 가능
      - 프로퍼티 키로 사용할 표현식은 [ ](대괄호)로 묶어야 함
        
        - `객체 리터럴 외부`
          ```jsx
          let obj = {};
          let key = 'your age';
          let i = 1;
          
          obj[key + i] = ++i + ' is your korean age';
          obj[key + i] = ++i + ' is your korean age';
          obj[key + i] = ++i + ' is your korean age';
          console.log(obj);
          /* {
            'your age1': '2 is your korean age',
            'your age2': '3 is your korean age',
            'your age3': '4 is your korean age'
          } */
          ```
          <br>
          
        - `객체 리터럴 내부에서`
          ```jsx
          let key = 'your age';
          let i = 1;
          
          const obj = {
            ['${key} ${i}']: ++i + ' is your korean age';
          }
          ```
          <br>
          
    ### 메서드 축약 표현

      - function 키워드를 생략한 축약 표현 사용 가능
      - 프로퍼티에 할당한 함수와는 다르게 동작함 → 모던 자바스크립트 Deep Dive 26.2절 '메서드' 471p