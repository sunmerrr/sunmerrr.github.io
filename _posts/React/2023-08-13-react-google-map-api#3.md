---
title: "Google Maps API 연동 #3 - 필수 옵션과 props + instance"
excerpt: "map instance 설명"

categories:
  - React
tags:
  - [react, api, library, google-map, react-google-map/api, react-google-map]

toc: true
toc_sticky: true
 
date: 2023-08-05
last_modified_at: 2023-08-13
---

## 구글 지도 필수 옵션
  - `center`: lat, lng 값을 객체로 전달해 주는 것으로 지도 첫 화면을 셋팅 할 수 있다.
  - `zoom`: 0부터 20사이의 숫자로 지정 가능하며, 지도의 확대/축소 수준을 표시한다.
  - 예시
    ```jsx
    <GoogleMap
      mapContainerStyle={ GoogleMapStyle } 
      center={{ lat: 37.5511694, lng: 126.9882266 }}
      zoom={16}
    />
    ```

## 구글 지도 API map props
  - `mapTypeId`: 타입은 총 4가지로 구성되어있으며 loadmap이 기본이다.
    - `loadmap`: 일반 거리 지도 출력
    - `terrain`: 일반 거리 지도 위에 물리적인 지형지물 함께 출력 
    - `satellite`: 위성 지도 출력
    - `hybrid`: 위성 지도 위에 라벨 함께 출력
  - `heading`: 지도가 보여지는 방위를 조절(위성 지도에서 가능하다고 하지만 나는 실패함)
  - `tilt`: 지도가 보여지는 각도를 조절. 특정 zoom 수준에서만 지원되며 0 또는 45만 지원됨(근데 난 왜 안됨?)
  - 예시
    ```jsx
    <GoogleMap
      mapContainerStyle={ GoogleMapStyle } 
      center={{ lat: 37.5511694, lng: 126.9882266 }}
      zoom={16}
      mapTypeId={'satellite'}
      heading={90}
      tilt={45}
    />
    ```

## 구글 지도 API map instance
map instance를 사용해서 지도를 업데이트 해주기 전에 props로 전달하여 설정해 줄 수도 있지만 map instance도 정리해본다

#### center: 센터 지정 및 정보 가져오기
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

#### zoom: 지도 확대/축소 지정 및 정보 가져오기
  - 지도 로드 시 보여줄 지도 타입을 지정해준다.
  - 확대/축소 지정

    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.setZoom(zoom)
        // zoom: number
      }}
    />
    ```


  - 확대/축소 정보 가져오기
  
    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.getZoom()
      }}
    />
    ```

#### mapTypeId: 지도 타입 지정 및 정보 가져오기
  - 지도 로드 시 보여줄 지도 타입을 지정해준다.
  - 타입 지정

    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.setMapTypeId(map type id)
        // map type id: string
      }}
    />
    ```


  - 타입 정보 가져오기
  
    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.getMapTypeId()
      }}
    />
    ```

#### heading: 지도 방위 지정 및 정보 가져오기
  - 방위 지정

    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.setHeading(heading)
        // heading: number
      }}
    />
    ```

  - 방위 정보 가져오기
  
    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.getHeading()
      }}
    />
    ```

#### tilt: 지도 각도 지정 및 정보 가져오기
  - 0 또는 45만 가능하고, 45로 설정 시 해당 이미지를 사용할 수 있을 때만 기울기 각도가 자동으로 45로 전환된다.     
    만약 45에 해당하는 이미지를 사용할 수 없을때는 0으로 전환된다.
  - 각도 지정

    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.setTilt(tilt)
        // tilt: number
      }}
    />
    ```

  - 각도 정보 가져오기
  
    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.getTilt()
        // 옵션 값에서 지정해준 값이 아닌 현재 기울기 각도를 반환
        // tilt 속성은 bind() 하지 말라고 함 [참고](https://developers.google.com/maps/documentation/javascript/reference/map?hl=ko#MapOptions.tilt)
      }}
    />
    ```

#### options: 옵션 지정
  - 지도 인스턴스를 사용하지 않고 options 에 담아서 props로 넣어주 수도 있다.
  - 옵션 지정

    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.setOptions(options)
        // options: [optrions type](https://developers.google.com/maps/documentation/javascript/reference/map?hl=ko#MapOptions)
      }}
    />
    ```

#### clickableIcons: 지도 아이콘 클릭 가능 여부 지정 및 정보 가져오기
  - 아이콘 클릭 가능 여부 지정

    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.setClickableIcons(value)
        // value: boolean
      }}
    />
    ```

  - 아이콘 클릭 가능 여부 정보 가져오기
  
    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.getTilt()
      }}
    />
    ```

#### streetView: 스트릿 뷰 지정 및 정보 가져오기
  - 지도가 지도 외부 파노라마에 바인딩 되도록 해준다고 한다.
  - 스트릿 뷰 지정

    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.setStreetView(panorama)
        // panorama: [스트릿 뷰 파노라마](https://developers.google.com/maps/documentation/javascript/reference/street-view?hl=ko#StreetViewPanorama)
        // null로 설정 시 기본 파노라마 스트릿 뷰가 보여짐
      }}
    />
    ```

  - 스트릿 뷰 정보 가져오기
  
    ```jsx
    <GoogleMap
      id="google-map-test"
      mapContainerStyle={ GoogleMapStyle } 
      onLoad={( map ) => {
        map.getStreetView()
      }}
    />
    ```

#### 참고
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/reference/map?hl=ko)
- [react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api?activeTab=readme)