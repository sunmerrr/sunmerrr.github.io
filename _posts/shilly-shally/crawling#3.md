---
title: "GPT가 알려주는데로 크롤링 만들기 (selenium 사용 이유)"
excerpt: "selenium 선택 이유와 타 라이브러리 비교"

categories:
  - React
tags:
  - [python, api, library, selenium, chatGPT, crawling]

toc: true
toc_sticky: true
 
date: 2023-09-04
last_modified_at: 2023-09-04
---

**python을 기본 언어로 하여 크롤링한 정보를 google spreadsheet에 연동을 해보는 프로젝트 이며, 해당 포스팅에서는 크롤링을 만들기 전 selenium으로 크롤러를 진행하게 된 이유를 정리해보았다.**     
*GPT가 알려준다고해도 오래된 정보나 잘못된 정보를 알려줄 수 있기 때문에 중간중간 내가 따로 검색해서 해결하는 것이 좋다.*


## 크롤링 라이브러리
<img width="756" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/4b019765-715d-4868-b3d4-d1285829647c">
<img width="756" alt="image" src="https://github.com/sunmerrr/sunmerrr.github.io/assets/65106740/e4f4e0d5-0e98-427a-a52e-6271ee9affd1">

**원래는 시작부터 selenium 을 사용할 생각이었는데 GPT가 아묻따 BeautifulSoup을 이야기하길래 시작 전에 비교를 해보고 크롤러를 만드는 것도 좋을 것 같아서 관련하여 '대화한 내용 + 내가 조사한 내용 조금'에 대해 정리했다.**    


### 1. BeautifulSoup    
뷰티풀숲은 타 라이브러리에 상대적으로 사용하기 쉽다. HTML 및 XML 문서에서 데이터를 추출하는데 사용된다고 했는데 해당 기능은 구글 스프레드 시트에서도 가능하기 때문에 큰 메리트가 없다고 느꼈다. 내가 찾아봤을때는 보통 BeautifulSoup만 사용하지 않고 requests를 함께 사용하는 예제가 많았다.    
단순한 웹 스크래핑이나 데이터 추출 작업에 적합하지만 여러 웹 페이지의 정보를 가져오기에는 적절하지 않다.
- 간단 예시
  ```python
  from bs4 import BeautifulSoup
  import requests

  # 웹 페이지 요청
  url = 'https://example.com'
  response = requests.get(url)

  # HTML 파싱
  soup = BeautifulSoup(response.text, 'html.parser')

  # 데이터 추출
  title = soup.title.string
  print("Title:", title)
  ```

### 2. Selenium
예전에 셀레니움으로 가벼운 크롤러를 만들어본 경험이 있어서 나에게 허들이 좀 낮았다. 무엇보다 다양한 웹 페이지를 크롤링 할 수 있고, 스크립트 실행도 가능하다는 점이 매우 마음에 든다.    
셀레니움은 다양한 웹 브라우저에서 실행 가능하고, 복잡한 상호작용이나 로그인 기능을 구현할 수 있다.
하지만 속도는.. 
(크롬드라이버를 다운받는 다던가 하는 설정이 추가로 필요하다.)
- 간단 예시
  ```python
  from selenium import webdriver

  # Chrome 웹 드라이버를 사용합니다. 크롬 드라이버 다운로드 및 경로 설정 필요.
  driver = webdriver.Chrome(executable_path='/path/to/chromedriver')

  # Google 홈페이지 열기
  driver.get('https://www.google.com')

  # 웹 페이지 제목 출력
  print("페이지 제목:", driver.title)

  driver.quit()
  ```

### 3. Scrapy
스크래피는 

## 결론
**크롤러를 만들려고 했던 이유가 처음 렌더링 시 HTML로 이루어져 있지 않고 JavaScript로 이루어져 있는 사이트의 경우에는 구글 스프레드시트에서 요소를 읽어오기 어렵기 때문이었다.**    
**결국 뷰티풀숲은 JavaScript로 된 웹페이지를 읽지 못하고, 스크래피는 초기 설정이 복잡하다는 말에 셀레니움으로 개발했다.**