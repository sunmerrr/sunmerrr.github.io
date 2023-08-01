---
title: "react google map API 연동 #1"
excerpt: "라이브러리 react-google-map/api을 사용한 구글 맵 api 연동"

categories:
  - React
tags:
  - [react, api, library, google map, react-google-map/api, react google map]

toc: true
toc_sticky: true
 
date: 2023-07-27
last_modified_at: 2023-08-01
---

# React Google Map API
- 기본적으로 [Google Maps Platform](https://developers.google.com/maps?hl=ko) 공식문서에는 TS, JS로 된 예제밖에 나와있지 않기 때문에 React에 적용하는데 살짝 번거로움이 있었다.     
  그래서 따로 라이브러리를 설치해서 사용하였으며, 해당 라이브러리를 적용하는 글이 되겠다.    
  [react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)     
- Google Maps Platform에 [react-wrapper](https://www.npmjs.com/package/@googlemaps/react-wrapper)이 나와있긴 하지만 react-google-map/api 보다 사용량이 적다.

## 적용
- install    
  `npm i -S @react-google-maps/api`
- 코드
  - 기본적으로 위도(latitude)와 경도(longitude)로 위치 정보를 불러온다.
  - 예시
    - react 18+ 의 경우에는 MarkerF 등 F가 붙은 컴포넌트를 사용해야한다.
    ```jsx
    import React, { useState, useCallback } from 'react';
    import styled from 'styled-components';
    import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

    function GoogleMapComponent() {
      // 맵 로드시 처음으로 띄워줄 지역의 위도(latitude) 경도(longitude) 정보
      const center = {
        lat: 37.5511694,
        lng: 126.9882266
      }

      const options = {
        zoom: 16,
        mapTypeId='satellite' // 위성 뷰로 지정 
      }

      // 지도를 불러오는 함수
      // isLoaded, loadError를 return 한다.
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
      })

      // center 값이나 옵션이 리렌더링에 영향을 받지 않게 하기 위해 useCallback으로 감싸준다.
      // google map의 instance를 사용할 수 있다.
      const onLoad = useCallback(map => {
        map.setCenter(center)
        map.setOptions(options)
        map.setHeading(90)
      }, [])

      // 지도 컴포넌트가 언마운트 되기 전에 동작한다.
      const  onUnmount={map => {
        // do your stuff before map is unmounted
      }}

      return isLoaded && (
        <GoogleMapContainer>
          <GoogleMap
            id="gs-eps"
            mapContainerStyle={GoogleMapStyle} // 지도 스타일 width와 height 는 반드시 지정해줘야 지도가 뜬다
          >
            <MarkerF
              position={{ lat: 37.5511694, lng: 126.9882266 }} title="marker title1" 
            />
          </GoogleMap>
        </GoogleMapContainer>
      )
    }

    import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
    export default React.memo(GoogleMapComponent);

    const GoogleMapStyle = {
      'height': '100vh',
      'width': '100%'
    }

    const GoogleMapContainer = styled.div`
      position: absolute;
      cursor: pointer;
      width: 40%;
      height: 90%; 
      overflow: hidden;
      z-index: 12;
    `
    ```