---
title: "Google Maps API #4 - Polygon(PolygonF), 다각형 그리기"
excerpt: "react-google-map/api 지도위에 다격형 도형 그리기"

categories:
  - React
tags:
  - [react, api, library, google-map, react-google-map/api, react-google-map]

toc: true
toc_sticky: true
 
date: 2023-10-22
last_modified_at: 2023-11-05
---

#### google map api 기본 셋팅은 [React Google Maps API 연동 #2 with 설명](https://sunmerrr.github.io/react/react-google-map-api/) 포스팅 참고

## react-google-maps/api 라이브러리의 다각형 Polygon(PolygonF)
#### PolygonF
  해당 라이브러리는 React 18+ 버젼이면 PolygonF 라는 API로 사용해야한다.    
  다각형의 꼭짓점 좌표를 나타내 주는 paths 배열을 필수로 전달해준다.    
  중복으로 사용 가능하다.

## 적용 가능한 option
- 다각형 스타일 지정하기
  - clickable: 클릭 가능 여부
  - strokeColor: 다각형의 테두리 컬러
  - strokeOpacity: 다각형 테두리 컬리의 투명도
  - strokeWeight: 다각형 테두리 컬러의 두께
  - fillColor: 다각형 안에 채우는 색
  - fillOpacity: 다각형 안에 채우는 색의 투명도

## 적용해보기
  - 예시
    ```jsx
    import React from 'react';
    import { GoogleMap, useJsApiLoader, PolygonF } from '@react-google-maps/api';
    import styled from 'styled-components';

    function GoogleMapComponent() {
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

      const polygonOption = {
        clickable: false,
        strokeColor: "#f801ffd1",
        strokeOpacity: 0.8,
        strokeWeight: 7,
        fillColor: "#000",
        fillOpacity: 0.5,
      }

      // 지도를 불러오는 함수
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
      });

      const onLoad = useCallback(map => {
        map.setCenter(center);
        map.setOptions(options);
      }, []);

      return isLoaded && (
        <GoogleMapContainer>
          <GoogleMap
            id="google-map-test"
            mapContainerStyle={GoogleMapStyle}
            onLoad={onLoad}
          >
            <PolygonF
              paths={polygonCoords}
              options={polygonOption}
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
다각형 안에 다각형을 넣어서 해당 구역을 하이라이트 되도록 해준다.
  - 예시
    ```jsx
    ...

    const outerCoords = [
      { lat: 48.164947, lng: 112.510463 }, // north west 
      { lat: 22.643728, lng: 112.510463 }, // south west
      { lat: 22.643728, lng: 142.489605 }, // south east
      { lat: 48.164947, lng: 142.489605 }, // north east
    ];

    const innerCoords = [
      { lat: 37.583403, lng: 126.973829 },
      { lat: 37.576039, lng: 126.974151 },
      { lat: 37.576056, lng: 126.979300 },
      { lat: 37.583386, lng: 126.979687 },
    ]

    ...

    return isLoaded && (
      <GoogleMapContainer>
        <GoogleMap
          id="google-map-test"
          mapContainerStyle={GoogleMapStyle}
          onLoad={onLoad}
        >
          <PolygonF
            paths={[outerCoords, innerCoords]}
            options={polygonOption}
          />
        </GoogleMap>
      </GoogleMapContainer>
    );

    ...

    ```
    - polygon을 inner, outer 두 개로 나눠서 만들어주고 배열로 전달한다.
    - 다각형 안의 다각형은 색상을 따로 지정할 수 있다.
    - 결과 화면    
      <img width="914" alt="google map polygon application example" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/6a3a97b8-7c30-41c8-9657-28a73240c166">     
      색상 설정에 실패했다.     
      안의 다각형이 바깥 다각형의 스타일이랑 겹친다..ㅠㅠ 





