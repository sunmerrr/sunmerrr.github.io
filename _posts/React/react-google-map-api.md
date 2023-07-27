---
title: "react google map API 연동 #1"
excerpt: "라이브러리 react-google-map/api을 사용한 구글 맵 api 연동"

categories:
  - React
tags:
  - [react, api, library, google-map, react-google-map]

toc: true
toc_sticky: true
 
date: 2023-07-27
last_modified_at: 2023-07-27
---


```jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setMapClose } from '../../Store/OpenSlice';

// TODO: 
// type error 해결
// 1. 발전소 위치 표시
// 2. robot 정보 불러와서 표시
// 3. 위성 화면으로 보이기 - mayTypes



function GoogleMapComponent() {
  const dispatch = useDispatch();

  const center = {
    lat: 36.959484,
    lng: 126.780659
  }
  const closeMapModal = () => {
    dispatch(setMapClose());
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY ?? "",
  })

  return isLoaded ? (
    <ComponentContainer>
      <GoogleMapContainer>
        <GoogleMap
          id="gs-eps"
          // 지도 스타일 width와 height 는 반드시 지정해줘야 지도가 뜬다
          mapContainerStyle={GoogleMapStyle}
          // 지도 로딩 시 보일 화면 지정
          center={center}
          // 지도 확대 비율
          zoom={16}
          // map instance가 로드되면 아래 콜백 함수가 동작함. map instance를 사용
          onLoad={map => {
            console.log('map', map)
          }}
          // 지도 컴포넌트가 언마운트 되기 전에 동작함. map instance를 사용
          onUnmount={map => {
            // do your stuff before map is unmounted
          }}
          mapTypeId='satellite'
        >
          <Marker position={{ lat: 36.959484, lng: 126.780659 }} title="GS-EPS 당진" />
        </GoogleMap>
      </GoogleMapContainer>
      <ComponentBackground onClick={closeMapModal} />
    </ComponentContainer>
  ) : <></>
}

export default React.memo(GoogleMapComponent);

const GoogleMapStyle = {
  'height': '100vh',
  'width': '100%'
}

const ComponentContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;  
`
const ComponentBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff40;
`
  
  const GoogleMapContainer = styled.div`
  position: absolute;
  cursor: pointer;
  width: 40%;
  height: 90%; 
  overflow: hidden;
  z-index: 12;
`
```