---
title: "Time Sort"
excerpt: "오늘 날짜를 기준으로 시간 정렬"

categories:
  - array
tags:
  - [array, sort, javascript, compare]

toc: true
toc_sticky: true
 
date: 2022-03-11
last_modified_at: 2022-03-11
---

## 시간 순 정렬
  - 과거로부터 시간 오름차순으로 정렬할 수 있다.
  - `.sort()`와 를 사용하여 날짜를 정렬해보자.
    - `new Date()` 사용
      ```jsx
      const schedules = [
        { id : 1, schedule : '2021-03-13T11:00:00.000Z' }, 
        { id : 2, schedule : '2019-01-13T05:00:00.000Z' },
        { id : 3, schedule : '2022-04-22T00:00:00.000Z' },
        { id : 4, schedule : '2011-04-16T12:00:00.000Z' }
      ];

      schedules.sort((a,b)=> {
        a = new Date(a.schedule);
        b = new Date(b.schedule);
        return a - b;
      });
      ```
      - 결과값 
      ![스크린샷 2022-03-12 오후 11 49 42](https://user-images.githubusercontent.com/65106740/158023277-70969cc9-8236-4ab1-aa17-b31321ce9e4d.png)

    - `moment.js` 사용
      ```jsx
      const schedules = [
        { id : 1, schedule : '2021-10-01T11:00:00.000Z' }, 
        { id : 2, schedule : '2021-01-13T05:00:00.000Z' },
        { id : 3, schedule : '2025-04-22T00:00:00.000Z' },
        { id : 4, schedule : '2019-09-16T12:00:00.000Z' }
      ];

      schedules.sort((a,b)=> {
        a = moment(a.schedule);
        b = moment(b.schedule);
        return a - b;
      });
      ```

      - 결과값
      ![스크린샷 2022-03-13 오전 12 09 21](https://user-images.githubusercontent.com/65106740/158023507-dcd75ad8-83a1-4691-b35f-49fdf5ad68d8.png)
