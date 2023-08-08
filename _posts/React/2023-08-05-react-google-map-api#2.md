---
title: "Google Maps API - map instance"
excerpt: "map instance 설명"

categories:
  - React
tags:
  - [react, api, library, google-map, react-google-map/api, react-google-map]

toc: true
toc_sticky: true
 
date: 2023-07-29
last_modified_at: 2023-08-05
---

## 구글 지도 API map instance 알아보기
#### 센터 지정 및 정보 가져오기
  - 지도 로드 시 첫 화면으로 보여줄 위치로 센터로 지정해준다. 
  - 센터 지정

    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.setCenter({ lat: 37.5511694, lng: 126.9882266 })
      }}
    />
    ```
  - 센터 정보 가져오기
    ```jsx
    ...
    onLoad={( map ) => {
      map.getCenter({ lat: 37.5511694, lng: 126.9882266 })
    }}
    ...
    ```

#### 지도 타입 지정 및 정보 가져오기
  - 지도 로드 시 보여줄 지도 타입을 지정해준다.
  - 타입은 총 `hybrid`, `loadmap`, `satellite`, `terrain`으로 구성되어있다.
    - `satellite`: 위성 지도 출력
    - `hybrid`: 위성 지도 위에 라벨 함께 출력
    - `loadmap`: 일반 거리 지도 출력
    - `terrain`: 일반 거리 지도 위에 물리적인 지형지물 함께 출력 

```jsx
const updaterMap = {
  extraMapTypes(map: google.maps.Map, extra: google.maps.MapType[]): void {
    extra.forEach(function forEachExtra(it, i) {
      map.mapTypes.set(String(i), it)
    })
  },
  center(map: google.maps.Map, center: google.maps.LatLng | google.maps.LatLngLiteral): void {
    map.setCenter(center)
  },
  clickableIcons(map: google.maps.Map, clickable: boolean): void {
    map.setClickableIcons(clickable)
  },
  heading(map: google.maps.Map, heading: number): void {
    map.setHeading(heading)
  },
  mapTypeId(map: google.maps.Map, mapTypeId: string): void {
    map.setMapTypeId(mapTypeId)
  },
  options(map: google.maps.Map, options: google.maps.MapOptions): void {
    map.setOptions(options)
  },
  streetView(map: google.maps.Map, streetView: google.maps.StreetViewPanorama): void {
    map.setStreetView(streetView)
  },
  tilt(map: google.maps.Map, tilt: number): void {
    map.setTilt(tilt)
  },
  zoom(map: google.maps.Map, zoom: number): void {
    map.setZoom(zoom)
  },
}
```


#### 참고
- [react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api?activeTab=readme)