---
title: "WebSocket으로 만들어보는 채팅 앱 #2 client"
excerpt: "간단한 라이브 채팅 앱 프론트에서 백엔드까지 만들어보기"

categories:
  - React
tags:
  - [react, api, library, WebSocket, server, node.js, express]

toc: true
toc_sticky: true
 
date: 2023-09-27
last_modified_at: 2023-09-29
---

**node.js와 express, javascript로 만들어보는 채팅 앱**    

## 1. 클라이언트 만들기
#### 1. index.html
- 생성    
  서버에서 public 하위에 있는 index.html을 자동으로 불러오도록 설정해주었기 때문에 파일 구조는 아래와 같이 한다.    
  ```
  your_project_folder/
  |-- server.js (위의 수정된 서버 코드)
  |-- public/
  |   |-- index.html
  |   |-- other_static_files.js
  |   |-- ...
  ```
  
