  let sessions = {};
  let currentSession = null;

  function createSession() {
    document.getElementById("sessionModal").style.display = "flex";
  }

  function closeSessionModal() {
    document.getElementById("sessionModal").style.display = "none";
    document.getElementById("sessionNameInput").value = "";
  }

  function confirmSessionName() {
    const name = document.getElementById("sessionNameInput").value.trim();
    if (!name || sessions[name]) return alert("유효하지 않거나 중복된 세션 이름입니다.");
    sessions[name] = [];
    currentSession = name;
    closeSessionModal();
    renderSessionList();
    renderChat();
  }

  function renderSessionList() {
    const list = document.getElementById("sessionList");
    list.innerHTML = "";
    for (let name in sessions) {
      const div = document.createElement("div");
      div.className = "session";
      div.textContent = name;
      if (name === currentSession) {
        div.style.background = "#dbeafe";
        div.style.borderColor = "#3b82f6";
      }
      div.onclick = () => {
        currentSession = name;
        renderSessionList();
        renderChat();
      };
      list.appendChild(div);
    }
  }

  function renderChat() {
    const history = document.getElementById("chatHistory");
    history.innerHTML = "";
    for (let msg of sessions[currentSession]) {
      const div = document.createElement("div");
      div.className = `message ${msg.sender}`;
      div.textContent = msg.text;
      history.appendChild(div);
    }
    history.scrollTop = history.scrollHeight;
    document.getElementById("popupResponses").style.display = "none";
    document.getElementById("modal").style.display = "none";
  }

  
  async function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    sessions[currentSession].push({ sender: "user", text });
    input.value = "";
    renderChat();

    try {
      const askPrompt = `당신은 농업 전문가 AI입니다. 사용자 질문에 명확하고 친절하게 응답하세요. 3줄 이내로 요약해서 설명해주세요.\n\n질문: ${text}\n\n답변:`;
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: 'gemma3',
          prompt: askPrompt,
          stream: false
        })
      });
      const data = await res.json();

      const askPrompt2 = `당신은 농업 전문가 AI입니다. 사용자 질문에 명확하고 친절하게 응답하세요. 3줄 이내로 요약해서 설명해주세요.\n\n질문: ${text}\n\n답변:`;
      const res2 = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: 'gemma3',
          prompt: askPrompt2,
          stream: false
        })
      });
      const data2 = await res2.json();

      if (data && data.response && data2 && data2.response) {
        document.getElementById("popupResponses").style.display = "flex";
        const boxes = document.querySelectorAll(".popup-box");
        boxes[0].textContent = data.response;
        boxes[0].onclick = () => showModal(data.response);
        boxes[1].textContent = data2.response;
        boxes[1].onclick = () => showModal(data2.response);
      }
    } catch (err) {
      alert("오류 발생: " + err.message);
    }
  }

  function sendKeyword(keyword) {
    document.getElementById("userInput").value = keyword;
    sendMessage();
  }

  function showModal(content) {
    document.getElementById("modal").style.display = "flex";
    document.querySelector("#modal .modal-content p").textContent = content;
    sessions[currentSession].push({ sender: "bot", text: content });
    renderChat();
  }

  function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("popupResponses").style.display = "none";
  }

  window.onload = () => {
    createSession();

    // 동적 입력창에도 항상 적용되도록
    document.addEventListener("keydown", function (e) {
      if (e.target.id === "userInput" && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  };
