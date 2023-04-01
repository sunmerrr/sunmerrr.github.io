---
title: "GraphQL React Relay mutate 후 refetch #3"
excerpt: "사용자 인터렉션에 따른 데이터 패칭하기"

categories:
  - React
tags:
  - [react, javascript, graphQL, react-relay, fragment, mutation]

toc: true
toc_sticky: true
 
date: 2022-12-05
last_modified_at: 2022-01-12
---

###### 추천하지 않는 방식이지만 내가 했던 방식도 도움이 될 수 있으니..

## React-Relay refetch

### 유저 인터렉션에 따른 데이터 패칭
- fragment를 통해서 자식에게 필요한 데이터를 부모가 알 필요가 없어졌다.    
  하지만 유저의 어떠한 행동으로 인해서 데이터가 바뀌어 하는 경우에는 어떤 식으로 작성해야할까.
- 내용은 fragment 포스팅의 예시와 이어진다.
  [참고: fragment통해서 데이터 내려주기](https://sunmerrr.github.io/react/graphQL-relay-2/#react-relay-fregment)
- 나는 relay hooks에 포함되어 있는 `useRefetchable`을 사용했는데 `useFragment`, `useRefetchableFragment`, `useMutation` 으로도 가능하다. 상황에 맞는 것을 선택하여 사용하기를 바란다.(실제로 useRefetchable은 2년 전 문서에 포함되어 있던 hook이고, 공식문서에 나와있지 않으니 공식문서에 나와있는 `useRefetchableFragment`를 사용하는 것이 더 좋은 방법일 것 같다.)
- **부모 컴포넌트에서 자식에게 걸어준 조건값이 유저에게서 받아오는 값이라고 가정했다.**
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

  - 
  ```tsx
  // 자식 컴포넌트
  import { graphql, useRefetchable } from 'react-relay';

  const fragment = graphql`
    fragment ProductFragmentQuery on Query
    @refetchable(queryName: "ProductFragmentRefetchQuery")
    @argumentDefinitions(
      category: { type: "Category", defaultValue: apple }
    ) {
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
            category
          }
        }
      }
    }
  `;
  

  export const ProductFragmentQuery = ({ fragmentRef, category }) => {
    const { data: { products }, error, refetch } = useRefetchable(fragment, fragmentRef);
    const { total, hasNext, nodes } = products;

    const handleCategoryChange = (category) => refetch({ category }); // 해당 데이터에 대해 백엔드와 이야기해서 조정해야 한다.

    return (
      ... // return product component with fragment datas
    )
  }
  ```
[react-relay useRefetchable](https://github.com/relay-tools/relay-hooks/blob/master/docs/useRefetchable.md) 
