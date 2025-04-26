---
title: "Fetch"
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

## fetch에 대한 흔한 오해(나에게만 흔할지도 모르지만)

#### 문제
- Fetch().then(data).catch(err) 에서 data 가 없는 값인데 에러가 안잡힌다.

#### fetch 복습
- fetch 란?
    네트워크를 통해 서버로 HTTP 요청을 보내고, 비동기적으로 응답을 처리할 수 있도록 해주는 Promise 기반의 Web API