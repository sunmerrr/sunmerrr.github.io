---
title: "GraphQL vs RESTful API"
excerpt: "graphql과 restful api의 차이점"

categories:
  - React
tags:
  - [react, javascript, graphQL, react-relay, fragment, mutation]

toc: true
toc_sticky: true
 
date: 2022-03-20
last_modified_at: 2022-03-20
---


#### GraphQL과 RESTful의 차이
- GraphQL은 하나의 엔드포인트로 통신하고 RESTful은 여러개의 엔드포인트를 통해서 통신한다.
- api 구성에 따라서 원하지 않는 데이터도 받아와야만 하는 RESTful과는 달리 GraphQL은 선언적인 쿼리 사용으로 원하는 데이터만 받아올 수 있다.
- 같은 엔드포인트에서도 GraphQL은 다른 결과를 받을 수 있다. RESTful은 같은 엔드포인트에서 같은 데이터를 받는다.

#### GraphQL의 장점
- 하나의 endpoint만 사용하기 때문에 간결하다.
- 받아올 데이터를 컴포넌트 안에서 선언하기 때문에 직관적이다.
- 불필요한 데이터는 받지 않아도 된다.

#### RESTful의 장점