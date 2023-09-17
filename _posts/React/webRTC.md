---
title: "WebRTC로 만드는 영상통화 앱: WebRTC란"
excerpt: "간단한 영상통화 프론트에서 백엔드까지 만들어보기"

categories:
  - React
tags:
  - [react, api, library, WebRTC]

toc: true
toc_sticky: true
 
date: 2023-08-21
last_modified_at: 2023-09-17
---

## WebRTC 란
**WebRTC(Web Real-Time Communication)는 웹 기반의 실시간 통신을 가능하게 하는 오픈 소스다. WebRTC를 사용하여 웹 브라우저와 모바일 애플리케이션에서 오디오, 비디오 및 데이터를 실시간으로 교환할 수 있는 앱을 만들 수 있다.**
**Javascript로 구성되어 있어서 프론트 개발자가 혼자서도 서버가지 개발하기 쉽게 되어있다.** 

## WebRTC의 구성 요소
1. getUserMedia: 웹 브라우저에서 기기의 카메라, 마이크와 같은 미디어 입력 장치에 엑세스 할 수 있는 API
1. RTCPeerConnection: 브라우저 간에 실시간 미디어 스트림을 교환할 수 있는 핵심 API. 이 API를 사용하여 피어 통신을 설정하고 데이터를 교환한다.
1. RTCDataChannel: 파일, 채팅 메시지, 게임 데이터 등 데이터를 교환 할 수 있는 API
1. NAT Traversal: NAT(Network Address Translation) 트래버스 및 방화벽 숨김 처리 기능을 내장하고 있어서 별도의 서버 구성을 신경쓰지 않아도 P2P 연결을 설정할 수 있다.
1. Codec: VP8, VP9 비디오 코덱, Opus 및 G.711 오디오 코덱과 같은 인코딩 및 디코딩 기술을 포함하고 있어서 높은 품질의 오디오, 비디오 스트림을 지원해줄 수 있다.

