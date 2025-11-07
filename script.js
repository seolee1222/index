document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------
     Scroll fade-in animation
  ------------------------------- */
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

  /* -------------------------------
     Scroll progress bar
  ------------------------------- */
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / height) * 100;
    const bar = document.getElementById("scroll-bar");
    if (bar) bar.style.width = scrolled + "%";
  });

  /* -------------------------------
     Typing animation
  ------------------------------- */
  const typingTarget = document.getElementById("typing");
  if (typingTarget) {
    const text = "Cybersecurity & Network Specialist";
    let index = 0;
    function typeEffect() {
      if (index < text.length) {
        typingTarget.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 80);
      }
    }
    typeEffect();
  }

  /* -------------------------------
     Category toggle (열기/닫기 버튼)
  ------------------------------- */
  const buttons = document.querySelectorAll(".toggle-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const detail = btn.nextElementSibling;
      const isOpen = detail.style.display === "block";
      detail.style.display = isOpen ? "none" : "block";
      btn.textContent = isOpen ? "열기" : "닫기";
    });
  });

  /* -------------------------------
     Category image modal with zoom + arrows
  ------------------------------- */
  const categoryImages = document.querySelectorAll(".category-detail img");
  if (categoryImages.length) {
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

    categoryImages.forEach((img) => {
      img.addEventListener("click", () => {
        const parentCategory = img.closest(".category-detail");
        currentImages = Array.from(parentCategory.querySelectorAll("img"));
        currentIndex = currentImages.indexOf(img);
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalImg.style.animation = "zoomIn 0.3s ease";
      });
    });

    leftArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!currentImages.length) return;
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      modalImg.src = currentImages[currentIndex].src;
      modalImg.style.animation = "zoomIn 0.3s ease";
    });

    rightArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!currentImages.length) return;
      currentIndex = (currentIndex + 1) % currentImages.length;
      modalImg.src = currentImages[currentIndex].src;
      modalImg.style.animation = "zoomIn 0.3s ease";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target === modalImg) modal.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") modal.style.display = "none";
      if (e.key === "ArrowRight" && modal.style.display === "flex") rightArrow.click();
      if (e.key === "ArrowLeft" && modal.style.display === "flex") leftArrow.click();
    });
  }

  /* -------------------------------
     Topology image modal (별도 확대)
  ------------------------------- */
  const topologyImg = document.querySelector("#topology img");
  if (topologyImg) {
    const modal = document.createElement("div");
    modal.classList.add("image-modal");
    modal.innerHTML = `<img>`;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector("img");

    topologyImg.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = topologyImg.src;
      modalImg.style.animation = "zoomIn 0.3s ease";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target === modalImg) modal.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") modal.style.display = "none";
    });
  }

  /* -------------------------------
     Board accordion (화살표 아래/위)
  ------------------------------- */
  const headers = document.querySelectorAll(".section-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const list = header.nextElementSibling;
      if (!list) return;

      const isOpen = list.classList.contains("open");

      // 모든 섹션 닫기
      document.querySelectorAll(".post-list").forEach(pl => pl.classList.remove("open"));
      document.querySelectorAll(".section-header").forEach(h => h.classList.remove("active"));

      // 현재 섹션만 토글
      if (!isOpen) {
        list.classList.add("open");
        header.classList.add("active");
      } else {
        list.classList.remove("open");
        header.classList.remove("active");
      }
    });
  });
});
