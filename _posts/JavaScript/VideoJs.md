---
title: "react video.js 시작하기"
excerpt: "react에서 동영상 재생 페이지 만들기"

categories:
  - React
tags:
  - [react, videojs, video, javascript]

toc: true
toc_sticky: true
 
date: 2022-05-15
last_modified_at: 2022-05-01
---

## react에서 video.js를 사용하여 비디오 동영상 재생 페이지를 만들어보자

*api가 모두 셋팅되어있다는 조건 하에 작성했다.*

### 1. video 띄우기
  - video.js를 사용하여 동영상 재생 페이지를 만들려면 두개의 컴포넌트가 필요하다.
    1) 플레이어 환경을 설정하는 부모 컴포넌트
    2) 플레이어를 재생하는 자식 컴포넌트

    ##### 1) 플레이어 환경 설정
    - 말 그래도 플레이어를 띄워줄 화면이다.
    - 여기서 플레이어의 조건, 환경 등을 설정해 줄 수 있다.
    - 공식문서에 나와있는 그대로만 따라해도 쉽게 적용 시킬 수 있다!
      ```jsx
      import React, { useRef } from 'react';
      import Player from './Player';

      const VideoPlayerPage = () => {
        const playerRef = useRef(null);

        const videoJsOptions = {
          // 동영상 재생 시 넣어줄 조건을 여기에 작성한다.
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          sources: [{
            src: '/path/to/video.mp4',
            type: 'video/mp4'
          }]
        };

        const handlePlayerReady = (player) => {
          playerRef.current = player;

          // 동영상 재생 중 이벤트를 조작하려면 여기에 작성한다.
          player.on('waiting', () => {
            videojs.log('player is waiting');
          });

          player.on('dispose', () => {
            videojs.log('player will dispose');
          });
        };

        return (
          <div>
            <Player options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        );
      }

      ```
      
    ##### 2) 플레이어 재생 화면
    - 여기는 별로 건드릴만한게 없다.
      ```jsx
      import React, { useEffect, useRef } from 'react';
      import videojs from 'video.js';
      import 'video.js/dist/video-js.css';

      const Player = (props) => {
        const videoRef = useRef(null);
        const playerRef = useRef(null);
        const {options, onReady} = props;

        useEffect(() => {
          // 플레이어 초기화는 한번만.
          if (!playerRef.current) {
            const videoElement = videoRef.current;

            if (!videoElement) return;

            const player = playerRef.current = videojs(videoElement, options, () => {
              videojs.log('player is ready');
              onReady && onReady(player);
            });

        // Dispose the Video.js player when the functional component unmounts
        useEffect(() => {
          const player = playerRef.current;

          return () => {
            if (player) {
              player.dispose();
              playerRef.current = null;
            }
          };
        }, [playerRef]);

        return (
          <div data-vjs-player>
            <video ref={videoRef} className='video-js vjs-big-play-centered' />
          </div>
        );
      }

      export default Player;
      ```
    
### 2. theme 적용하기
### 3. 단축키 설정하기
### 4. play 시간 기록하기

[react video.js 공식문서](https://videojs.com/guides/react/)