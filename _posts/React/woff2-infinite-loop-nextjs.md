---
title: "Next.js `next/font/local` 사용 시 V8 메모리 폭발 원인과 해결 방법"
excerpt: "Node.js가 OOM(Out of Memory)으로 죽을 수 있긴한데 원인을 찾는게 어렵다.."

categories:
  - Developer
tags:
  - [Software, web, Developer, font, Next.js]

toc: true
toc_sticky: true
 
date: 2025-10-13
last_modified_at: 2025-10-1
---   

> **TL;DR**: `next/font/local`로 큰 용량의 `.woff2` 폰트를 등록하면, dev 서버 실행 중 Node.js가 OOM(Out of Memory)으로 죽을 수 있다. 원인은 `.woff2` 파싱 중 V8의 `mark-compact GC` 루프가 감당하지 못하기 때문. 해결 방법은 폰트 수 쪼개거나, `@font-face` 방식으로 우회하는 것이다.
