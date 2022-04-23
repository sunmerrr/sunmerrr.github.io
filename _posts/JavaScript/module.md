---
title: "JavaScript Module"
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

## Module 이란
- 재사용이 가능한 코드를 분리해서 다른 파일에서도 불러와 쓸 수 있도록 만들어둔 단위라고 생각하면 편할 것 같다.
- 자바스크립트에서는 모듈기능이 없었지만 전역 스코프에 대한 단점을 보안하기 ES6부터 추가되었다.
- 모듈을 작성한 파일에서 export 해주고 main.js 같은 최상위 모듈파일에서 import 해줌으로 모듈화를 해줄 수 있으며 스코프를 나눠줄 수 있다.
- HTML 페이지에 적용 시 `<script>` 요소에 `type='module'`을 넣어줘야 한다.
  ```Html
  <script type='module' src='main.mjs'></script>
  ```

## Module의 탄생 과정
1. 자바스크립트의 스코프
  - 자바스크립트는 각기 다른 파일을 HTML에 로드해줘도 결국에는 하나의 전역스코프를 공유한다. 
  전역스코프를 공유한다는 것은 전역으로 선언한 변수의 이름이 겹친다면 해당 변수는 재할당 될 수 있으며, 이로인해서 오류를 발생시킬 수 있다는 말이다.

    - 예시
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      // 아래와 같이 파일을 나눠서 작성했지만 결국에는 하나의 전역 스코프를 공유하고 있다.
      <script src="app.mjs"></script>
      <script src="sidebar.mjs"></script>
      <script src="contents.mjs"></script>
    </body>
    </html>
    ```

2. IIFE
  - 전역변수의 문제점을 해결하는 방법으로도 나왔던 즉시실행 함수이다. [즉시 실행 함수](https://sunmerrr.github.io/javascript/globalVariable/#3-%EC%A0%84%EC%97%AD%EB%B3%80%EC%88%98%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)
  - 함수를 선엄함과 동시에 실행시켜 스코프를 생성한다.
  - var를 통해서 변수를 선언하게되면 전역변수로 선언되어 하나의 전역스코프를 공유하는 자바스크립트에서는 오류가 생길 수 있었다.
    하지만 var는 함수 레벨 스코프로 함수의 중괄호({ }) 안에서는 지역 변수의 역할을 하게 된다.
  - 여기서 즉시 실행 함수는 스코프를 지정해주는 역할을 하게 된다.
  - 하지만 즉시 실행 함수는 함수를 즉시 실행하며 스코프만 적용해줄 뿐 실질적인 해결책을 줄 수는 없다.

3. Library
  - 모듈 기능이 없는 자바스크립트에서는 모듈화를 위해서는 라이브러리를 사용해야했다.
  - 대표적으로 CommonJS 와 AMD가 있으며 Node.js 에서는 CommonJS를 따라서 모듈을 지원한다.
  - ES6부터 모듈 기능을 추가하며 라이브러리의 도움 없이도 모듈 기능을 사용할 수 있게되었다.


4. ES6 모듈
  - html 파일에 자바스크립트 파일을 불러오는 script 태그에 타입을 모듈로 지정해준다.
  - 불러오는 자바스크립트의 파일 확장자는 `mjs`로 모듈임을 명시해주는 것이 좋다.
  - ES6 모듈 지원 현황(22.04.22)
    - Safari 10.1.
    - Chrome 61.
    - Firefox 60.
    - Edge 16.

## Module 사용
  ### scope
  - 모듈로서 작성한 자바스크립트는 모듈 파일 자체 스코를 갖게 되며 모듈 스코프라고 한다.
  - 전역 변수를 선언해주었던 var 키워드로 변수를 선언해도 모듈 파일에서는 전역 스코프를 갖지 않게 된다.

  ### export 
  - 모듈 내에서 선언한 함수, 변수등을 다른 파일(또는 모듈)에서 사용하기위해서는 해당 모듈을 export해줘야 한다.
  - 각각 export 하기
  ```mjs
  export const name = 'summer';

  export function sum(num) {
    return num + num;
  }

  export class Person {
    constructor(name) {
      this.name = name;
    }
  }
  ```

  - 한번에 export 하기
  ```mjs
  const name = 'summer';

  function sum(num) {
    return num + num;
  }

  class Person {
    constructor(name) {
      this.name = name;
    }
  }

  export { name, sum, Person };
  ```
