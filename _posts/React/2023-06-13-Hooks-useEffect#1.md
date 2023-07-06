---
title: "함수 컴포넌트의 Hooks - useEffect 톺아보기 #1"
excerpt: "리액트를 다루는 기술 스터디 #7-2 - Hooks: useEffect"

categories:
  - React
tags:
  - [react, javascript, library, function component, hooks, useEffect]

toc: true
toc_sticky: true
 
date: 2023-05-10
last_modified_at: 2023-06-13
---

#### useEffect
- 외부 시스템과 동기적으로 작동할 수 있도록 해줌 
- 클래스형에서 componentDidMount와 componentDidUpdate를 합친 형태
- 컴포넌트가 돔에 모두 추가 된 이후에 실행되며, dependencies의 변화에 따라서 매 리렌더링 마다 clean up 함수를 먼저 실행 하여 오래된 값을 없애고 새로운 값으로 setup 함수를 실행 함
- 기본 형태
  ```js
  useEffect(() => {
    {setup}
    return {clean up}
  }, [dependencies])
  ```
  - setup    
    렌더링 이후에 실행할 내용을 작성
  - clean up(뒷정리)     
    필요 시 언마운트 또는 업데이트 되기 직전에 실행할 내용을 return 뒤에 함수로 작성
  - dependencies(의존 배열)    
    첫 렌더링 시에만 실행되게 하고 싶다면 빈 배열로 둠
    특정 값이 변할때마다 실행하고 싶다면 의존 배열에 해당 특정 값을 넣음
    배열 이라서 특정 값이 여러개여도 상관 없음

##### 사용
- 외부 API 연결을 위해
  - 라이브 서버, 브라우저 이벤트 리스너, 애니메이션 트리거, 모달 컨트롤, 컨디션에 따른 UI 변경 등
  - 예시 1 - 브라우저 이벤트 리스너    
    포인터를 따라다니는 이쁜 원 그리기
    ```jsx
    import { useState, useEffect } from 'react';

    const Effect = () => {
      const [position, setPosition] = useState({ x: 0, y: 0 });

      useEffect(() => {
        const handlemove = (e) => {
          setPosition({ x: e.clientX, y: e.clientY });
          console.log('e.clientX: ', e.clientX, 'e.clientY: ', e.clientY);
        };

        window.addEventListener('pointermove', handlemove);
        return () => {
          window.removeEventListener('pointermove', handlemove);
        };
      }, []);

      return (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'pink',
            borderRadius: '50%',
            opacity: 0.6,
            transform: `translate(${position.x}px, ${position.y}px)`,
            pointerEvents: 'none',
            left: '-20',
            top: '-20',
            width: 40,
            height: 40,
          }}
        ></div>
      );
    };

    export default Effect;
    ```
    ![Listening to a global event](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/1eeb9070-ba7b-4622-bb9a-b5b2938f8d4a)

  - 예시 2 - 모달 제어
    ```jsx
    // App.js
    import { useState } from 'react';
    import ModalDialog from './ModalDialog';

    const Effect = () => {
      const [show, setShow] = useState(false);

      return (
        <div>
          <button
            onClick={() => {
              setShow(true);
            }}
          >
            Open dialog
          </button>
          <ModalDialog isOpen={show}>
            Hi There!
            <br />
            <button
              onClick={() => {
                setShow(false);
              }}
            >
              Close dialog
            </button>
          </ModalDialog>
        </div>
      );
    };

    export default Effect;
    ```

    ```jsx
    // ModalDialog.js
    import { useEffect, useRef } from 'react';

    const ModalDialog = ({ isOpen, children }) => {
      const ref = useRef();

      useEffect(() => {
        if (!isOpen) return;

        console.log('dialog is opened');

        const dialog = ref.current;
        dialog.showModal();

        return () => {
          dialog.close();
        };
      }, [isOpen]);

      return <dialog ref={ref}>{children}</dialog>;
    };

    export default ModalDialog;
    ```
    ![Controlling a modal dialog](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/3ec54e04-6411-45a0-9c93-5dea410c742f)

