---
title: "Google Maps API 연동 #4 - 다각형 그리기"
excerpt: "지도위에 다격형의 도형 그리기"

categories:
  - React
tags:
  - [react, api, library, google-map, react-google-map/api, react-google-map]

toc: true
toc_sticky: true
 
date: 2023-10-22
last_modified_at: 2023-10-22
---

## 다각형
#### react-google-maps/api 라이브러리의 Polygon
  해당 라이브러리는 업데이트되면서 PolygonF 라는 API를 사용해야한다.    
  다각형의 꼭짓점 좌표를 나타내 주는 paths 배열을 필수로 전달해줘야 한다.

## 적용 가능한 option
- 다각형 스타일 지정하기
  - strokeColor: 다각형의 테두리 컬러
  - strokeOpacity: 다각형 테두리 컬리의 투명도
  - strokeWeight: 다각형 테두리 컬러의 두께
  - fillColor: 다각형 안에 채우는 색
  - fillOpacity: 다각형 안에 채우는 색의 투명도

## 적용해보기

## 순수 JavsScript로 만들기


