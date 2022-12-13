```jsx
let cache = {};

const memoizedCache = (n) => {
  if (n in cache) {
    return cache[n];
  } else {
    cache[n] = n + 100;
    return chache[n]
  }
}

memoizedCache(5) // 105
memoizedCache(5) // 105 cache 객체에서 바로 리턴 
memoizedCache(10) // 110
```


<!-- closure -->
```jsx
const memoizedCache = () => {
  let cache = {};

  return (n) => {
    if (n in cache) {
      return cache[n];
    } else {
      cache[n] = n + 100;
      return chache[n]
    }
  }
}

memoizedCache(5) // 105
memoizedCache(5) // 105 cache 객체에서 바로 리턴 
memoizedCache(10) // 110
```