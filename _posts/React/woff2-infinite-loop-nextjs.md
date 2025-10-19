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

### 문제 상황
yarn dev 를 했는데 갑자기 실행이 안됨!    
```
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```
터미널 에러는 이렇게 뜨는데 내가 사용하고 있는 맥북 제외하고 모든 맥북에서 실행이 잘 됨.
    
limit 을 늘려봄    
```
NODE_OPTIONS="--max-old-space-size={용량 최대치}
```
실패함.   
여기서 용량 문제가 아님을 파악함    

터미널에 찍히는 에러로는 이거 외에 어떤 문제 인지 알 수가 없어서 한참을 다른 맥북으로 개발함..ㅜㅜ     

한 6개월 정도 지났나.. 다른 프로젝트도 같은 에러를 내면서 실행이 되지 않음..!!(내 개발자 인생 여기까지 인가 싶었음..(?))    
다른 프로젝트는 거의 매주 배포하고 있어서 터지는 시점을 쉽게 찾을 수 있었음.    
node 를 터트리는 범인은