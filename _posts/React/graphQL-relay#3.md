---
title: "GraphQL React Relay fragment와 mutate #3"
excerpt: "fragment로 물려준 자식 mutation 하기"

categories:
  - React
tags:
  - [react, javascript, graphQL, react-relay, fragment, mutation]

toc: true
toc_sticky: true
 
date: 2022-12-05
last_modified_at: 2022-01-12
---

###### 내가 이것을 적용했던 방식과 약간 달라졌더라..

## React-Relay mutation

### 조건을 포함한 data fetching
- fragment를 통해서 자식에게 필요한 데이터를 부모가 알 필요가 없어졌다.    
  하지만 때때로 자식에게 특정한 조건을 걸어줘야 할 때가 있거나, 자식이 데이터를 갱신시켜야 할 경우가 생길 수 있다.
- 내용은 fragment 포스팅의 예시와 이어진다.    
  [참고: fragment통해서 데이터 내려주기](https://sunmerrr.github.io/react/graphQL-relay-2/#react-relay-fregment)
- 나는 부모 컴포넌트에서 자식에게 조건을 걸어주었다.
  ```tsx
  // 부모 컴포넌트
  import { graphql, useQuery } from "relay-hooks";

  export const query = graphql`
    query ProductQuery {
      ...ProductFragment
    }
  `;

  export const Products = () => {
    const { ref } = useQuery<any>(query); // 데이터 이름은 아무거나로 지어도 상관 없다.

    return (
      <PruductContainer fragmentRef={ref} category={"apple"} />
      <PruductContainer fragmentRef={ref} category={"samsung"} />
      <PruductContainer fragmentRef={ref} category={"hp"} />
    );
  }
  ```

- 자식은 부모에게 넘겨받은 카테고리를 통해서 같은 컴포넌트 내의 데이터만 변경해줄 수 있다.
- 나는 relay hooks에 포함되어 있는 `useRefetchable`을 사용했다.
  ```tsx
  // 자식 컴포넌트
  import { useFragment } from 'react-relay';

  const fragment ProductFragment on Query {
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

  export const PruductContainer = ({ fragmentRef }) => {
    const { total, hasNext, nodes } = useFragment(
      ProductFragment,
      fragmentRef
    );

    return (
      ... // return product component with fragment datas
    )
  }
  ```
[relay 공식문서 fragment](https://relay.dev/docs/tutorial/fragments-1/) 
