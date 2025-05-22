from flask import Flask, request, render_template_string, jsonify
import urllib.parse
import urllib.request
import json
import requests
import re
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

id = os.getenv("client_id")
pw = os.getenv("client_secret")

app = Flask(__name__)

# 네이버 API 인증 정보
client_id = id
client_secret = pw

# HTML 템플릿 불러오기
HTML_TEMPLATE = open('news.html', encoding='utf-8').read()

# HTML 태그 및 특수문자 정리 함수
def clean_text(text):
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'&[a-z]+;', '', text)
    return text.strip()

# Ollama gemma3 모델로 요약 요청
def summarize_with_ollama(text):
    prompt = f"다음 뉴스 내용을 3줄 이내로 간결하게 요약해줘:\n\n{text}"
    payload = {
        "model": "gemma3",
        "prompt": prompt,
        "options": {
            "num_predict": 100  # 추론 길이 제한
        }
    }
    try:
        response = requests.post("http://localhost:11434/api/generate", json=payload, stream=True)
        summary = ""
        for line in response.iter_lines():
            if line:
                part = json.loads(line.decode())
                summary += part.get("response", "")
        return summary.strip()
    except Exception as e:
        return f"요약 오류: {e}"

# 메인 페이지
@app.route('/news', methods=['GET', 'POST'])
def index():
    items = []
    if request.method == 'POST':
        query = request.form.get('query', '')
        if query:
            enc_query = urllib.parse.quote(query)
            url = f"https://openapi.naver.com/v1/search/news.json?query={enc_query}&display=5&sort=sim"
            req = urllib.request.Request(url)
            req.add_header("X-Naver-Client-Id", client_id)
            req.add_header("X-Naver-Client-Secret", client_secret)

            try:
                with urllib.request.urlopen(req) as response:
                    if response.getcode() == 200:
                        result = json.loads(response.read().decode('utf-8'))
                        items = result.get('items', [])
            except Exception as e:
                print("API 호출 에러:", e)

    return render_template_string(HTML_TEMPLATE, items=items)

# 요약 API 엔드포인트
@app.route('/api/summarize', methods=['POST'])
def summarize_news():
    data = request.get_json()
    articles = data.get('articles', [])
    texts = [clean_text(article.get('description', '')) for article in articles]

    # 병렬 요약 처리
    with ThreadPoolExecutor() as executor:
        summaries = list(executor.map(summarize_with_ollama, texts))

    return jsonify(summaries)

if __name__ == '__main__':
    app.run(debug=True)
