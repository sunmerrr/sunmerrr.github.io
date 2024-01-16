---
title: "[HTTP]Content-Disposition을 통한 파일 다운로드 기능 구현 예시"
excerpt: "서버에서 받아온 pdf 파일, 다운로드와 미리보기 기능 구현하기"

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer, HTTP, Bolb]

toc: true
toc_sticky: true
 
date: 2024-01-16
last_modified_at: 2024-01-16
---

## 서버에서 받아온 pdf 파일 다운로드와 미리보기 기능 구현하기
> 서버에 요청해서 받아온 pdf 파일에 대한 처리 내용을 담았다.

이번에 pdf 파일 다운로드 작업을 하게 되었는데 내가 한 방식이 흔하지 않은 방식인건지 적당한 예제를 못 찾아서(예제를 복붙하는 꿀을 빨지 못해서) 그냥 내가 남겨두려고 글을 쓴다.

1. 서버 호출을 통한 pdf 파일 받기    
    처음부터 막힌게 좀 웃기지만 서버 호출하는 것 부터 잘 안됐다.
    api가 배포되기 전이라 endpoint와 query 값, headers에 어떤 값을 넣어서 보내주는지 이야기해서 로직을 먼저 짰다.    