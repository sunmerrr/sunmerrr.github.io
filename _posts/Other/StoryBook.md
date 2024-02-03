---
title: "Storybook/Jest/Cypress 비교 + 초기 세팅"
excerpt: ""

categories:
  - Developer
tags:
  - [Software, web, Developer, Software Developer]

toc: true
toc_sticky: true
 
date: 2024-01-30
last_modified_at: 2024-01-30
---

## Storybook JS 소개
Storybook JS는 UI 컴포넌트 개발, 문서화 및 테스트를 위한 도구로, 주로 React, Vue, Angular 등의 프레임워크로 작성된 컴포넌트를 다룰 때 활용된다.    
[Storybook docs](https://storybook.js.org/docs/get-started/install).   

### Stroybook 장/단점
- 장점
  - 컴포넌트 개발 및 테스트 용이성: 각 컴포넌트를 독립적으로 개발, 테스트 할 수 있고, 시각적으로 확인 가능
  - 문서화: 간편한 문서화를 통해 프로젝트의 컴포넌트에 대한 이해도 상승
  - 시각적 테스팅: 시각적 스탭샷을 통해서 컴포넌트의 시각적 변화를 감지하고 테스트
  - 컴포넌트 재사용성: 다른 프로젝트에서도 쉽게 컴포넌트를 재사용 할 수 있음

- 단점
  - 러닝커브: 처음 사용 시 러닝커브 발생
  - 범위: UI 컴포넌트에 중점을 두고 있어서 프로젝트의 전반적인 테스트를 수행하기 어려움

### Jest, Cypress와의 비교
**Storybook vs. Jest & Cypress**    
* Storybook: 주로 UI 컴포넌트 개발, 문서화, 시각적 테스팅
* Jest: 주로 유닛 테스트, 모듈 테스트에 사용. 코드 품질 보장 및 모듈 독립적 테스트에 용이
* Cypress: 엔드 투 엔드 테스트를 위해 사용. 웹 애플리케이션의 전반적인 동작을 테스트