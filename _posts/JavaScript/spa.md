---
title: "바닐라 자바스크립트로 만드는 SPA 쇼핑몰"
excerpt: ""

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer, spa, single page application, vanilla javascript]

toc: true
toc_sticky: true
 
date: 2024-04-28
last_modified_at: 2024-05-02
---

## 순수 자바스크립트를 통해서 동적인 SPA 웹페이지를 구성하는 방법

### 설명
프로젝트 구조, 진행 단계 등에 대해서 설명을 해보자면,
1. 프로젝트 구조
    - 단일 `index.html` 파일로 기본 레이아웃을 구성한다.
    - js 파일을 통해서 애플리케이션의 동작 처리와 페이지 로딩 처리를 진행한다.
    - css 파일에 스타일을 정의한다.

2. 개발 단계
    - index.html: 기본적으로 보여질 페이지를 구성한다.
    - 라우터: 사용자가 다른 페이지로 이동하고, 알맞은 페이지를 변경할 수 있도록 설정한다.
    - 뷰 렌더링: 각 라우트에 대한 뷰를 생성하고, DOM을 조작하여 인터렉션이 가능한 페이지를 사용자에게 제공한다.
    - 상태 관리: 있다면 전역적으로 관리한다.

3. 코드 구성    
  바뀔수도 있지만 일단 써보기     
    - index.html
    - global.css
    - router.js
    - main.js
    - main.css
    - product.js
    - product.css
    - cart.js
    - cart.css
    
### 1. index.html 생성
  기본적으로 보여져야하는 `index.html`파일을 설정한다. 안에 header로써 역할을 수행할 부분도 넣어줄 예정이다.
  ```html
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Tiny Shop</title>
      <link rel="stylesheet" href="styles.css">
  </head>
  <body>
      <header>
        <h1 class="title">My Tiny Shop</h1>
      </header>
      <div id="product"></div>
      <div id="pagination"></div>
      <script src="app.js"></script>
  </body>
  </html>
  ```    
  - 간단한 html 페이지가 만들어졌다.
    <img width="685" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/d8363409-9bcd-4efa-ac5b-33a085477acd">     

### 2. router.js 생성
  페이지를 이동할 수 있도록 설정해줄 라우터를 만든다.     
  처음에는 그냥 함수로 작성했다가 클래스 형식으로 다시 만들었다.    
  ```js
  class Router {
    construntor(routes) {
      this.routes = routes;
      this.#loadInitialRoute();
    }
  }

  #loadInitialRoute() { // 초기 경로를 로드해주는 함수
    const pathName = window.location.pathname;
    const route = this.#matchRoute(pathName);
  }

  #matchRoute(path) {
    return this.routes.find(route => route.path === path);
  }
  ```