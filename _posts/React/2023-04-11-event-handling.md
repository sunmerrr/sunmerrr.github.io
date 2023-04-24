---
title: "리액트 이벤트 핸들링"
excerpt: "리액트를 다루는 기술 스터디 #3 - 이벤트 핸들링"

categories:
  - React
tags:
  - [react, javascript, library, event, event handling]

toc: true
toc_sticky: true
 
date: 2023-04-14
last_modified_at: 2023-04-14
---

#### 이벤트를 사용할 때 주의 사항
1. 이름은 카멜 표기법으로 작성
1. 이벤트 실행 코드는 함수 형태의 값으로 전달
1. DOM 요소에만 이벤트 설정
    - component에 이벤트를 설정해 줄 수 없음
      - event가 아니라 props로 인식해서 자식에게 전달만 해줄 뿐 아무런 이벤트를 실행하지 않음
      - 대신 자식 컴포넌트가 event함수를 props로 전달받아서 자식 DOM에 설정해줄 수 있음

### 리액트 class형 컴포넌트와 function형 컴포넌트의 이벤트 핸들링
- class 컴포넌트와 function형 컴포넌트 안에서 이벤트를 생성하여 차이점을 본다.

#### class 컴포넌트 이벤트 핸들링
- 기존에 이벤트 핸들링 함수를 constructor안에서 작성해야 했음
  ```jsx
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  ```
  - 여기서 bind를 통해서 this로 묶어주는 이유는 저 상태로 그냥 두면 this가 class 내부의 this로 인식하지 못하기 때문이라고 읽은 것 같음.

- 화살표 함수로 대체 가능
  ```jsx
  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleClick = () => {
    alert(this.state.message);
    this.setState({ message: '' });
  };
  ```

- 다룰 state가 한개인 경우
  ```jsx
  import { Component } from 'react';

  export class ClassEvent extends Component {
    // 사용할 state 선언
    state = {
      message: '',
    };

    // event handler를 화살표 함수형으로 정의
    handleChange = (e) => {
      this.setState({ message: e.target.value });
    };

    handleClick = () => {
      alert(this.state.message);
      this.setState({ message: '' });
    };

    render() {
      return (
        <div>
          <h2>클래스형 이벤트</h2>
          <input
            type="text"
            name="message"
            placeholder="write something here"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>확인</button>
        </div>
      );
    }
  }

  export default ClassEvent;
  ```

- state가 두개 이상인 경우
  ```jsx
  import { Component } from 'react';

  export class ClassEvent extends Component {
    state = {
      message: '',
      userName: '',
    };

    handleChange = (e) => {
      // setState 내부의 key값을 input에 정의해준 name으로 활용
      // 이렇게하면 같은 event handler로 두 개의 input의 이벤트를 핸들링 할 수 있음
      this.setState({ [e.target.name]: e.target.value });
    };

    handleClick = () => {
      alert('멧돼지: ' + this.state.message + ' 이름:' + this.state.userName); // 멧돼지 뭐임?
      this.setState({ message: '', userName: '' });
    };

    handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        this.handleClick();
      }
    };

    render() {
      return (
        <div>
          <h2>클래스형 이벤트</h2>
          <input
            type="text"
            name="message" // name을 변경할 state 값과 같도록 해줘야 한다.
            placeholder="write something here"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <input
            type="text"
            name="userName" // name을 변경할 state 값과 같도록 해줘야 한다.
            placeholder="write your name here"
            value={this.state.userName}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <button onClick={this.handleClick}>확인</button>
        </div>
      );
    }
  }

  export default ClassEvent;
  ```

#### function 컴포넌트 이벤트 핸들링
- class형 컴포넌트와 같은 기능을 하는 컴포넌트를 생성
  - state가 한개인 경우
    ```jsx
    import { useState } from 'react';

    const FunctionEvent = () => {
      const [message, setMessage] = useState('');

      const handleChange = (e) => {
        setMessage(e.target.value);
      };

      const handleClick = () => {
        alert(message);
        setMessage('');
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      };

      return (
        <div>
          <h2>함수형 이벤트</h2>
          <input
            type="text"
            name="message"
            placeholder="write something here"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleClick}>확인</button>
        </div>
      );
    };

    export default FunctionEvent;
    ```
    
  - state가 두개인 경우
    - 형태가 class형과 똑같아서 오히려 쉬움
      ```jsx
      import { useState } from 'react';

      const FunctionEvent = () => {
        // state를 한 form에 담아서 handleChange 함수를 재사용 할 수 있게 했다.
        const [form, setForm] = useState({
          message: '',
          userName: '',
        });

        const handleChange = (e) => {
          // 스프레드 문법을 사용해서 기존의 form안에 있는 데이터를 복사한 후 변경되는 데이터만 새롭게 정의해준다.
          setForm({ ...form, [e.target.name]: e.target.value });
        };

        const handleClick = () => {
          alert(form.userName + ': ' + form.message);
          setForm({ message: '', userName: '' });
        };

        const handleKeyDown = (e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        };

        return (
          <div>
            <h2>함수형 이벤트</h2>
            <input
              type="text"
              name="userName"
              placeholder="write down your name here"
              value={form.userName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <input
              type="text"
              name="message"
              placeholder="write something here"
              value={form.message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleClick}>확인</button>
          </div>
        );
      };

      export default FunctionEvent;
      ```

