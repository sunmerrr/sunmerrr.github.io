---
title: "react video.js 테마, 단축키, 플레이 시간"
excerpt: "react에서 video.js를 이용한 플레이어 테마, 단축키, 플레이 시간 기록"

categories:
  - React
tags:
  - [react, videojs, video, javascript]

toc: true
toc_sticky: true
 
date: 2022-05-15
last_modified_at: 2022-07-05
---

## video.js에 테마, 단축키, 플레이 시간 기록을 설정해보자.

*api가 모두 셋팅되어있다는 조건 하에 작성되었다.*

### 3. theme 적용하기
  - theme 적용하는데는 3가지 방법이 있다.
  - 테마 데모는 [video.js 공식문서](https://videojs.com)에서 확인 후 마음에 드는 것으로 사용하면 된다.
    ###### 1) link tags 사용하기
      ```js
      <link href="https://unpkg.com/@videojs/themes@1/dist/sea/index.css" rel="stylesheet">
      ```
    ###### 2) theme install
      ```js
      npm install --save video.js @videojs/themes
      ``` 

      ```ts
      // app.ts

      import '@videojs/themes/dist/sea/index.css';
      ```
      ```tsx
      // player.tsx
      
      export const Player = (props) => {

      // ... 생략

        return (
          <Component data-vjs-player>
            <video ref={videoRef} className="video-js vjs-theme-sea vjs-big-play-centered" />
          </Component>
        );
      };
      ```
    ###### 2) theme download
    ![image](https://user-images.githubusercontent.com/65106740/178009895-177b477b-3b7a-4346-b0b3-3e804352d3b7.png)
    ```ts
    // app.ts

    import '@styles/sea/index.css';
    ```
    ```tsx
    // player.tsx
    
    export const Player = (props) => {

    // ... 생략

      return (
        <Component data-vjs-player>
          <video ref={videoRef} className="video-js vjs-theme-sea vjs-big-play-centered" />
        </Component>
      );
    };
    ```
    - sea theme 적용 영상
      ![image](https://user-images.githubusercontent.com/65106740/178016183-cb7d987b-d077-43bc-9ee4-10b1cf31aa55.gif)

### 4. 단축키 설정하기
  - 

### 5. play 시간 기록하기

[react video.js 공식문서](https://videojs.com/guides/react/)
[video.js theme libraryhttps://github.com/videojs/themes](https://github.com/videojs/themes)