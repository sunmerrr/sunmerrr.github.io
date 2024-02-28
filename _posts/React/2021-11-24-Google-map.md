---
title: "react google map API 연동 #1"
excerpt: "라이브러리 react-google-map/api을 사용한 구글 맵 api 연동"

categories:
  - React
tags:
  - [react, api, library, google map, react-google-maps/api, react google map]

toc: true
toc_sticky: true
 
date: 2021-11-24
last_modified_at: 2021-11-24
---

## react-google-maps/api 최신 글 보러가기

  - [React Google Map API 연동 #2 with 설명](https://sunmerrr.github.io/react/react-google-map-api/)
  - [React Google Map API #3 - 필수 옵션과 props + instance](https://sunmerrr.github.io/react/react-google-map-api-3/)
  - [Google Map API #4 - Polygon(PolygonF), 다각형 그리기](https://sunmerrr.github.io/react/react-google-map-api-4/)
  
---


## react에서 google map API를 이용하여 내 사이트에 지도 심어주기
  - 사용 API [`react-google-map/api`](https://www.npmjs.com/package/@react-google-maps/api)
  - react 팀 프로젝트에서 사용한 google map API 연동 실패와 성공에 대한 기록
  - 배운점
    - 급하더라도 공식문서를 샅샅히 보자. 
    - 대부분 공식문서에 답이 다 나와있다.

### 성공 예시
  - 내 생각에는 `/* global google */` 이것 때문에 전에 시도했던 코드들이 실패한것은 아닐까 싶다.

  1.  ```jsx
      /* global google */

      import React, { useState } from 'react';
      import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
      import styled from 'styled-components';

      const mapStyle = {
        width: '100vw',
        height: '100vh',
      };

      const Map = props => {
        const { isLoaded } = useJsApiLoader({
          id: 'google-map-script',
          googleMapsApiKey: 'AIzaSyBnBcEFs_o9xPHgartVyWKBkhsM9-ztLYc',
        });

        const [map, setMap] = useState(null);

        const onLoad = React.useCallback(function callback(map) {
          const bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(40.712216, -74.22655),
            new google.maps.LatLng(40.74, -74.18)
          );
          map.fitBounds(bounds);
          setMap(map);
        }, []);

        const onUnmount = React.useCallback(function callback(map) {
          setMap(null);
        }, []);

        return isLoaded ? (
          <GoogleMap
            mapStyle={mapStyle}
            defaultZoom={12}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {locations.map(item => {
              return <Marker key={item.name} position={item.location} />;
            })}
          </GoogleMap>
        ) : (
          <></>
        );
      };

      export default Map;

      const Some = styled.div`
        width: 800px;
        height: 700px;
      `;
      ```
      - [참고 문서](https://www.npmjs.com/package/@react-google-maps/api)(역시 공식문서가 짱이다)

  - 출력된 내용!
    ![image](https://user-images.githubusercontent.com/65106740/159124942-09eb94ab-76a0-4825-a01e-05303315e56b.png)
    - 프로젝트 인 airbnb 사이트의 출력 페이지


### 실패모음.zip
  - 왜 실패했는지 원인을 찾기엔 시간이 없었다는 핑계를 대본다.

  1.  ```jsx
      import React from 'react';
      import { compose, withProps } from 'recompose';
      import {
        withScriptjs,
        withGoogleMap,
        GoogleMap,
        Marker,
      } from 'react-google-maps';

      const MapComponent = compose(
        withProps({
          googleMapURL:
            'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `400px` }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs(
          withGoogleMap(props => (
            <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
              {props.isMarkerShown && (
                <Marker position={{ lat: -34.397, lng: 150.644 }} />
              )}
            </GoogleMap>
          ))
        )
      );

      <MapComponent isMarkerShown />;
      ```
      - [참고 블로그](https://tomchentw.github.io/react-google-maps/#usage--configuration)
      - 새롭게 함수형 컴포넌트로 프로젝트를 진행중이지만 위 블로그는 react class형 컴포넌트로 google map API 연동을 진행함. 이게 정확한 이유가 될수는 없었지만 구동이 되지 않았음..ㅠ
      <br>

  2.  ```jsx
      const mapStyle = {
        width: '400px',
        height: '100vh',
      };


      const Map = () => {
        return (
          <LoadScript
            style={style}
            googleMapsApiKey="AIzaSyBnBcEFs_o9xPHgartVyWKBkhsM9-ztLYc"
          >
            <GoogleMap
              mapStyle={mapStyle}
              defaultZoom={8}
              defaultCenter={{ lat: -34.397, lng: 150.644 }}
            />
            {locations.map(item => {
              return <Marker key={item.name} position={item.location} />;
            })}
            <Some> 아무거나</Some>
          </LoadScript>
        );
      };
      ```
      - [참고 블로그](https://medium.com/@allynak/how-to-use-google-map-api-in-react-app-edb59f64ac9d)



<details><summary>임의로 사용한 Mock Data</summary>

  <pre>
    <code>
    const locations = [
      {
        name: 'Location 1',
        location: {
          lat: 41.3954,
          lng: 2.162,
        },
      },
      {
        name: 'Location 2',
        location: {
          lat: 41.3917,
          lng: 2.1649,
        },
      },
      {
        name: 'Location 3',
        location: {
          lat: 41.3773,
          lng: 2.1585,
        },
      },
      {
        name: 'Location 4',
        location: {
          lat: 41.3797,
          lng: 2.1682,
        },
      },
      {
        name: 'Location 5',
        location: {
          lat: 41.4055,
          lng: 2.1915,
        },
      },
    ];
    </code>
  </pre>

</details>