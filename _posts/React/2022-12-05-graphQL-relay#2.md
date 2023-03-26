---
title: "React Relay, Fragment #2"
excerpt: "relay로 자식 컴포넌트에게 데이터 내려주기"

categories:
  - React
tags:
  - [react, javascript, graphQL, react-relay, fragment]

toc: true
toc_sticky: true
 
date: 2022-12-05
last_modified_at: 2022-01-12
---


## React-Relay fregment

### fragment를 사용한 데이트 내려주기
- 프레그먼트는 리엑트가 자식에게 데이터를 물려주기 위해서 부모에게 필요하지 않아도 자식의 데이터를 props로 전달받아야하는 불편함을 덜어주기 위해 사용하며, 그로인해 컴포넌트의 독립성을 유지할 수 있게 해준다고 한다.
- 그런데 내가 사용해봤을때는 어찌됐든 부모가 자식에게 쿼리에 대한 reference를 전달해 줘야 하기 때문에 부모 없이는 자식이 데이터를 가질 수 없는 것은 마찬가지인 것 같다.(어쨌든 물려주는게 있다는 말)
- 프레그먼트 사용은 어렵지 않다.   부모에게 필요하지 않은 데이터는 `...`를 앞에 붙인 이름으로 묶어주고, 해당 데이터를 자식에게 물려준다. 그리고 useFragment로 불러오면 data를 사용할 수 있다.   
  앞에서 작성했던 graphQL 사용 예시에서 이어진다.[GraphQL 사용하기](https://sunmerrr.github.io/react/graphQL-relay-1/)
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
      <PruductContainer fragmentRef={ref} />
    );
  }
  ```

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