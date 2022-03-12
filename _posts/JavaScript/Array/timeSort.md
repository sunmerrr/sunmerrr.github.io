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

## 시간 정렬

  - `.sort()`와 를 사용하여 날짜를 정렬해보자.
    - `new Date()`를 사용
      ```jsx
      schedules = [
        { id : 1, schedule : '2021-03-13T11:00:00.000Z' }, 
        { id : 2, schedule : '2019-01-13T05:00:00.000Z' },
        { id : 3, schedule : '2022-04-22T00:00:00.000Z' },
        { id : 4, schedule : '2011-04-16T12:00:00.000Z' }
      ]

      schedules.sort((a,b)=> {
        a = new Date(a.schedule)
        b = new Date(b.schedule)
        return a - b;
      })
      ```
      - 결과값 
      ![스크린샷 2022-03-12 오후 11 49 42](https://user-images.githubusercontent.com/65106740/158022750-93c92dcb-a1c9-4182-ac4c-bd4226ce4831.png)


