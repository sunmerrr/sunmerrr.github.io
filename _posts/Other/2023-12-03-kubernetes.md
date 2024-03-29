---
title: "쿠버네티스: 현대적인 애플리케이션 관리의 핵심"
excerpt: "쿠버네티스는 무엇인가"

categories:
  - Other
tags:
  - [Software, web, kuberetes]

toc: true
toc_sticky: true
 
date: 2023-11-30
last_modified_at: 2023-12-03
---

## 쿠버네티스는 무엇인가?
`Kubernetes는 그리스어로 키잡이라는 뜻`

**쿠버네티스(Kubernetes)는 컨테이너화된 애플리케이션을 자동화하고 배포, 확장하며 관리하기 위한 오픈 소스 플랫폼입니다.** 개발자와 운영팀이 컨테이너 오케스트레이션을 통해 애플리케이션을 더 효율적으로 운영할 수 있도록 도와주는 도구입니다.    
*컨테이너 오케스트레이션: 컨테이너 오케스트레이션(Container Orchestration)은 컨테이너의 배포, 관리, 확장, 네트워킹을 자동화하는 프로세스입니다. 컨테이너 오케스트레이션은 분산 환경 내에서 컨테이너의 수명 주기를 관리합니다.     
컨테이너 오케스트레이션의 목적은 여러 컨테이너의 배포 프로세스를 최적화하는 것입니다. 컨테이너 오케스트레이션은 컨테이너와 호스트의 수가 증가함에 따라 점점 더 가치가 있게 됩니다.*

### 구성 요소
1. 컨테이너 오케스트레이션: 쿠버네티스는 여러 대의 호스트에서 동작하는 컨테이너화된 애플리케이션을 효과적으로 관리하고 조정하는 데 사용됩니다.

1. 자동 배포 및 스케일링: 쿠버네티스는 애플리케이션을 자동으로 배포하고, 필요에 따라 자동으로 확장하거나 축소하여 트래픽 또는 부하에 대응합니다.

1. 서비스 디스커버리 및 로드 밸런싱: 쿠버네티스는 서비스 간의 통신을 관리하고, DNS 기반의 서비스 디스커버리와 로드 밸런싱을 제공합니다.

1. 롤링 업데이트 및 롤백: 애플리케이션의 새로운 버전을 롤링 업데이트하고, 문제가 발생할 경우 이전 버전으로 롤백하는 기능을 제공합니다.

1. 설정 및 저장소 관리: 환경 변수, 설정 파일 등을 효과적으로 관리하며, 애플리케이션의 상태를 저장하는 데 사용되는 볼륨과 같은 기능을 제공합니다.

1. 강력한 보안 기능: 쿠버네티스는 컨테이너 간의 격리, 자원 제한, 롤 기반의 액세스 제어 등 다양한 보안 기능을 제공합니다.

## 쿠버네티스의 장단점

### 장점

1. **스케일링과 성능 향상**
   - 쿠버네티스는 애플리케이션을 자동으로 스케일링하고 트래픽에 따라 조절하여 높은 성능을 유지할 수 있습니다.

2. **고가용성과 신뢰성**
   - 쿠버네티스 클러스터는 노드 간의 통신 오류나 장애에 대한 자동 복구 기능을 제공하여 고가용성을 유지합니다.

3. **컨테이너 오케스트레이션**
   - 쿠버네티스는 컨테이너 기반의 애플리케이션을 효과적으로 배포하고 관리하는데 필요한 기능을 제공합니다.

### 단점

1. **복잡성**
   - 초기 구성과 관리는 다소 복잡하며, 학습 곡선이 높을 수 있습니다.

2. **자원 소모**
   - 쿠버네티스 클러스터 자체가 일정량의 자원을 소비하므로, 작은 규모의 애플리케이션에는 비효율적일 수 있습니다.

## 그래서 쿠버네티스를 사용하는 이유는!

1. **자동화된 배포와 관리**
   - 쿠버네티스는 애플리케이션의 배포, 확장, 롤링 업데이트 등을 자동화하여 개발자가 높은 수준의 관리 가능성을 얻을 수 있습니다.

2. **다양한 환경에서의 이식성**
   - 쿠버네티스는 다양한 환경에서 동작할 수 있어, 온프레미스, 클라우드, 다중 클라우드 등 여러 인프라에서의 이식성을 제공합니다.

3. **고수준의 서비스 디스커버리와 로드 밸런싱**
   - 서비스 디스커버리와 로드 밸런싱을 자동으로 처리하여 애플리케이션 간의 통신을 간편하게 관리할 수 있습니다.


## 쿠버네티스 클러스터는 또 뭔가..
**쿠버네티스 클러스터: 쿠버네티스(Kubernetes) 시스템을 구성하는 중요한 구성 요소. 클러스터는 여러 컴퓨터 시스템 또는 노드(node)들의 집합으로 구성되어 있으며, 각 노드는 쿠버네티스가 관리하는 컨테이너화된 애플리케이션을 실행하고 관리하는데 사용됨.    
쿠버네티스 클러스터는 마스터(Master)와 워커 노드(Worker Node)로 구성. 마스터는 클러스터를 제어하고 관리하는 역할을 하며, 워커 노드는 애플리케이션을 실행하는 데 사용됨.**

#### 마스터(Master)

1. **API 서버 (kube-apiserver):** 클러스터의 중심 제어 지점으로, 쿠버네티스 객체(파드, 서비스, 볼륨 등)에 대한 API 엔드포인트를 노출합니다.
2. **컨트롤 매니저 (kube-controller-manager):** 클러스터 상태를 관찰하고 조정하는 컨트롤러를 실행합니다.
3. **스케줄러 (kube-scheduler):** 새로운 파드를 어느 노드에 할당할지 결정하고, 어떤 노드가 가장 적합한지를 판단하여 파드를 예약합니다.

#### 워커 노드(Worker Node)

1. **컨테이너 런타임 (Container Runtime):** 도커(Docker)와 같은 컨테이너 런타임이 설치되어 있어야 합니다.
2. **Kubelet:** 마스터 노드의 명령에 따라 노드 상에서 컨테이너를 실행하고 관리하는 쿠버네티스 에이전트입니다.
3. **Kube-proxy:** 서비스를 외부로 노출하고 네트워크 규칙을 설정하는 역할을 합니다.

#### etcd

클러스터의 모든 구성 데이터를 저장하는 분산형 키-값 저장소입니다. etcd는 쿠버네티스 클러스터의 상태를 유지하고 모든 노드 간의 일관성을 유지합니다.
