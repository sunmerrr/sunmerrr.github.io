---
title: "동시성"
excerpt: "clean code study #8-1"

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer, Clean Code]

toc: true
toc_sticky: true
 
date: 2022-11-30
last_modified_at: 2022-11-30
---


## 동시성
* ###### 객체는 처리의 추상화다. 스레드는 일정의 추상화다
* ###### 무엇(what)과 언제(when)을 분리하는 전략
1. SRP(single responsibility principle)를 준수
2. 동시성 오류를 일으키는 잠정적인 원인의 철저한 이해
3. 사용하는 라이브러리와 기본 알고리즘 이해
4. 공유하는 정보와 공유하지 않는 정보의 이해
5. 많은 플랫폼에서 많은 설정으로 반복해서 계속 테스트 해야한다.

#### JavaScript의 동시성