- Effect를 커스텀 훅으로 감쌈
  - useEffect 속 구현 내용을 따로 커스텀 훅으로 빼서 사용하는 개념
  - 위 예시 1을 수정해보면 아래와 같아짐
    ```jsx
    // app.js
    import { useState } from 'react';
    import { useEventListener } from './useEventListener';

    const Effect = () => {
      const [position, setPosition] = useState({ x: 0, y: 0 });

      useEventListener('pointermove', (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        console.log('e.clientX: ', e.clientX, 'e.clientY: ', e.clientY);
      });

      return (
        <div
          style={{
            ...
          }}
        ></div>
      );
    };

    export default Effect;
    ```

    ```jsx
    // useEventListener.js
    import { useEffect } from 'react';

    export const useEventListener = (eventType, listener) => {
      useEffect(() => {
        window.addEventListener(eventType, listener);
        return () => {
          window.removeEventListener(eventType, listener);
        };
      }, [eventType, listener]);
    };
    ```

- 리액트에 포함되지 않은 프로그램을 제어할 때
  - 구글 맵 api 이용하기 - 프로젝트에 사용했던 코드라 지저분...
    ```jsx
    import React, { useState, useEffect, useRef } from 'react';
    import { Loader } from '@googlemaps/js-api-loader';
    import styled from 'styled-components';

    const Map = () => {
      const [locations, setLocations] = useState([]);

      const loader = useRef(null);
      const map = useRef(null);
      const marker = useRef(null);
      const infoWindow = useRef(null);
      const mapBoxRef = useRef();

      const mapOptions = {
        center: { lat: 41.3954, lng: 2.162 },
        zoom: 12,
      };

      useEffect(() => {
        loader.current = new Loader({
          apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
          version: 'weekly',
        });

        fetch('/data/Locations.json')
          .then(res => res.json())
          .then(data => setLocations(data));

        loader.current.load().then(() => {
          map.current = new google.maps.Map(mapBoxRef.current, mapOptions);
          infoWindow.current = new google.maps.InfoWindow();
          marker.current = locations.map(item => {
            const { lat, lng, name } = item.location;
            return new google.maps.Marker({
              position: { lat: lat, lng: lng },
              map: map.current,
              title: `${name}`,
              label: `${name}`,
              optimized: false,
            });
          });
          return marker;
        });

        const script = document.createElement('script');
        script.src = { loader };
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }, []);

      return (
        <MapLoad>
          <Box
            ref={mapBoxRef}
            id="map"
            onClick={() => {
              infoWindow.current.close();
              infoWindow.current.setContent(
                marker.current.map(marker && (marker => marker.getTitle()))
              );
              infoWindow.current.open(
                marker.current.map(marker && (marker => marker.getMap())),
                marker.current
              );
            }}
          />
        </MapLoad>
      );
    };

    export default Map;
    ```

- 데이터를 가져올 때
  - 내 코드가 아니라서 이미지로 가져옴
    ![fetch ingdata with Effects](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/32f45686-2d7f-43c4-91d2-6b081c08ee7a)

