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

*api 셋팅은 다루지 않는다.*

### 3. theme 적용하기
  - theme 적용하는데는 3가지 방법으로 해볼 수 있다.
  - 테마 데모는 [video.js 공식문서](https://videojs.com)에서 확인해볼 수 있으며 안내되어있는 대로 따라하면 된다.
    ###### 1) link tags 사용하기
      ```js
      <link href="https://unpkg.com/@videojs/themes@1/dist/sea/index.css" rel="stylesheet">
      ```
    ###### 2) theme install
      ```js
      npm install --save video.js @videojs/themes
      ``` 

      ```tsx
      // app.tsx

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
    ```tsx
    // app.tsx

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

### 4. 단축키(hotkey) 설정하기
  - 단축키는 `videojs-hotkeys`를 사용
    ###### 적용 예시
    ```tsx
    // app.tsx
    
    const handlePlayerReady = (player) => {
      player.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        enableModifiersForNumbers: false
      });
    }
    ```

    ###### custom hotkey
    ```tsx
    // app.tsx
    
    const handlePlayerReady = (player) => {
      player.hotkeys({
        volumeStep: 0.1,
        
        customKeys: {
          playKey: {
            // 이벤트를 넣어줄 키를 지정한다.
            key: function(event) {
              return (event.which === 32);
            },
            // 해당 키를 눌렀을때 일어날 이벤트를 정해준다.
            handler: function(player, options, event) {
              handler: function(player, options, event) {
              if (options.enableMute) {
                player.muted(!player.muted());
              }
            }
            }
          },
          shiftKey: { 
            // 원하는 키 조합을 넣어준다. 예시) 아무 키 조합
            key: function(event) { 
              return (event.shiftKey && event.which === 68);
            },
            // 해당 키 조합을 눌렀을때 일어날 이벤트를 정해준다.
            handler: function(player, options, event) { 
              let playSpeed;
              if (player.tech_ && player.tech_.featuresPlaybackRate) {
                playSpeed = player.options_.playbackRates.indexOf(player.playbackRate());
              }
              if (playSpeed < player.options_.playbackRates.length - 1) {
                player.playbackRate(player.options_.playbackRates[playSpeed + 1]);
              }
            }
          }
        }
      });
    }
    ```
    * [참고: videojs-hotkeys example](https://github.com/ctd1500/videojs-hotkeys/blob/master/example.html)

### 5. play 시간 기록하기
  - 다양한 이유로 사용자가 영상을 얼마나 시청했는지 기록한다.
  - 플레이중에 일어나는 이벤트는 `player.on`함수 안에 작성한다.
    ###### 적용 예시
    ```tsx
    // app.tsx

    player.on("play", () => {
      // 5초마다 데이터 업데이트
      playingInterval = setInterval(function () {
        const data = {
          time: player.currentTime(),
          rate: player.playbackRate(),
          // ...그 외 필요한 정보
        }

        fetch(url, {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(data),
        });
      }, 5000);
    });
    ```


[react video.js 공식문서](https://videojs.com/guides/react/)
[video.js theme libraryhttps://github.com/videojs/themes](https://github.com/videojs/themes)