---
title: "Frontend GraphQL Relay, Fragment 사용 #1"
excerpt: "react relay로 상품 data 불러오기"

categories:
  - React
tags:
  - [react, javascript, graphQL, react-relay, fragment]

toc: true
toc_sticky: true
 
date: 2022-12-02
last_modified_at: 2022-01-02
---

###### GraphQL에 대해서나 장점은 검색하면 잘 나오기 때문에 생각나는 정도로만 적었다.
###### Relay 기초 세팅 정도는 사이트에 잘 나와있어서 실제 사용 예시만 적었다.
###### 완벽한 정답은 아님

#### GraphQL이란?
- API 통신 쿼리 언어이다
- 쿼리 언어라고 하면 조금 어렵게 다가올 수도 있을 것 같은데 그냥 REST API의 단점을 보완한 API 호출 방식이라고 생각하면 쉬울 듯하다.

#### 장점(프론트 기준)
- 단일 API 호출로 원하는 데이터를 받아올 수 있다.
- 받아올 데이터를 먼저 정의해두기 때문에 직관적이고 명시적이다.
- 데이터 수정, 삭제, 업데이트의 메소드가 하나로 이루어져 있다.
- react component에서 자신이 필요 없는 데이터여도 자식에게 전달해 주기 위해서 props를 받아와야만 하는 단점을 보완할 수 있다.(컴포넌트 간 의존성 줄임)

## React-Relay
[참고-relay 공식문서](https://relay.dev/)
###### #기초 세팅은 되어있다고 가정
###### #Next.js와 Typescrip 기반으로 개발

### GraphQL 사용하기
#### 1. Schema 정의
- 루트 폴더에 schema.gql를 만들고 type Query에 불러올 데이터를 넣어준다.
- 자세한 데이터 내용은 type Query에 작성한 내용과 같은 이름으로 type을 정해준다.
  ```tsx
  // schema.gql

  type Query {
    products: ProductNode!
  }

  // 제품의 리스트와 함께 페이지네이션, 제품의 총 개수 등을 넘겨 받음
  type ProductNode {
    total: Int!
    hasNext: Boolean!
    nodes: [Product!]!
  }

  // 실질적인 제품 정보 데이터
  type Product {
    id: ID!
    title: String!
    description: String!
    image: String!
    tags: [Tag!]
    category: String!
  }

  type Tag {
    id: ID!
    text: String!
  }
  ```

#### 2. Query  호출
- 데이터를 불러오고자 하는 파일에 정의해둔 query를 호출한다.
  ```tsx
  import { graphql, useQuery } from "relay-hooks";

  export const query = graphql`
    query ProductQuery {
      products {  // 위 schema에서 정의해주었던 products와 연결된 type 내용과 똑같이 작성해준다.
        total
        hasNext
        nodes {
          id
          title
          description
          image
          tags {
            id
            text
          category
        }
      }
    }
  `;

  const { data } = useQuery(query);
  ```
- 위 data를 콘솔로 찍어보면 아래와 같이 나올 것이다.
  ```json
  product: {
    total: 68,
    hasNext: true
    nodes [
      {
        id: 11,
        title: "query test용 11번 제목",
        description: "테스트용으로 작성된 내용입니다. 어쩌구 저쩌구..",
        image: "11번 image 주소",
        tags: [
          {
            id: 1
            text: "GraphQL"
          },
          {
            id: 2
            text: "Relay"
          }
        ],
        category: "GraphQL"
      },
      {
        id: 12,
        title: "query test용 12번 제목",
        description: "어쩌구 저쩌구..",
        image: "12번 image 주소",
        tags: [
          {
            id: 1
            text: "GraphQL"
          },
          {
            id: 2
            text: "Relay"
          }
        ],
        category: "GraphQL"
      },
    ]
  }
  ```
