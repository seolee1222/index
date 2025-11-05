// Scroll fade-in animation
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fade => appearOnScroll.observe(fade));

// Scroll progress bar
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / height) * 100;
  document.getElementById("scroll-bar").style.width = scrolled + "%";
});

// Typing animation
const text = "Cybersecurity & Network Specialist";
let index = 0;
function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 80);
  }
}
window.onload = typeEffect;

// Category toggle (열기/닫기 버튼)
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".toggle-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const detail = btn.nextElementSibling;
      const isOpen = detail.style.display === "block";
      detail.style.display = isOpen ? "none" : "block";
      btn.textContent = isOpen ? "열기" : "닫기";
    });
  });
});

// Category image gallery modal with zoom + arrows
document.addEventListener("DOMContentLoaded", () => {
  // 모달 생성
  const modal = document.createElement("div");
  modal.classList.add("image-modal");
  modal.innerHTML = `
    <span class="arrow left">&#10094;</span>
    <img>
    <span class="arrow right">&#10095;</span>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  const leftArrow = modal.querySelector(".arrow.left");
  const rightArrow = modal.querySelector(".arrow.right");

  let currentImages = [];
  let currentIndex = 0;

  // 카테고리 내부 이미지들만 선택
  const categoryImages = document.querySelectorAll(".category-detail img");

  categoryImages.forEach((img) => {
    img.addEventListener("click", () => {
      // 클릭한 이미지와 같은 카테고리 내 이미지 목록 생성
      const parentCategory = img.closest(".category-detail");
      currentImages = Array.from(parentCategory.querySelectorAll("img"));
      currentIndex = currentImages.indexOf(img);

      // 모달 표시
      modal.style.display = "flex";
      modalImg.src = img.src;
      modalImg.style.animation = "zoomIn 0.3s ease"; // 확대 효과
    });
  });

  // 왼쪽 화살표
  leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex].src;
    modalImg.style.animation = "zoomIn 0.3s ease";
  });

  // 오른쪽 화살표
  rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex].src;
    modalImg.style.animation = "zoomIn 0.3s ease";
  });

  // ESC 또는 배경 클릭 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === modalImg) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
    if (e.key === "ArrowRight" && modal.style.display === "flex") rightArrow.click();
    if (e.key === "ArrowLeft" && modal.style.display === "flex") leftArrow.click();
  });
});
// Topology image modal (별도 확대)
document.addEventListener("DOMContentLoaded", () => {
  const topologyImg = document.querySelector("#topology img");
  if (!topologyImg) return; // 페이지에 토폴로지 이미지가 없으면 무시

  const modal = document.createElement("div");
  modal.classList.add("image-modal");
  modal.innerHTML = `<img>`;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");

  // 클릭 시 모달 열기
  topologyImg.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = topologyImg.src;
    modalImg.style.animation = "zoomIn 0.3s ease";
  });

  // 배경 클릭 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target === modalImg) {
      modal.style.display = "none";
    }
  });

  // ESC 키로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
  });
});