- 의존성 배열에 들어가는 의존 상태가 명확하게 동적일 때     
  [관련된 eslint 참고 문서](https://github.com/facebook/react/issues/14920)
  - 의존성 배열은 내가 선택해서 넣는 것이 아니라 Effect에서 사용되는 동적인 값이면 반드시 의존성 배열에 넣어주어야 함
    ```jsx
    useEffect(() => {
      if (!isOpen) return;

      console.log('dialog is opened');

      const dialog = ref.current;
      dialog.showModal();

      return () => {
        dialog.close();
      };
    }, [isOpen]);
    ```
    - 위 예제에서 dependencies에 isOpen이 없으면 isOpen의 값의 변화와 상관 없이 첫 렌더링에서만 useEffect가 실행되게 되므로 기대한 동작이 나오지 않게 됨
- 기존의 상태를 베이스로 하여 상태를 업데이트 할 때
  ```jsx
  import { useState, useEffect } from 'react';

  const Effect = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const invervalId = setInterval(() => {
        setCount((prev) => prev + 1); // prev 라는 기존 상태 값을 통해서 count 값을 업데이트 해준다
      }, 500);
      return () => clearInterval(invervalId);
    }, []);

    return (
      <div>
        {count}
      </div>
    );
  };

  export default Effect;
  ```

    ![Updating state based on previous state from an Effect](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/d247eaa9-8307-43d9-af89-35b6c15c744c)
    - 만약 count를 기존 값을 통해서 없데이트 해주지 않는다면 원하는대로 동작하지 않는다.
      ```jsx
      import { useState, useEffect } from 'react';

      const Effect = () => {
        const [count, setCount] = useState(0);

        useEffect(() => {
          const invervalId = setInterval(() => {
            setCount(count + 1);
            console.log(count);
          }, 500);
          return () => clearInterval(invervalId);
        }, []);

        return (
          <div>
            {count}
          </div>
        );
      };

      export default Effect;
      ```

      ![Updating state based on previous state from an Effect2](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/f4f9cf6a-67b7-4e9b-8d40-dbb5432b77b8)

- 읜존성 배열에서 필요하지 않은 객체/함수를 지울 때  
  - 객체(또는 함수)를 읜존성 배열에 전달하는 것보다는 해당 객체(또는 함수)를 Effect 안에서 선언해주는 것이 더 좋음 
  - 객체
    ```jsx
    const options = { // 컴포넌트가 리렌더링 될때마다 options는 새로 생성 된다
      serverUrl,
      roomId,
    };

    useEffect(() => {
      const connection = createConnection(options);
      connection.connect();
      return () => {
        connection.disconnect();
      };
    }, [options]); // 여기서 dependencies에 넣어준 options는 매 리렌더링 시 다른 값으로 적용 될 수 있다
    ```
    - 위와 같이 쓸 경우 다른 state의 변화로 인한 리렌더링에서도 options가 새로 생성되며 useEffect가 작동 하게 됨 -> [상세 내용](https://react.dev/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)
    - options는 Effect 내부로 옮겨주어서 에러를 줄 수 있는 상황을 줄일 수 있음
    - 여기서 우리에게 실제적으로 필요한 dependencies는 부모로 부터 내려받는 roomId 임
      ```jsx
      useEffect(() => {
        const options = {
          serverUrl,
          roomId,
        };

        const connection = createConnection(options);
        connection.connect();
        return () => {
          connection.disconnect();
        };
      }, [roomId]);
      ```

      ![Removing unnecessary object dependencies](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/fd464d7d-55e4-40d6-97c3-64083af6c7d9)

      [전체 예시 코드](https://codesandbox.io/s/effect-removing-unnecessary-object-dependencies-lq8w22)

  - 함수(객체 예시와 동일하여 수정한 결과물만 써둠)
    ```jsx
      useEffect(() => {
        const options = () => {
          return {
            serverUrl,
            roomId,
          };
        };

        const connection = createConnection(options);
        connection.connect();
        return () => {
          connection.disconnect();
        };
      }, [roomId]);
      ```

- Effect로 부터 최신 props와 state를 읽어올때
  - 보통은 우리가 Effect한테 원하는 것은 dependencies에 들어있는 값이 변경될 때마다 Effect를 동작 시키는 것임. 하지만, 우리는 종종 Effect에게 '동작'을 원하는 것이 아니라 최신 데이터만 원할때가 있음. 이럴때는 Evnets와 Effects를 분리시켜야 하는데, 리액트에서 useEffectEvent Hook을 통해서 가능하게 함 [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)

- 서버와 클라이언트 측에 다른 컨텐츠를 보여야 할때
  - 보통은 서버와 클라이언트의 데이터는 일치하지만 로컬 스토리지에서 데이터를 읽어오는 경우에는 달라야 할 수도 있음
    ```jsx
    function MyComponent() {
      const [didMount, setDidMount] = useState(false);

      useEffect(() => {
        setDidMount(true)
      }, [])

      if (didMount) {
        // return client only JSX
      } else {
        // return initial JSX
      }
    }
    ```


