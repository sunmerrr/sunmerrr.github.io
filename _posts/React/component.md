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
- rafce: arrow function component를 export default로 생성
- rce : class component를 export default로 생성

#### props
- 컴포넌트 속성을 설정할때 사용하는 요소
- 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값
- 컴포넌트 스스로는 props를 읽기 전용으로만 사용 가능
[PropTypes와 함께 하는 타입 검사](https://ko.reactjs.org/docs/typechecking-with-proptypes.html)
- class형 컴포넌트 props예시
  ```jsx
  import React, { Component } from 'react';
  import PropTypes from 'prop-types';

  export class ClassComponent extends Component {
    // class형 컴포넌트에서는 defaultProps와 propTypes를 클래스 내부에서 설정할 수도 있다.
    static defaultProps = {
      name: 'React Class Component',
    };

    static propTypes = {
      name: PropTypes.string,
      unsetNumber: PropTypes.number.isRequired,
      favoriteNumber: PropTypes.number.isRequired,
    };

    render() {
      const { name, unsetNumber, favoriteNumber, children } = this.props;
      return (
        <div>
          <strong>{name} 공부하기</strong>
          <br />
          클래스형 컴포넌트의 children : {children}
          <br />
          가장 좋아하는 숫자 : {unsetNumber}(숫자가 없을때 에러 표시를 위함 - console창 확인)
          <br />
          가장 좋아하는 숫자 : {favoriteNumber}
          <br />
          <br />
          <br />
        </div>
      );
    }
  }

  export default ClassComponent;
  ```

- function형 컴포넌트 예시
  ```jsx
  import PropTypes from 'prop-types'; // react v15.5부터 외부 라이브러리로 이동

  export const FunctionComponent = ({ name, unsetNumber, favoriteNumber, children }) => {
    return (
      <div>
        <strong>{name} 공부하기</strong>
        <br />
        함수형 컴포넌트의 children : {children}
        <br />
        가장 좋아하는 숫자 : {unsetNumber}(숫자가 없을때 에러 표시를 위함 - console창 확인)
        <br />
        가장 좋아하는 숫자 : {favoriteNumber}
        <br />
        <br />
        <br />
      </div>
    );
  };
  ```

#### state

- 리액트에서 state는 컴포넌트 내부에서 바뀔 수 있는 값을 의미