---
title: "구글 맵 API 사용기 1"
excerpt: "라이브러리 react-google-map/api을 사용한 구글 맵 api 연동"

categories:
  - React
tags:
  - [react, api, library, google-map]

toc: true
toc_sticky: true
 
date: 2022-03-19
last_modified_at: 2022-03-19
---

## 구글 맵 API를 이용하여 내 사이트에 지도를 심어주자
  - 사용 API [`react-google-map/api`](https://www.npmjs.com/package/@react-google-maps/api)
  - 2주 팀 프로젝트로 써본 라이브러리의 실패와 성공에 대한 기록

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
      - 새롭게 함수형 컴포넌트로 프로젝트를 진행중이지만 위 블로그는 class형 컴포넌트를 사용해야 함. 이게 정확한 이유가 될수는 없었지만 구동이 되지 않았음..ㅠ
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

### 성공하긴 했다.
  - 내 생각에는 `/* global google */` 이것 때문에 위에 코드들도 안된건 아닐까 싶다

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
            {/* {props.isMarkerShown && (
              <Marker position={{ lat: -34.397, lng: 150.644 }} />
            )} */}

            {locations.map(item => {
              return <Marker key={item.name} position={item.location} />;
            })}
            <Some> 아무거나</Some>
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


