---
title: "리액트의 컴포넌트와 state"
excerpt: "리액트를 다루는 기술 스터디 #2-2 - 컴포넌트"

categories:
  - React
tags:
  - [react, javascript, library, component]

toc: true
toc_sticky: true
 
date: 2023-04-14
last_modified_at: 2023-04-14
---

### 리액트 state의 class형 컴포넌트 vs function형 컴포넌트
- class형 컴포넌트와 function형 컴포넌트를 생성하며 차이점을 보려고 한다.

#### state
- 리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미
- 컴포넌트 내부에서 관리해줘야 하는 값이며, 컴포넌트 내부 또는 자식 컴포넌트에서 업데이트 해줌
- ##### state 사용 예시
  - class형 컴포넌트
    ```jsx
    import { Component } from 'react';

    export class ClassComponentCounter extends Component {
      // 컴포넌트에 state를 설정할때 constructor에 메서드를 작성하여 설정해야 함
      constructor(props) {
        // super() 함수를 통해서 현재 컴포넌트가 상속받고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출해줌
        super(props);
        // 객체 형식으로 state의 초기값 설정
        this.state = {
          number: 0,
          fixedNumber: 2,
        };
      }

      render() {
        const { number, fixedNumber } = this.state; // state는 this.state로 조회 가능
        return (
          <div>
            <h1>Class Component Example</h1>
            <h1>{number}</h1>
            <button
              // 버튼 클릭시 일어날 이벤트를 설정해줌
              onClick={() => {
                // this.setState를 통해서 state값을 변경 및 갱신 가능
                // setState 안에서 갱신할 state값만 넣어서 갱신 가능
                this.setState(
                  { number: number + 1 },
                  // ㄴ state 객체 중에서 number 값만 갱신되고 fiexdNumber값은 변화하지 않음
                );
              }}
            >
              +1
            </button>
          </div>
        );
      }
    }
    ```

    - class 컴포넌트의 경우 constructor를 사용하지 않고 state를 선언해 줄 수 있다.
      ```jsx
      import { Component } from 'react';

      export class ClassComponentCounter extends Component {
        state = {
          number: 0,
          fixedNumber: 2,
        };

        render() {
          const { number, fixedNumber } = this.state; // state는 this.state로 조회 가능
          return (...);
        }
      }
      ```

  - function형 컴포넌트
    ```jsx
    import React, { useState } from 'react';

    export const FunctionComponentCouter = () => {
      // useState에서 반환하는 state 변수와 변수를 갱신하는 함수를 구조분해 할당 함
      // 사용 예시: [{state 변수}, {state 변수를 갱신하는 함수}] = useState({state 초기값})
      const [number, setNumber] = useState(0);
      // ㄴ 변수 이름은 number이며, setNumber 함수를 통해서 number변수를 업데이트 해줌, 초기값은 0임
      const [fixedNumber] = useState(2);
      // ㄴ 변수 이름은 fixedNumber이며, 갱신하지 않을 값이라서 업데이트 함수를 할당하지 않음, 초기값은 2임

      return (
        <div>
          <h1>Function Component Example</h1>
          <h1>{number}</h1>
          <h2>바뀌지 않는 값: {fixedNumber}</h2>
          // setNumber 함수를 통해서 number 변수 업데이트
          <button onClick={() => setNumber(number + 1)}>+1</button>
        </div>
      );
    };
    ```

  - 결과 화면은 같으며 잘 작동함
    ![state example](https://user-images.githubusercontent.com/65106740/232285943-1784f939-8738-48fa-8d54-10547dfddacc.gif)


- ##### prevState를 사용하여 state 갱신하기
  - class형 컴포넌트
    ```jsx
    (...)
    render() {
      state = {
        ...
        plusPrevNumber: 0,
      };

      (...)
      <h1>plusPrevNumber: {plusPrevNumber}</h1>
      <button
        onClick={() => {
          // 객체 대신에 함수인자를 전달하여 클릭 이벤트를 설정할 수 있음
          this.setState((prevState) => ({ plusPrevNumber: prevState.plusPrevNumber + 1 }));
        }}
      >
        plus using previous number +1
      </button>
      (...)
    }
    ```
  - function형 컴포넌트
    ```jsx
    (...)
    const [plusPrevNumber, setPlusPrevNumber] = useState(0);

    return (
      (...)
      <h1>plusPrevNumber: {plusPrevNumber}</h1>
      <button
        onClick={() => {
          setPlusPrevNumber((prev) => prev + 1);
        }}
      >
        plus using previous number +1
      </button>
      (...)
    );
    ```
  - 기존에 작성했던 state와 똑같이 동작하는 것을 볼 수 있다.
    ![화면-기록-2023-04-16-오후-5 28 13](https://user-images.githubusercontent.com/65106740/232286654-cba72a16-b96c-429e-8354-fdf48e01e371.gif)


----

- ##### function 컴포넌트에서 여러 state값 갱신하기
  - class형 컴포넌트에서는 여러 state값 갱신이 어렵지 않았다.
    ```jsx
    import { useState } from 'react';

    export const FunctionComponentSayHi = () => {
      const [message, setMessage] = useState(''); 
      const [color, setColor] = useState('black');

      return (
        <div>
          <hr />
          <h1 style={{ color }}>{message}</h1>
          <button
            onClick={() => {
              setMessage('Hi there!');
            }}
          >
            입장
          </button>
          <button
            onClick={() => {
              setMessage('Bye Bye');
            }}
          >
            퇴장
          </button>
          <h2>인사 메세지 컬러를 바꿉니다.</h2>
          <button style={{ color: 'green' }} onClick={() => setColor('green')}>
            green
          </button>
          <button style={{ color: 'blue' }} onClick={() => setColor('blue')}>
            blue
          </button>
          <button style={{ color: 'black' }} onClick={() => setColor('black')}>
            black
          </button>
        </div>
      );
    };
    ```





--- 


    ```jsx
    import { Component } from 'react';

    export class ClassComponentCounter extends Component {
      // 컴포넌트에 state를 설정할때 constructor에 메서드를 작성하여 설정해야 함
      constructor(props) {
        // super() 함수를 통해서 현재 컴포넌트가 상속받고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출해줌
        super(props);
        // 객체 형식으로 state의 초기값 설정
        this.state = {
          number: 0,
          fixedNumber: 2,
        };
      }

      render() {
        const { number, fixedNumber, plusPrevNumber } = this.state; // state는 this.state로 조회 가능
        return (
          <div>
            <h1>Class Component Example</h1>
            <h1>{number}</h1>
            <h2>바뀌지 않는 값: {fixedNumber}</h2>
            <button
              // 버튼 클릭시 일어날 이벤트를 설정해줌
              onClick={() => {
                // this.setState를 통해서 state값을 변경 가능
                // 인자로 전달된 객체 안에 들어있는 값만 바꿔 줌
                this.setState(
                  { number: number + 1 },
                  // setState의 두번째 파라미터로 콜백함수를 등록하여 setState작업이 끝난 후의 동작을 처리할 수 있음
                  () => {
                    console.log('이런식으로 setState 호출 이후 특정 작업 실행');
                    console.log(this.state);
                  },
                );
              }}
            >
              +1
            </button>

            <h1>{plusPrevNumber}</h1>
            <button
              onClick={() => {
                // 객체 대신에 함수인자를 전달하여 클릭 이벤트를 설정할 수 있음
                this.setState((prevState) => ({ plusPrevNumber: prevState.plusPrevNumber + 1 }));
              }}
            >
              plus using previous number +1
            </button>
          </div>
        );
      }
    }
    ```


- ##### 여러 state 핸들링