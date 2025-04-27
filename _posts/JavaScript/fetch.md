---
title: "데이터 요청 핸들링 제대로 하기"
excerpt: ""

categories:
  - web
tags:
  - [web, Fetch]

toc: true
toc_sticky: true
 
date: 2025-04-19
last_modified_at: 2025-04-19
---

## fetch를 잘못 알고 사용한걸까 핸들링을 제대로 못한 것일까
#### 1. 글을 쓰도록 만들어준 문제의 코드
- Fetch().then(data).catch(err) 에서 data 가 없는 값인데 에러가 안잡힌다.


#### 2. fetch 복습
- fetch 란?
    네트워크를 통해 서버로 HTTP 요청을 보내고, 비동기적으로 응답을 처리할 수 있도록 해주는 Promise 기반의 Web API