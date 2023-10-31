---
title: "Google Maps API #4 - Polygon, 다각형 그리기"
excerpt: "react-google-map/api 지도위에 다격형 도형 그리기"

categories:
  - React
tags:
  - [react, api, library, google-map, react-google-map/api, react-google-map]

toc: true
toc_sticky: true
 
date: 2023-10-22
last_modified_at: 2023-10-22
---

## react-google-maps/api 라이브러리의 다각형 Polygon(PolygonF)
#### PolygonF
  해당 라이브러리는 업데이트되면서 PolygonF 라는 API로 사용해야한다.    
  다각형의 꼭짓점 좌표를 나타내 주는 paths 배열을 필수로 전달해준다.    
  중복으로 사용 가능하다.

## 적용 가능한 option
#### PolygonF
- 다각형 스타일 지정하기
  - strokeColor: 다각형의 테두리 컬러
  - strokeOpacity: 다각형 테두리 컬리의 투명도
  - strokeWeight: 다각형 테두리 컬러의 두께
  - fillColor: 다각형 안에 채우는 색
  - fillOpacity: 다각형 안에 채우는 색의 투명도

## 적용해보기
  - 예시
    ```jsx
    import React from 'react';
    import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
    import styled from 'styled-components';

    function GoogleMapComponent() {
      // 맵 로드시 처음으로 띄워줄 지역의 위도(latitude) 경도(longitude) 정보
      const center = {
        lat: 37.5511694,
        lng: 126.9882266
      };

      const options = {
        zoom: 16,
        mapTypeId: 'satellite' // 위성 뷰로 지정 
      };

      const polygonCoords = [
        { lat: 48.164947, lng: 112.510463 }, // north west 
        { lat: 22.643728, lng: 112.510463 }, // south west
        { lat: 22.643728, lng: 142.489605 }, // south east
        { lat: 48.164947, lng: 142.489605 }, // north east
      ];

      // 지도를 불러오는 함수
      // isLoaded, loadError를 return 한다.
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // google maps 에서 받은 api key를 전달한다..
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
      });

      return isLoaded && (
        <GoogleMapContainer>
          <GoogleMap
            id="google-map-test"
            mapContainerStyle={GoogleMapStyle} // width와 height 는 반드시 지정해줘야 한다.
          >
            <PolygonF
              paths={polygonCoords}
              options={{
                clickable: false,
                strokeColor: "#f801ffd1",
                strokeOpacity: 0.8,
                strokeWeight: 7,
                fillColor: "#000",
                fillOpacity: 0.5,
              }}
            />
          </GoogleMap>
        </GoogleMapContainer>
      );
    }

    export default React.memo(GoogleMapComponent);

    const GoogleMapStyle = {
      'height': '100vh',
      'width': '100%'
    };

    const GoogleMapContainer = styled.div`
      width: 100%;
      height: 100%; 
    `;
    ```
    - 결과 화면
      <img width="721" alt="google map polygon example" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/19c563cc-f882-48be-af53-661594402504">


## 응용하기
  - 결과 화면
    <img width="721" alt="google map polygon example" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/c6b0f605-d967-4bde-9042-75b0116f4899">




