# 💻prevent_system
## 🚀 소개
### 프로젝트 소개
전염병 정보의 분산과 시각화 부족, 실시간 대응 체계의 미흡의 문제점을 느껴
전국 질병 발생 현황의 실시간 모니터링, 맞춤형 예방 정보 및 대응 가이드 제공, 농축산업 경제적 피해 최소화를 목표로 하고 있습니다.


### 주요 기능
- 지도로 전염병에 대한 주의 정보 제공
- 정부의 정책 서비스 관련 정보 제공
- 네이버 API를 활용한 관련 뉴스 정보 제공 및 제공된 뉴스의 AI요약 제공
- Gemma3 기반의 로컬 LLM을 연동하여 도움 및 추가 정보 제공

### 기술적 특징
◦ 로컬 생성형 AI(Lightweight LLM) 도입 및 연동 경험
  - Gemma3 기반 로컬 LLM을 적용하여, 외부 API 없이도 챗봇이 전염병 대응 정보를 제공할 수 있도록 구성함
◦ 지도 기반의 전염병 데이터 시각화 기술 적용
 - Naver Map API를 활용해 전염병 발생 위치를 실시간으로 표시하고, 필터링 기능을 통한 정보 제공

## 🛠️ 기술 스택
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) 

| **Category** | **Stack** |
|:------------:|:----------:|
| **Back-end** | `Node.js` |
| **Front-end** | `JavaScript` |
| Uncategorized | `HTML5`, `CSS3`, `Python` |


## 💻 실행 방법
- 로컬 생성형AI를 활용하기 위해 모델을 로컬 PC에 다운 받아야함.
- https://ollama.com/ -> ollama 다운받기
- cmd창에서 ollama run gemma3 -> 모델 다운 받기
---
1. npm start로 파일을 실행
2. 새로운 터미널을 열어 cd views로 이동 후, python news.py로 실행
---
.env파일로 api key 별도 보관
