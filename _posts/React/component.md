---
title: "리액트의 컴포넌트"
excerpt: "리액트를 다루는 기술 스터디 #2 - 컴포넌트"

categories:
  - React
tags:
  - [react, javascript, library, component]

toc: true
toc_sticky: true
 
date: 2023-04-07
last_modified_at: 2023-04-07
---

### 리액트의 class형 컴포넌트 vs function형
- class형 컴포넌트와 function형 컴포넌트를 생성하며 차이점을 보려고 한다.

##### 단축키 
*Extentions에서 ES7+ React/Redux/React-Native snippets 설치하면 사용가능*
- `rafce`: arrow function component를 export default로 기본 틀 생성
- `rce` : class component를 export default로 기본 틀 생성

#### props
- 컴포넌트 속성을 설정할때 사용하는 요소
- 부모가 자식 컴포넌트를 가져와 사용하는 과정에서 부모에서 props를 설정하고 자식 컴포넌트에게 넘겨주는 식
- 컴포넌트 스스로는 props를 읽기 전용으로만 사용 가능
- 부모 컴포넌트 설정
  ```jsx
  // 자식 컴포넌트는 name, favoriteNumber, children 이라는 props를 넘겨받게 됨

  import './App.css';
  import ClassComponent from './ClassComponent';
  import FunctionComponent from './FunctionComponent';

  function App() {
    return (
      <div className="App">
        <ClassComponent name="React Class Component" favoriteNumber={2}>***여기에 children props가 들어갑니다***</ClassComponent>
        <FunctionComponent name="React Function Component" favoriteNumber={6}>***여기에 children props가 들어갑니다***</FunctionComponent>
      </div>
    );
  }

  export default App;
  ```

- ##### props 예시
  - class형 컴포넌트 props예시
    ```jsx
    import { Component } from 'react';

    export class ClassComponent extends Component {
      render() {
        const { name, favoriteNumber, children } = this.props;  // 비구조화 할당으로 보기 편하게 해줌
        return (
          <div>
            <strong>{name} 공부하기</strong> <br />
            클래스형 컴포넌트의 children : {children} <br />
            가장 좋아하는 숫자 : {favoriteNumber} <br />
          </div>
        );
      }
    }

    export default ClassComponent;
    ```

  - function형 컴포넌트 예시
    ```jsx
    const FunctionComponent = ({ name, favoriteNumber, children }) => { // 비구조화 할당으로 보기 편하게 해줌
      return (
        <div>
          <strong>{name} 공부하기</strong> <br />
          함수형 컴포넌트의 children : {children} <br />
          가장 좋아하는 숫자 : {favoriteNumber} <br />
        </div>
      );
    };

    export default FunctionComponent;
    ```
  - 결과값은 두 컴포넌트가 동일하다
    <img width="530" alt="image" src="https://user-images.githubusercontent.com/65106740/231062748-104c8770-08e9-48ca-95f8-5ea8d0d3948f.png">


- ##### default props
  - default props는 부모에서 props를 전달 받지 못했을 경우 기본으로 띄워주는 값
    ```jsx
    const FunctionComponent = ({ name, favoriteNumber, children }) => {
      (...)
    }

    export default FunctionComponent;

    // {컴포넌트 이름}.defaultProps = {}
    // class형과 function형 동일
    FunctionComponent.defaultProps = { name: 'React Function Component' };
    ```
  - class형 컴포넌트의 경우에는 class 내부에서 작성해 줄 수도 있음
    ```jsx
    export class ClassComponent extends Component {
      static defaultProps = {
        name: 'React Class Component',
      };

      render(
        (...)
      )
    };

    export default ClassComponent;
    ```

- ##### 타입 검사
  - props에 타입을 선정하면 원하는 타입으로만 값을 전달 받을 수 있으며 사전에 오류 방지 가능
    [PropTypes와 함께 하는 타입 검사](https://ko.reactjs.org/docs/typechecking-with-proptypes.html)
    ```jsx
    import propTypes from 'prop-types'; // react v15.5부터 외부 라이브러리로 이동

    const FunctionComponent = ({ name, favoriteNumber, children }) => {
      (...)
    }

    export default FunctionComponent;

    // {컴포넌트 이름}.propTypes = {}
    // class형과 function형 동일
    FunctionComponent.propTypes = {
      name: PropTypes.string,
      unsetNumber: PropTypes.number.isRequired,
      favoriteNumber: PropTypes.number.isRequired, // 필수로 받아와야 하는 값으로 지정
    };
    ```

#### state

- 리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미