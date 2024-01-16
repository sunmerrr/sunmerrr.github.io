---
title: "AWS ECS를 통한 Docker 배포"
excerpt: ""

categories:
  - Other
tags:
  - [Software, web, aws, ecs, docker]

toc: true
toc_sticky: true
 
date: 2024-01-12
last_modified_at: 2024-01-12
---

## ECS 설명
[공식문서 보러가기](https://docs.aws.amazon.com/ko_kr/AmazonECS/latest/developerguide/Welcome.html)

### ECS 란?
컨테이너화된 어플리케이션의 배포와 관리를 쉽게 할 수 있도록 해주는 aws 서비스이다.
![What is Amazon Elastic Container Service?](https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/0dc70199-bb31-48dd-a86d-18bfccc635b1)

### 사용해보기
// https://www.youtube.com/watch?v=JyzVn3iBbHc 이거 보면서 해봄
1. Docker 이미지 빌드     
  해당 부분은 이미 다 아는 부분이라고 생각해서 것 같아서 슬쩍 넘어간다.

1. ECS Task 정의 생성    
  ECS 클러스터에서 실행할 Task에 대한 정의를 작성한다. 여기서 어떤 컨테이너를 사용할지, 리소스를 어떻게 할당할지 등을 정할 수 있다.
    - AWS 콘솔 메인에서 ECS를 검색하여 Amazon Elastic Container Service로 들어간다.

1. ECS 서비스 생성
  참고하기
  https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/getting-started-install.html

    1. AWS 리전 설정

    1. EC2 인스턴스 생성

    1. ECS 클러스터 생성
        - 인스턴스 연결

    1. Docker 이미지 준비

    1. ECS Task 생성
        - CLI로 하기
        - GUI로 하기

    1. ECS 서비스 생성

    1. 로드 밸런서 설정(선택)

    1. 서비스 시작