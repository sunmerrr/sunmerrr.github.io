---
title: "React Google Maps API 연동 #2 with 설명"
excerpt: "라이브러리 react-google-map/api을 사용한 구글 맵 api 연동"

categories:
  - React
tags:
  - [react, api, library, google map, react-google-map/api, react google map]

toc: true
toc_sticky: true
 
date: 2023-07-29
last_modified_at: 2023-08-05
---

## React 에서 Google Map API 사용하여 지도 띄워주기 + 설명
- 이미 [Google Map API 포스팅](https://sunmerrr.github.io/react/Google-map/)이 있지만 제대로 된 설명을 하지 못했었다.      
해당 포스팅에서도 똑같은 라이브러리를 사용해서 google maps를 적용 했었는데, 시간도 얼마 없고 적용도 잘 안돼서 다양한 라이브러리를 시도 했었다. 이번에는 라이브러리 선정부터 조금 더 차근히 할 수 있는 기회가 되어서 조금 더 살펴보면서 적용한 점이 다르다고 할 수 있을 것 같다.
- 기본적으로 [Google Maps Platform](https://developers.google.com/maps?hl=ko) 공식문서를 보고도 적용할 수 있지만 TS, JS로 된 예제밖에 나와있지 않기 때문에 React에 적용하는데 살짝 번거로움이 있었다.     
  그래서 따로 라이브러리를 설치해서 사용하였으며, 해당 라이브러리를 적용하는 글이 되겠다.    
  [react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)     
- Google Maps Platform에 [react-wrapper](https://www.npmjs.com/package/@googlemaps/react-wrapper)이 나와있긴 하지만 react-google-map/api 보다 사용량이 적다.

## 적용
- google maps api key를 받아와야 한다.   
  유료는 아니지만 카드를 등록해야 프로젝트를 등록하고 KEY를 받을 수 있다.
- install    
  `npm i -S @react-google-maps/api`
- 코드
  - 기본적으로 위도(latitude)와 경도(longitude)로 위치 정보를 불러온다.
  - 예시
    - *react 18+ 의 경우에는 MarkerF 등 F가 붙은 컴포넌트를 사용해야한다.*
    ```jsx
    import React, { useCallback } from 'react';
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

      // 지도를 불러오는 함수
      // isLoaded, loadError를 return 한다.
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // google maps 에서 받은 api key를 전달한다..
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
      });

      // 지도를 그릴때 동작하는 함수
      // center 값이나 옵션이 리렌더링에 영향을 받지 않게 하기 위해 useCallback으로 감싸준다.
      // google map의 instance를 사용할 수 있다.
      const onLoad = useCallback(map => {
        console.log("use map instance", map);
        map.setCenter(center);
        map.setOptions(options);
        map.setHeading(90);
      }, []);

      // 지도 컴포넌트가 언마운트 되기 전에 해야하는 동작을 아래 함수에 넣는다.
      const  onUnmount={map => {
        console.log("do your stuff before map is unmounted", map);
      }};

      return isLoaded && (
        <GoogleMapContainer>
          <GoogleMap
            id="google-map-test"
            mapContainerStyle={GoogleMapStyle} // width와 height 는 반드시 지정해줘야 한다.
          >
            <MarkerF
              position={{ lat: 37.5511694, lng: 126.9882266 }} title="marker title1" 
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
      ![load google maps](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/b34cf7ef-7984-4c77-83b5-8ca86fcabdb5)