---
title: "GPT가 알려주는데로 크롤링 만들기 (with python, selenium)"
excerpt: "python, selenium으로 크롤링한 정보를 google spreadsheet에 연동"

categories:
  - React
tags:
  - [python, api, library, selenium, chatGPT, crawling]

toc: true
toc_sticky: true
 
date: 2023-08-21
last_modified_at: 2023-08-28
---

**python을 기본 언어로 하여 크롤링한 정보를 google spreadsheet에 연동을 해보는 프로젝트 이다.**

## 1. selenium을 이용하여 크롤링 하기
그냥 일단 GPT한테 냅다 내가 하고 싶은 것을 말했다.
<img width="736" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/d169ad56-a740-4ddc-b9e1-1abf7ca42206">
<img width="734" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/a4e28277-fac9-4d26-b40a-28b050b4dc15">

- Selenium 설치    
  `pip install selenium`

- Chrome WebDriver 다운로드    
  1. 사용중인 크롬 버젼 확인     
    크롬 버젼은 [chrome://settings/help](chrome://settings/help) 으로 접속하면 확인 가능하다.
    
  2. 버전에 맞춰서 다운로드     
    다운로드 페이지에서 크롬 웹 드라이버의 버전을 선택하여 다운로드    
    사이트 - [구글 크롬 개발자 사이트](https://sites.google.com/chromium.org/driver/) 또는 [Selenium 공식 웹사이트](https://www.selenium.dev/downloads/)

