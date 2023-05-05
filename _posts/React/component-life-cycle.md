---
title: "컴포넌트의 라이프사이클 메서드"
excerpt: "리액트를 다루는 기술 스터디 #6 - class형 컴포넌트의 생명 주기와 메서드"

categories:
  - React
tags:
  - [react, javascript, library, class component, life cycle, method]

toc: true
toc_sticky: true
 
date: 2023-04-27
last_modified_at: 2023-04-27
---

### class형 컴포넌트의 라이프사이클에 따른 메서드
- 모든 리액트 컴포넌트는 렌더링되기 전 준비 과정부터 페이지에서 사라질때까지의 생명 주기를 가지고 있음
- 라이프사이클은 마운트, 업데이트 언마운트의 세 가지 카테고리로 나눔
  1. **마운트**: DOM이 생성되고 웹 브라우저상에 나타남
  2. **업데이트**: props, state가 바뀔 때, 부모 컴포넌트가 리렌더링될 때, this.forceUpdate로 강제로 렌더링을 트리거할 때     
    즉, 컴포넌트가 업데이트 될 때
    업데이트 과정에 속한 메서드가 가장 많음
  3. **언마운트**: DOM을 제거하는 과정 
    <small style="text-align: center">
      <img width="1144" alt="image" src="https://user-images.githubusercontent.com/65106740/234823741-3726545f-bff5-450c-9c5d-a89dcc41804b.png" />
      [이미지 출처](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
    </small>

#### 메서드
* ##### render()
  - 메서드 중 유일할 필수 메서드 - 없으면 UI안뜸
  - 리액트 요소를 반환
  - 주의:
    - state 설정 안됨 = 이벤트 설정이 아닌곳에서 setState 사용하면 안됨
    - DOM에 접근하면 안됨 = 브라우저와 직접적으로 상호작용하지 않음
    - 처리: componentDidMount = DOM 정보 가져오기, state 값 변화주기 가능

* ##### construnction()
  - 컴포넌트 생성자 메서드
  - 컴포넌트 만들때 처음으로 실행
  - 초기 state 설정 가능

* ##### getDerivedStateFromProps(props, state) (v16.3 이상)
  - 최초 마운트 시와 갱신 시 render 메서드를 호출하기 직전에 호출됨
  - props로 받아온 값을 state에 동기화시키는 용도

* ##### componentDidMount()
  - 컴포넌트가 화면에 그려진 직후 실행 = 첫 렌더링을 마친 후 실행 = 처음에 render() 함수가 실행된 직후
  - 여기에 외부 라이브러리 연동, 비동기 요청, DOM 속성 변경 등 작업 처리
  - 데이터 구독에 대한 설정을 여기서 함 -> 구독 설정 이후에는 componentWillUnmount()에서 해제 해줘야 한다고 함

* ##### shouldComponentUpdate(nextProps, nextState)
  - 컴포넌트가 리랜더링을 할지 말지를 결정함
  - boolean 값을 반환하는데 false 반환 시 업데이트 과정 종료 됨
  - 최적화 할때 사용하는 메서드(React.memo와 비슷한 역할)

* ##### getSnapshotBeforeUpdate(prevProps, prevState) (v16.3 이상)
  - render에서 만들어진 결과물이 브라우저에 반영되기 직전에 호출
  - 반환되는 값은 componentDidUpdate에 snapshot 값으로 전달
  - 업데이트하기 직전의 값을 참고할 때 활용

* ##### componentDidUpdate(prevProps, prevState, snapshot)
  - 랜더링을 완료한 이후
  - DOM관련 처리를 해도 무방하다 함

* ##### componentWillUnMount()
  - 컴포넌트를 DOM에서 제거할때 실행
  - 여기서 타이머나 구독 해제, 네트워크 요청 취소 등을 진행 함
  - componentDidMount에서 생성한 구독 제거 작업을 여기서 함

* ##### componentDidCatch(error, info) (v16 이상)
  - 렌더링 도중에 에러가 발생했을 때 오류 UI를 보여 줄 수 있게 함
  <!-- TODO: 예제 코드 -->

#### 메서드 테스트
- 앞에서 말한 메서드들이 어떤식으로 동작하는지 보기 위함
- 쬐끔 정신 없음
- 표기     
  -첫 랜더링 순서 표기: (1), (2), ...
  -업데이트 순서 표기: [1], [2], ...
  - 부모 컴포넌트
    ```jsx
    import { Component } from 'react';
    import ComponentLifeCycle from './ComponentLifeCycle';
    import ErrorBoundary from './ErrorBoundary';

    function getRandomColor() {
      // 16777215 값은 hex로 ffffff 값임. 즉, 000000 ~ ffffff 까지 값을 반환하게 됨 (182p)
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    export class LifeCycleContainer extends Component {
      state = {
        color: '#000000',
      };

      handleClick = () => {
        this.setState({
          color: getRandomColor(),
        });
      };

      render() {
        return (
          <div>
            <button onClick={this.handleClick}>랜덤 색상</button>
            <ErrorBoundary>
              <ComponentLifeCycle color={this.state.color} />
            </ErrorBoundary>
          </div>
        );
      }
    }

    export default LifeCycleContainer;

    ```
  - 자식 컴포넌트
    ```jsx
    import { Component } from 'react';

    export class ComponentLifeCycle extends Component {
      state = {
        number: 0,
        color: null,
      };

      myRef = null;

      constructor(props) {  // (1)
        super(props);
        console.log('constructor');
      }

      static getDerivedStateFromProps(nextProps, prevState) {  // (2)
        console.log('getDerivedStateFromProps');
        if (nextProps !== prevState) {
          return { color: nextProps.color };
        }
        return null;
      }

      componentDidMount() {  // (4)
        console.log('componentDidMount');
      }

      shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState);
        return nextState.number % 10 !== 4;
      }

      componentWillUnmount() {  // (5)
        console.log('componentWillUnmount');
      }

      handleClick = () => {
        this.setState({
          number: this.state.number + 1,
        });
      };

      getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');
        if (prevProps.color !== this.props.color) {
          return this.myRef.style.color;
        }
        return null;
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate', prevProps, prevState);
        if (snapshot) {
          console.log('color before updated', snapshot);
        }
      }

      render() {  // (3)
        console.log('----------render----------');

        const style = {
          color: this.props.color,
        };

        return (
          <div>
            {this.props.missing.value}
            <h1 style={style} ref={(ref) => (this.myRef = ref)}>
              {this.state.number}
            </h1>
            <p>color: {this.state.color}</p>
            <button onClick={this.handleClick}>더하기</button>
          </div>
        );
      }
    }

    export default ComponentLifeCycle;
    ```
    - 첫 렌더링 시 console 창
      <img width="715" alt="image" src="https://user-images.githubusercontent.com/65106740/236151377-aa9eece3-9c1a-4688-8604-3555d4df6499.png">
      - 왜 componentDidMount가 두 번 뜨는지는 componentWillUnmount의 특성을 보면 될 듯


