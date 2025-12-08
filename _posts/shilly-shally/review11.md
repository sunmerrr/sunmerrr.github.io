---
title: "회고글) 2025년 한 해 회고"
excerpt: ""

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer]

toc: true
toc_sticky: true
 
date: 2025-12-03
last_modified_at: 2025-12-03
---   
회사 내부
CBT 이벤트 3번 (12월 말에 예정된 것 포함)
web3 적용했다가 걷어내기(?)
게임 세팅 전체 로직 변경
메인 페이지 갈아엎기 2번
통계&분석 서비스 작업
부사수 채용
그 외
퓨처콘 운영진으로 참여
ps5 추가 구매

리스트업만 해놓고 봐도 뭐 많은 것을 하긴 했네

진행 한 프로젝트
#### 게임 세팅 전체 UI 및 로직 변경
**내용**: 게임 생성이 조금 더 적은 뎁스를 거쳐서 될 수 있도록 하기위해 리뉴얼 함 + 하는김에 리팩토링까지    
**스택**: React-Hook-Form, zustand     
**주요 내용**:     

1. 개임 생성의 create - prepare - update - finalize 순서를 create 한 단계로 변경
1. zustand 와 useContext, React-Hook-Form 의 역할 분담이 제대로 되어있지 않은 부분 리팩토링