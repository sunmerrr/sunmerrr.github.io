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
    - 이벤트 설정이 아닌곳에서 setState 사용하면 안됨
    - DOM에 접근하면 안됨
    - 처리: componentDidMount = DOM 정보 가져오기, state 값 변화주기 가능

* ##### construnction()
  - 컴포넌트 생성자 메서드
  - 컴포넌트 만들때 처음으로 실행
  - 초기 state 설정 가능

* ##### getDerivedStateFromProps(props, state) (v16.3 이상)
  - 최초 마운트 시와 갱신 시 render 메서드를 호출하기 직전에 호출됨
  - props로 받아온 값을 state에 동기화시키는 용도

* ##### componentDidMount()
  - 컴포넌트가 화면에 그려진 직후 실행 = 첫 렌더링을 마친 후 실행
  - 여기에 외부 라이브러리 연동, 비동기 요청, DOM 속성 변경 등 작업 처리

* ##### shouldComponentUpdate(nextProps, nextState)
  - 컴포넌트가 리랜더링을 할지 말지를 결정함
  - boolean 값을 반환하는데 false 반환 시 업데이트 과정 종료 됨
  - 최적화 할때 사용하는 메서드(React.memo와 비슷한 역할)


<!-- TODO: 수정 및 편집 필요 -->
* ##### getSnapshotBeforeUpdate(prevProps, prevState) (v16.3 이상)
  - render에서 만들어진 결과물이 브라우저에 반영되기 직전에 호출
  - 반환되는 값은 componentDidUpdate에 snapshot 값으로 전달
  - 업데이트하기 직전의 값을 참고할 때 활용

* ##### componentDidUpdate(prevProps, prevState, snapshot)
  - 랜더링을 완료한 이후
  - DOM관련 처리를 해도 무방하다 함

* ##### componentWillUnMount()
  - 컴포넌트를 DOM에서 제거할때 실행
  - componentDidMount에서 등록한 이벤트 등을 제거 작업 해줘야 함

* ##### componentDidCatch(error, info) (v16 이상)
  - 렌더링 도중에 에러가 발생했을 때 오류 UI를 보여 줄 수 있게 함
  <!-- TODO: 예제 코드 -->


