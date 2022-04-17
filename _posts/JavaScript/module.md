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


## module의 탄생 과정
1. 자바스크립트의 스코프
- 자바스크립트는 각기 다른 파일을 import해줘도 결국에는 하나의 전역스코프를 공유한다. 
  전역스코프를 공유한다는 것은 전역으로 선언한 변수의 이름이 겹친다면 해당 변수는 재할당 될 수 있으며, 이로인해서 오류를 발생시킬 수 있다는 말이다.

  - 예시
  ===

2. IIFE
- 전역변수의 문제점을 해결하는 방법으로도 나왔던 즉시실행 함수이다. [즉시 실행 함수](https://sunmerrr.github.io/javascript/globalVariable/#3-%EC%A0%84%EC%97%AD%EB%B3%80%EC%88%98%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)