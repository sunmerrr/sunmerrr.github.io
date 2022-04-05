---
title: "Array(배열)"
excerpt: "javascript Array 특징"

categories:
  - JavaScript
tags:
  - [Array, javascript, 자료구조, 배열]

toc: true
toc_sticky: true
 
date: 2021-04-08
last_modified_at: 2021-04-25
---

## 배열(Array)이란?

- 하나의 변수 안에 여러개의 자료를 순차적으로 저장 및 나열하는 방식의 자료구조이다.
- 다른 언어와는 다르게 Javascript의 배열 안에는 서로 다른 자료형을 넣을 수 있다.
  원시값은 물론 객체, 함수, 배열 등 자바스크립트에서 값으로 인정하는 모든 것은 배열의 요소가 될 수 있다.
- **Javascript에서의 배열은 객체이다.**

## 배열을 사용하는 이유

- 하나의 값을 리턴하면서 여러개의 정보를 가지고 올 수 있다.
- 연관되어있는 정보를 한번에 다룰 수 있게된다.
- 인덱스를 통해서 원하는 정보를 효율적으로 찾을 수 있다.

## 활용
- 배열의 생성과 간단한 메서드들을 보자
  ### 배열 생성

  ```jsx
  1. let arr = [3, 'string', 9.3]  // 배열 리터럴
  2. let arr = new Arr();  // Array() 생성자 함수
  ```

  ### 배열 다루기

  1. 요소 수정하기
      
      ```jsx
      let arr = [3, 'string', 9.3]
      
      arr[0] = 'text'
      console.log(arr);  //['text', 'string', 9.3]
      ```
      
  2. 요소 추가하기
      
      ```jsx
      let arr = [3, 'string', 9.3]
      
      ****arr[3] = 'text'
      console.log(arr);  //[3, 'string', 9.3, 'text']
      ```
      
  3. length 로 배열의 길이 구하기
      
      ```jsx
      let arr = [3, 'string', 9.3]
      
      console.log(arr.length);  // 3
      ```
      

  ### 간단한 추가/제거 메서드

  - 배열은 여러 메서드를 통해서 추가, 삭제, 탐색 등 관리 할 수 있다.
  - 배열에는 다양한 메서드가 있으며, 실제 개발에 유용한 메서드가 많기 때문에 배열을 다루는 것을 연습해두는 것이 좋다.

    #### .push

    - 배열 가장 끝 값을 추가
        
        ```jsx
        let array = ['a', 1, '2b', 49.08]
        
        array.push('sum');
        console.log(array);  // *['a', 1, '2b', 49.08, 'sum']*
        ```
        

    #### .pop

    - 배열 가장 끝 값을 삭제
        
        ```jsx
        let array = ['a', 1, '2b', 49.08]
        
        array.pop()
        console.log(array);  //[['a', 1, '2b']
        ```
        

    #### .unshift

    - 배열 가장 앞의 값을 추가
        
        ```jsx
        let array = ['a', 1, '2b', 49.08]
        
        array.unshift('set')
        console.log(array);  // ['set', 'a', 1, '2b', 49.08]
        ```
        

    #### .shift

    - 배열 가장 앞의 값을 삭제
        
        ```jsx
        let array = ['a', 1, '2b', 49.08]
        
        array.shift()
        console.log(array) = [1, '2b', 49.08]
        ```
      

## [과제1](https://ko.javascript.info/task/item-value)

```jsx
let fruits = ["사과", "배", "오렌지"];

// 배열을 '복사'한 후, push 메서드를 이용해 새로운 값을 추가합니다.
let shoppingCart = fruits;
shoppingCart.push("바나나");

// fruits에 어떤 값이 들어 있을까요?
alert( fruits.length ); // ?
```
<details><summary>답
</summary>
- 4
</details>

## [과제2](https://ko.javascript.info/task/call-array-this)

```jsx
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

<details><summary>답
</summary>
- `function() { alert ( this ) }`

- arr[2]에 있는 함수가 객체 메서드처럼 호출되는 것이죠. 따라서 arr[2]는 arr을 참조하는 this를 받고, 배열을 출력합니다.
</details>


## [과제3](https://ko.javascript.info/task/maximal-subarray)

```jsx
입력값은 arr = [1, -2, 3, 4, -9, 6] 같이 숫자로만 구성된 배열이라고 가정해봅시다.

우리가 해야 할 일은 인접한 요소의 총합이 최대인 arr의 부분 배열을 찾는 것입니다.

부분 배열 요소들의 합을 리턴하는 함수 getMaxSubSum(arr)를 작성해 봅시다.

예시:

getMaxSubSum([-1, 2, 3, -9]) == 5 (강조 표시된 요소들의 합)
getMaxSubSum([2, -1, 2, 3, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, 11]) == 11
getMaxSubSum([-2, -1, 1, 2]) == 3
getMaxSubSum([100, -9, 2, -3, 5]) == 100
getMaxSubSum([1, 2, 3]) == 6 (모든 요소)
요소 전체가 음수라면 아무런 요소도 선택하지 않아야 최댓값이 됩니다(부분 배열은 빈 배열). 그리고 합은 0이 됩니다.

getMaxSubSum([-1, -2, -3]) = 0;
가능하다면 성능을 고려하여 답안을 작성해 봅시다. 답안은 O(n2) 또는 O(n)까지 가능합니다.
```