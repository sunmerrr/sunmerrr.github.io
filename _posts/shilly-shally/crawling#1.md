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
*GPT가 알려준다고해도 오래된 정보나 잘못된 정보를 알려줄 수 있기 때문에 중간중간 내가 따로 검색해서 해결하는 것이 좋다.*

## 1. selenium을 이용하여 크롤링 하기
그냥 일단 GPT한테 냅다 내가 하고 싶은 것을 말했다.
<img width="736" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/d169ad56-a740-4ddc-b9e1-1abf7ca42206">
<img width="734" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/a4e28277-fac9-4d26-b40a-28b050b4dc15">


#### Selenium 설치    
  `pip install selenium`

#### Chrome WebDriver 설정    
1. 사용중인 크롬 버젼 확인     
  크롬 버젼은 [chrome://settings/help](chrome://settings/help) 으로 접속하면 확인 가능하다.
  
2. 버전에 맞춰서 다운로드     
  다운로드 페이지에서 크롬 웹 드라이버의 버전을 선택하여 다운로드    
  사이트 - [구글 크롬 개발자 사이트](https://sites.google.com/chromium.org/driver/) 또는 [Selenium 공식 웹사이트](https://www.selenium.dev/downloads/)

3. driver 설정
    ```python
    from selenium import webdriver
    from selenium.webdriver.chrome.service import Service

    service = Service(executable_path='{다운로드 받은 경로}')
    ```
    - 원래 GPT가 알려준 코드는 아래와 같았는데 오래된 코드라고 했던가.. 암튼 에러가 떠서 위와 같이 변경했다.
      ```python
      from selenium import webdriver

      driver = webdriver.Chrome(executable_path='{다운로드 받은 경로}')
      ```

#### 크롤링 하기
- 사이트 선정     
  나는 오늘의 집 사이트를 좋아해서 망설임 없이 오늘의 집 사이트의 콘텐츠의 사진과 제목을 긁어오는 코드로 작성해달라고 요청해봤다.
  <img width="736" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/cd08f8c5-5303-4126-ad83-97207a0f311e">

- 코드 작성
  ```python
  from selenium import webdriver
  from selenium.webdriver.chrome.service import Service

  service = Service(executable_path='/Users/summerkim/Desktop/Development/selenium/chromedriver')
  options = webdriver.ChromeOptions()
  driver = webdriver.Chrome(service=service, options=options)

  driver.get('https://ohou.se/contents/card_collections')

  results = []

  # 각 콘텐츠의 링크를 크롤링
  content_links = [element.get_attribute('href') for element in driver.find_elements_by_css_selector('.content-card a')]

  # 각 링크를 방문하여 사진과 콘텐츠 제목 크롤링
  for link in content_links:
      print(link)
      driver.get(link)
      title = driver.find_element_by_css_selector('.content-header-title').text
      image_url = driver.find_element_by_css_selector('.content-image img').get_attribute('src')
      results.append((title, image_url))

  print(results)
  driver.quit()
  ```

  - 위 코드를 실행하면 에러가 뜬다.
    <img width="996" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/677aedac-14d6-4cb5-b3cc-4b5d4d47cd11">



