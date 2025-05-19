let supportList = [];
let filteredList = [];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cardContainer = document.getElementById("cardContainer");

  fetch("/farm.json")
    .then((res) => res.json())
    .then((data) => {
      supportList = data;
      filteredList = data;
      renderCards(filteredList);
    });

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    filteredList = supportList.filter((item) =>
      item.projectname.toLowerCase().includes(term) ||
      item.eligibility.toLowerCase().includes(term) ||
      item.supportDetails.toLowerCase().includes(term)
    );
    renderCards(filteredList);
  });

  function renderCards(list) {
    cardContainer.innerHTML = "";
  
    if (list.length === 0) {
      cardContainer.innerHTML = `<p class="no-data">검색 결과가 없습니다.</p>`;
      return;
    }
  
    list.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
  
      const showDetails = document.createElement("div");
      showDetails.style.display = "none";
  
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h2 class="card-title">${item.projectname}</h2>
          <span class="card-badge">${item.year}</span>
        </div>
        <div class="card-budget"><strong>사업비(백만원):&nbsp;</strong><span class="support-budget">${item.budget}</span></div>
        <div class="card-section"><strong>지원 자격:</strong><span class="support-eligibility">${item.eligibility || ""}</span></div>
      `;
  
      showDetails.className = "card-section";
      showDetails.innerHTML = `<strong>지원 내용:</strong><span class="support-details">${item.supportDetails || ""}</span>`;
      card.appendChild(showDetails);
  
      // 버튼 영역 래퍼 생성
      const buttonWrapper = document.createElement("div");
      buttonWrapper.style.display = "flex";
      buttonWrapper.style.gap = "8px";
      buttonWrapper.style.marginTop = "12px";
  
      // 자세히 보기 버튼
      const detailButton = document.createElement("button");
      detailButton.className = "detail-button";
      detailButton.textContent = "자세히 보기";
      detailButton.addEventListener("click", () => {
        const isVisible = showDetails.style.display === "block";
        showDetails.style.display = isVisible ? "none" : "block";
        detailButton.textContent = isVisible ? "자세히 보기" : "간략히 보기";
      });
  
      // 관련 링크 버튼
      const linkButton = document.createElement("button");
      linkButton.className = "link-button";
      linkButton.textContent = "관련 링크";
      linkButton.addEventListener("click", () => {
        if (item.url && item.url !== "검색결과없음") {
          window.open(item.url, "_blank");
        } else {
          alert("관련 링크가 없습니다.");
        }
      });
  
      // 버튼들 카드에 추가
      buttonWrapper.appendChild(detailButton);
      buttonWrapper.appendChild(linkButton);
      card.appendChild(buttonWrapper);
  
      cardContainer.appendChild(card);
    });
  }
});
