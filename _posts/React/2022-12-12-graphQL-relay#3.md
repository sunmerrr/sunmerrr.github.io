---
title: "GraphQL React Relay, refetch 하기 #3"
excerpt: "사용자 인터렉션에 따른 데이터 패칭하기"

categories:
  - React
tags:
  - [react, javascript, graphQL, react-relay, fragment, mutation]

toc: true
toc_sticky: true
 
date: 2022-12-12
last_modified_at: 2023-03-13
---


## React-Relay Refetch

### 유저 인터렉션에 따른 데이터 패칭
- 나는 relay hooks에 포함되어 있는 `useRefetchable`을 사용했는데 `useFragment`, `useRefetchableFragment`, `useMutation` 으로도 가능한 것 같다.(`useRefetchable`은 2년 전 relay tools 문서에 포함되어 있던 relay hook이고, 공식문서에는 `useRefetchableFragment`를 사용하여 refetch하도록 되어있다.)
- 내용은 [fragment 포스팅](https://sunmerrr.github.io/react/graphQL-relay-2/#react-relay-fregment)의 예시와 이어진다.

1. schema 수정
    - 먼저 조건을 전달받기 위해 schema에 input을 추가해주어야 한다.[(schema 정의 참고)](https://sunmerrr.github.io/react/graphQL-relay-1/#1-schema-%EC%A0%95%EC%9D%98)
      ```tsx
      // schema.gql
      // 전달받아야 하는 값은 input으로 나타내고 input type은 ProductCategory라는 이름으로 정의했다.
      type Query {
        products(input: ProductCategory!): ProductNode!
      } 

      ...

      input ProductCategory {
        category: String!
      }
      ```

1. fragment가 전달 받을 조건으로 인수 정의
    - 인수는 fragment 이름 아래에 `argumentDefinitions` 으로 앞에 @를 붙여서 정의한다.
    - schema에 정의해준 값을 동일하게 type으로 적어주고 기본 값도 정해준다.(기본값 생략 가능)
      
      ```tsx
      @argumentDefinitions(
        {인수이름}: { type: {schema에 정의한 인수 타입}, defaultValue: {기본값} }
      ) 

      @argumentDefinitions(
        category: { type: "String!", defaultValue: "apple" }
      ) 
      ```

1. 정의 한 인수를 전달 받기
    - `argumentDefinitions`으로 정의한 인수를 $표시를 붙여서 실제 인수를 사용할 데이터에 전달한다.
      ```tsx
      products( input: { category: ${위에 argumentDefinitions에서 정의한 인수 이름} } ) { 
        ...data
      }

      products( input: { category: $category } ) {
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
          }
          category
        }
      }
      ```

1. 리페치가 가능하도록 정의
    - 인수 위에 `refetchable`을 이용하여 queryName과 함께 리페치 가능하도록 해준다. 앞에 @도 붙여준다.
    - queryName 끝에 Query를 붙여서 이름을 지어줘야 한다.
      ```tsx
      @refetchable(queryName: {이름뒤에는 Query를 붙여준다})
      @argumentDefinitions(...)

      @refetchable(queryName: "ProductFragmentRefetchQuery")
      @argumentDefinitions(...)
      ```

1. 조건 전달
    - 부모 컴포넌트에서 자식에게 걸어준 고정 조건값이 유저에게서 받아오는 값이라고 가정했다.
      ```tsx
      // 부모 컴포넌트
      import { graphql, useQuery } from "relay-hooks";

      export const query = graphql`
        query ProductQuery {
          ...ProductFragment
        }
      `;

      export const Products = () => {
        const { ref } = useQuery<any>(query);

        return (
          <PruductContainer fragmentRef={ref} category={"apple"} />
          <PruductContainer fragmentRef={ref} category={"samsung"} />
          <PruductContainer fragmentRef={ref} category={"hp"} />
        );
      }
      ```

1. 조건에 맞는 데이터 받아오기
    - useRefetchable의 refetch 함수를 통해 전달받은 조건으로 데이터를 받아온다.
    - 위에 2~4번을 진행하여 작성된 query와 함께 사용한다.
      ```tsx
      // 자식 컴포넌트
      import { graphql, useRefetchable } from 'react-relay';

      const fragment = graphql`
        fragment ProductFragmentQuery on Query
          @refetchable(queryName: "ProductFragmentRefetchQuery")
          @argumentDefinitions(
            category: { type: "String!", defaultValue: apple }
          ) 
        {
          products(input: { category: $category }) {
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
              }
              category
            }
          }
        }
      `;
      
      export const ProductFragmentQuery = ({ fragmentRef, category }) => {
        const { data: { products }, error, refetch } = useRefetchable(fragment, fragmentRef);
        const { total, hasNext, nodes } = products;

        // refetch를 사용하여 데이터를 핸들링해준다.
        const handleCategoryChange = (category) => refetch({ category }); // 전달 받는 category에 대해서는 백엔드와 이야기해서 조정해야 한다.

        return (
          ... // return product component with fragment datas
        )
      }
      ```

[relay hooks useRefetchable](https://github.com/relay-tools/relay-hooks/blob/master/docs/useRefetchable.md) 
