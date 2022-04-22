---
title: "javascript module"
excerpt: "javascript에서 modele의 발전과 개념"

categories:
  - JavaScript
tags:
  - [module, javascript]

toc: true
toc_sticky: true
 
date: 2022-04-17
last_modified_at: 2022-04-17
---

## module 이란
- 자바스크립트의 전역 스코프에 대한 단점을 보안하기 위해 나온 메커니즘 이다.
- 모듈을 작성한 파일에서 export 해주고 main.js 같은 최상위 모듈파일에서 import 해줌으로 모듈화를 해줄 수 있으며 스코프를 나눠줄 수 있다.
- HTML 페이지에 적용 시 `<script>` 요소에 `type='module'`을 넣어줘야 한다.
  ```Html
  <script type='module' src='main.js'></script>
  ```

  ### import
  - 개발을 해본 사람이라면 import와 export는 익숙 할 것이다.
  - 필요한 모듈을 사용하고자 하는 파일에 import해서 사용한다.
  - import를 하기 전에는 반드시 끌어와서 사용하고자 하는 파일을 export 해줘야 한다.  

  - 예시
  ===

  ### export
  - 사용하고자 하는 모듈을 export해서 다른 파일에서도 사용할 수 있도록 해준다.

  - 예시
  ===

## module의 탄생 과정
1. 자바스크립트의 스코프
- 자바스크립트는 각기 다른 파일을 import해줘도 결국에는 하나의 전역스코프를 공유한다. 
  전역스코프를 공유한다는 것은 전역으로 선언한 변수의 이름이 겹친다면 해당 변수는 재할당 될 수 있으며, 이로인해서 오류를 발생시킬 수 있다는 말이다.

  - 예시
  ===

2. IIFE
- 전역변수의 문제점을 해결하는 방법으로도 나왔던 즉시실행 함수이다. [즉시 실행 함수](https://sunmerrr.github.io/javascript/globalVariable/#3-%EC%A0%84%EC%97%AD%EB%B3%80%EC%88%98%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)
- 함수를 선엄함과 동시에 실행시켜 스코프를 생성한다.
- var를 통해서 변수를 선언하게되면 전역변수로 선언되어 하나의 전역스코프를 공유하는 자바스크립트에서는 오류가 생길 수 있었다.
  하지만 var는 함수 레벨 스코프로 함수의 중괄호({ }) 안에서는 지역 변수의 역할을 하게 된다.
- 여기서 즉시 실행 함수는 스코프를 지정해주는 역할을 하게 된다.
- 하지만 즉시 실행 함수는 함수를 즉시 실행하며 스코프만 적용해줄 뿐 실질적인 해결책을 줄 수는 없다.

3. Library
- CommonJS 와 AMD

4. 