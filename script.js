/* ==========================================================================
   JEJAK PAMULIHAN MEMORIES - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Navbar Scroll Effect & Mobile Menu --- */
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const mobileToggle = document.getElementById('mobile-toggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });

  /* --- 2. Active Link Highlighting on Scroll --- */
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- 3. Ambient Audio Toggle --- */
  const btnAudio = document.getElementById('btn-audio');
  const bgAudio = document.getElementById('bg-audio');
  let isPlaying = false;

  if (btnAudio && bgAudio) {
    btnAudio.addEventListener('click', () => {
      if (isPlaying) {
        bgAudio.pause();
        btnAudio.innerHTML = '<i class="fa-solid fa-music"></i>';
        btnAudio.style.background = 'rgba(245, 158, 11, 0.15)';
        btnAudio.title = 'Putar Musik Ambient';
      } else {
        bgAudio.play().then(() => {
          btnAudio.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
          btnAudio.style.background = 'var(--gold-primary)';
          btnAudio.style.color = '#000';
          btnAudio.title = 'Hentikan Musik';
        }).catch(err => {
          console.warn('Audio play auto-block browser:', err);
        });
      }
      isPlaying = !isPlaying;
    });
  }

  /* --- 4. Counter Animation for Hero Stats --- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    const heroPos = heroSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (heroPos < screenPos && !animated) {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const speed = target / 30; // duration control

        const updateCount = () => {
          count += speed;
          if (count < target) {
            stat.innerText = Math.ceil(count) + '+';
            setTimeout(updateCount, 40);
          } else {
            stat.innerText = target + '+';
          }
        };
        updateCount();
      });
      animated = true;
    }
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters(); // trigger once on load

  /* --- 5. Interactive Quote Generator / Slider --- */
  const quotesList = [
    '"Di Desa Pamulihan ini, kita datang sebagai orang asing yang tak saling kenal, lalu pulang sebagai keluarga yang tak ingin berpisah."',
    '"Suatu hari nanti, kita akan rindu pada hiruk-pikuk posko, canda tawa di malam hari, dan hangatnya secangkir teh di tanah Pamulihan yang dingin."',
    '"Bukan tentang seberapa jauh kita mengabdi, tapi tentang jejak kebaikan dan kasih sayang yang kita tinggalkan di hati warga Desa Pamulihan."',
    '"Terima kasih pernah berjuang bersama di masa-masa lelah, tertawa bersama di sela penat, dan saling menguatkan saat rindu rumah melanda."',
    '"Waktu sebulan terasa begitu singkat untuk sebuah persaudaraan yang akan kita bawa seumur hidup."',
    '"Pamulihan bukan sekadar tempat KKN, tapi rumah kedua yang mengajarkan kita arti ketulusan dan pentingnya saling menjaga."',
    '"Di balik setiap lelah dan peluh proker, ada senyum tulus warga dan kehangatan teman-teman yang tak akan pernah tergantikan oleh apapun."',
    '"Halaman ini akan terus ada, menyimpan cerita kita saat muda—saat kita pernah berjuang, tertawa, dan bertumbuh bersama di Pamulihan."',
    '"Selamat melanjutkan perjalanan masing-masing. Ingatlah, di manapun kita berada kelak, kita pernah punya rumah yang sama di sini."',
    '"Hujan di Pamulihan, obrolan hangat tanpa batas waktu, dan senyuman kalian... adalah bagian terindah dari kisah kuliahku."'
  ];

  let currentQuoteIndex = 0;
  let currentEffectIndex = 0;
  let quoteAutoTimer = null;
  const quoteTextElem = document.getElementById('quote-active-text');
  const btnPrevQuote = document.getElementById('btn-prev-quote');
  const btnNextQuote = document.getElementById('btn-next-quote');
  const btnShuffleQuote = document.getElementById('btn-shuffle-quote');
  const quoteCardWrapper = document.querySelector('.quote-highlight-card');

  const animEffects = ['effect-fade-up', 'effect-blur-fade', 'effect-slide-x', 'effect-zoom-soft'];

  if (quoteTextElem) {
    quoteTextElem.classList.add('quote-anim-target');
  }

  function updateQuoteDisplay(index) {
    if (!quoteTextElem) return;

    // Cycle through animation effects smoothly
    const currentEffect = animEffects[currentEffectIndex % animEffects.length];
    currentEffectIndex++;

    // Apply exit animation class
    quoteTextElem.classList.add(currentEffect);

    setTimeout(() => {
      quoteTextElem.innerText = quotesList[index];

      // Remove exit class to trigger smooth entrance
      quoteTextElem.classList.remove(currentEffect);
    }, 420);
  }

  function startQuoteAutoPlay() {
    stopQuoteAutoPlay();
    quoteAutoTimer = setInterval(() => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotesList.length;
      updateQuoteDisplay(currentQuoteIndex);
    }, 4500); // Rotates every 4.5 seconds
  }

  function stopQuoteAutoPlay() {
    if (quoteAutoTimer) clearInterval(quoteAutoTimer);
  }

  if (btnPrevQuote) {
    btnPrevQuote.addEventListener('click', () => {
      stopQuoteAutoPlay();
      currentQuoteIndex = (currentQuoteIndex - 1 + quotesList.length) % quotesList.length;
      updateQuoteDisplay(currentQuoteIndex);
      startQuoteAutoPlay();
    });
  }

  if (btnNextQuote) {
    btnNextQuote.addEventListener('click', () => {
      stopQuoteAutoPlay();
      currentQuoteIndex = (currentQuoteIndex + 1) % quotesList.length;
      updateQuoteDisplay(currentQuoteIndex);
      startQuoteAutoPlay();
    });
  }

  if (btnShuffleQuote) {
    btnShuffleQuote.addEventListener('click', () => {
      stopQuoteAutoPlay();
      let randomIndex = Math.floor(Math.random() * quotesList.length);
      if (randomIndex === currentQuoteIndex) {
        randomIndex = (randomIndex + 1) % quotesList.length;
      }
      currentQuoteIndex = randomIndex;
      updateQuoteDisplay(currentQuoteIndex);
      startQuoteAutoPlay();
    });
  }

  if (quoteCardWrapper) {
    quoteCardWrapper.addEventListener('mouseenter', stopQuoteAutoPlay);
    quoteCardWrapper.addEventListener('mouseleave', startQuoteAutoPlay);
  }

  // Start auto rotation on load
  startQuoteAutoPlay();

  // Copy Quote Functionality
  const copyButtons = document.querySelectorAll('.btn-copy-quote');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-quote');
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--emerald-light);"></i>';
        setTimeout(() => {
          btn.innerHTML = originalIcon;
        }, 2000);
      });
    });
  });

  /* --- 6. Gallery Slider Carousel Logic (Pelan & Lembut) --- */
  const galleryTrack = document.getElementById('gallery-slider-track');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const galleryPagination = document.getElementById('gallery-pagination');
  const galleryWrapper = document.querySelector('.gallery-slider-wrapper');

  if (galleryTrack && galleryPrev && galleryNext && galleryPagination) {
    const gallerySlides = Array.from(galleryTrack.children);
    let currentGallerySlide = 0;
    let galleryAutoSlideTimer = null;

    function getGalleryCardsPerView() {
      return 1; // Always 1 slide per view (satu lembar)
    }

    function getGalleryMaxIndex() {
      return Math.max(0, gallerySlides.length - 1);
    }

    function createGalleryDots() {
      updateGallerySlider();
    }

    function updateGallerySlider() {
      if (!gallerySlides.length) return;
      const cardWidth = gallerySlides[0].offsetWidth;
      const moveAmount = currentGallerySlide * cardWidth;

      galleryTrack.style.transform = `translateX(-${moveAmount}px)`;

      galleryPagination.innerHTML = `<div class="gallery-counter-badge"><i class="fa-solid fa-images text-gold"></i> Foto <strong>${currentGallerySlide + 1}</strong> dari <strong>${gallerySlides.length}</strong></div>`;
    }

    function goToGallerySlide(index) {
      const maxIndex = getGalleryMaxIndex();
      if (index < 0) {
        currentGallerySlide = maxIndex;
      } else if (index > maxIndex) {
        currentGallerySlide = 0;
      } else {
        currentGallerySlide = index;
      }
      updateGallerySlider();
    }

    galleryNext.addEventListener('click', () => {
      goToGallerySlide(currentGallerySlide + 1);
    });

    galleryPrev.addEventListener('click', () => {
      goToGallerySlide(currentGallerySlide - 1);
    });

    // Slow and gentle auto slide every 3.8 seconds
    function startGalleryAutoSlide() {
      stopGalleryAutoSlide();
      galleryAutoSlideTimer = setInterval(() => {
        goToGallerySlide(currentGallerySlide + 1);
      }, 3800);
    }

    function stopGalleryAutoSlide() {
      if (galleryAutoSlideTimer) clearInterval(galleryAutoSlideTimer);
    }

    if (galleryWrapper) {
      galleryWrapper.addEventListener('mouseenter', stopGalleryAutoSlide);
      galleryWrapper.addEventListener('mouseleave', startGalleryAutoSlide);
    }

    // Touch Swipe Support
    let startX = 0;
    let isDragging = false;

    galleryTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopGalleryAutoSlide();
    }, { passive: true });

    galleryTrack.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          goToGallerySlide(currentGallerySlide + 1);
        } else {
          goToGallerySlide(currentGallerySlide - 1);
        }
      }
      startGalleryAutoSlide();
    });

    window.addEventListener('resize', () => {
      createGalleryDots();
      if (currentGallerySlide > getGalleryMaxIndex()) {
        currentGallerySlide = getGalleryMaxIndex();
      }
      updateGallerySlider();
    });

    createGalleryDots();
    updateGallerySlider();
    startGalleryAutoSlide();
  }

  /* --- 7. Lightbox Modal Preview --- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  // Add click event for all gallery slides and team card images
  const clickableImages = document.querySelectorAll('.gallery-slide-card img, .team-img-wrapper img');

  clickableImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });

  /* --- 8. Memory Wall (LocalStorage Kesan & Pesan) --- */
  const memoryForm = document.getElementById('memory-form');
  const wallPostsContainer = document.getElementById('wall-posts');

  // Helper to sanitize text
  function sanitizeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Load existing posts from LocalStorage
  function loadMemoryPosts() {
    const savedPosts = JSON.parse(localStorage.getItem('pamulihan_memories') || '[]');
    savedPosts.forEach(post => {
      renderPostCard(post.author, post.date, post.message, false);
    });
  }

  function renderPostCard(author, date, message, prepend = true) {
    const card = document.createElement('div');
    card.className = 'glass-card wall-card';
    card.innerHTML = `
      <div class="wall-card-header">
        <span class="wall-card-author"><i class="fa-solid fa-user-circle"></i> ${sanitizeHTML(author)}</span>
        <span class="wall-card-date">${sanitizeHTML(date)}</span>
      </div>
      <p class="wall-card-body">
        "${sanitizeHTML(message)}"
      </p>
    `;

    if (prepend) {
      wallPostsContainer.insertBefore(card, wallPostsContainer.firstChild);
    } else {
      wallPostsContainer.appendChild(card);
    }
  }

  if (memoryForm) {
    memoryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const authorInput = document.getElementById('author-name');
      const messageInput = document.getElementById('message-body');

      const author = authorInput.value.trim();
      const message = messageInput.value.trim();

      if (!author || !message) return;

      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const dateStr = new Date().toLocaleDateString('id-ID', dateOptions);

      // Render to DOM
      renderPostCard(author, dateStr, message, true);

      // Save to LocalStorage
      const savedPosts = JSON.parse(localStorage.getItem('pamulihan_memories') || '[]');
      savedPosts.unshift({ author, date: dateStr, message });
      localStorage.setItem('pamulihan_memories', JSON.stringify(savedPosts));

      // Reset Form
      authorInput.value = '';
      messageInput.value = '';
    });
  }

  loadMemoryPosts();

  /* --- 9. Back to Top Button --- */
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --- 10. Team Slider Carousel Logic --- */
  const teamTrack = document.getElementById('team-slider-track');
  const teamPrev = document.getElementById('team-prev');
  const teamNext = document.getElementById('team-next');
  const teamPagination = document.getElementById('team-pagination');
  const teamWrapper = document.querySelector('.team-slider-wrapper');

  if (teamTrack && teamPrev && teamNext && teamPagination) {
    const teamCards = Array.from(teamTrack.children);
    let currentSlide = 0;
    let autoSlideInterval = null;

    function getCardsPerView() {
      const width = window.innerWidth;
      if (width <= 540) return 1;
      if (width <= 820) return 2;
      if (width <= 1200) return 3;
      return 4;
    }

    function getMaxSlideIndex() {
      const cardsPerView = getCardsPerView();
      return Math.max(0, teamCards.length - cardsPerView);
    }

    function createPaginationDots() {
      teamPagination.innerHTML = '';
      const maxIndex = getMaxSlideIndex();
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.className = `pagination-dot ${i === currentSlide ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        teamPagination.appendChild(dot);
      }
    }

    function updateSlider() {
      if (!teamCards.length) return;
      const cardWidth = teamCards[0].offsetWidth;
      const gap = 28; // 1.75rem gap
      const moveAmount = currentSlide * (cardWidth + gap);

      teamTrack.style.transform = `translateX(-${moveAmount}px)`;

      // Update Dots
      const dots = teamPagination.querySelectorAll('.pagination-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    function goToSlide(index) {
      const maxIndex = getMaxSlideIndex();
      if (index < 0) {
        currentSlide = maxIndex;
      } else if (index > maxIndex) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
      updateSlider();
    }

    teamNext.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
    });

    teamPrev.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
    });

    // Continuous Auto Slide every 2.5 seconds
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 2500);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    if (teamWrapper) {
      teamWrapper.addEventListener('mouseenter', stopAutoSlide);
      teamWrapper.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch Swipe Support for Mobile
    let startX = 0;
    let isDragging = false;

    teamTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoSlide();
    }, { passive: true });

    teamTrack.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
      startAutoSlide();
    });

    window.addEventListener('resize', () => {
      createPaginationDots();
      if (currentSlide > getMaxSlideIndex()) {
        currentSlide = getMaxSlideIndex();
      }
      updateSlider();
    });

    createPaginationDots();
    updateSlider();
    startAutoSlide();
  }

  /* --- 11. Typewriter Animation for Hero Title & Subtitle (Continuous Loop) --- */
  const titleElem = document.getElementById('typewriter-title');
  const subElem = document.getElementById('typewriter-sub');

  if (titleElem && subElem) {
    const textPart1 = "Jejak Pamulihan";
    const textPart2 = "Memories";
    const subText = "KKN 05 UNUGHA DESA PAMULIHAN";

    const typeSpeed = 80;    // typing speed per char (ms)
    const eraseSpeed = 35;   // erasing speed per char (ms)
    const holdDelay = 3500;  // hold text before erasing (ms)

    let i = 0;
    let j = 0;
    let k = 0;

    function resetIndexes() {
      i = 0;
      j = 0;
      k = 0;
    }

    function typePart1() {
      if (i < textPart1.length) {
        titleElem.innerHTML = textPart1.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
        i++;
        setTimeout(typePart1, typeSpeed);
      } else {
        titleElem.innerHTML = textPart1 + '<br><span class="text-gold-bright"><span class="typing-cursor">|</span></span>';
        setTimeout(typePart2, 200);
      }
    }

    function typePart2() {
      if (j < textPart2.length) {
        const goldText = textPart2.substring(0, j + 1);
        titleElem.innerHTML = textPart1 + `<br><span class="text-gold-bright">${goldText}<span class="typing-cursor">|</span></span>`;
        j++;
        setTimeout(typePart2, typeSpeed + 20);
      } else {
        titleElem.innerHTML = textPart1 + `<br><span class="text-gold-bright">${textPart2}</span>`;
        subElem.style.opacity = '1';
        setTimeout(typeSubText, 200);
      }
    }

    function typeSubText() {
      if (k < subText.length) {
        subElem.innerHTML = subText.substring(0, k + 1) + '<span class="typing-cursor">|</span>';
        k++;
        setTimeout(typeSubText, 50);
      } else {
        subElem.innerHTML = subText;
        // Hold full text, then start erasing for continuous loop
        setTimeout(eraseSubText, holdDelay);
      }
    }

    function eraseSubText() {
      if (k > 0) {
        k--;
        subElem.innerHTML = subText.substring(0, k) + '<span class="typing-cursor">|</span>';
        setTimeout(eraseSubText, eraseSpeed);
      } else {
        subElem.innerHTML = '';
        setTimeout(erasePart2, 150);
      }
    }

    function erasePart2() {
      if (j > 0) {
        j--;
        const goldText = textPart2.substring(0, j);
        titleElem.innerHTML = textPart1 + `<br><span class="text-gold-bright">${goldText}<span class="typing-cursor">|</span></span>`;
        setTimeout(erasePart2, eraseSpeed);
      } else {
        titleElem.innerHTML = textPart1 + '<span class="typing-cursor">|</span>';
        setTimeout(erasePart1, 150);
      }
    }

    function erasePart1() {
      if (i > 0) {
        i--;
        titleElem.innerHTML = textPart1.substring(0, i) + '<span class="typing-cursor">|</span>';
        setTimeout(erasePart1, eraseSpeed);
      } else {
        titleElem.innerHTML = '<span class="typing-cursor">|</span>';
        resetIndexes();
        setTimeout(typePart1, 600); // Restart typing cycle
      }
    }

    // Start typewriter effect after logo settles
    setTimeout(typePart1, 450);
  }

  /* --- 12. Fullscreen Dynamic Blurred Background Slideshow (Landscape Photos Only) --- */
  const landscapePhotos = [
    "images/Selama KKN/IMG-20260709-WA0032.jpg",
    "images/Selama KKN/IMG-20260714-WA0007.jpg",
    "images/Selama KKN/IMG-20260714-WA0041.jpg",
    "images/Selama KKN/IMG-20260715-WA0090.jpg",
    "images/Selama KKN/IMG-20260719-WA0062.jpg",
    "images/Selama KKN/IMG-20260722-WA0022.jpg",
    "images/Selama KKN/IMG-20260726-WA0052.jpg",
    "images/Selama KKN/IMG-20260726-WA0054.jpg",
    "images/Selama KKN/IMG-20260805-WA0047.jpg",
    "images/Selama KKN/IMG-20260807-WA0154.jpg",
    "images/Selama KKN/IMG-20260822-WA0028.jpg",
    "images/Selama KKN/IMG-20260822-WA0030.jpg",
    "images/Selama KKN/IMG-20260822-WA0036(1).jpg",
    "images/Selama KKN/IMG-20260822-WA0040.jpg",
    "images/Selama KKN/IMG-20260822-WA0043.jpg",
    "images/Selama KKN/IMG-20260822-WA0044.jpg",
    "images/Selama KKN/IMG-20260822-WA0045.jpg",
    "images/Selama KKN/IMG-20260822-WA0066.jpg",
    "images/Selama KKN/IMG-20260823-WA0040.jpg",
    "images/Selama KKN/IMG-20260824-WA0016(1).jpg",
    "images/Selama KKN/IMG-20260824-WA0017.jpg",
    "images/Selama KKN/IMG-20260824-WA0020(1).jpg",
    "images/Selama KKN/IMG-20260824-WA0025.jpg",
    "images/Selama KKN/IMG-20260824-WA0054.jpg",
    "images/Selama KKN/IMG-20260824-WA0060.jpg",
    "images/Selama KKN/IMG-20260824-WA0068.jpg",
    "images/Selama KKN/IMG-20260824-WA0076.jpg",
    "images/Selama KKN/IMG-20260824-WA0082.jpg",
    "images/Selama KKN/IMG-20260828-WA0141.jpg",
    "images/Selama KKN/IMG-20260901-WA0033.jpg",
    "images/Selama KKN/IMG-20260901-WA0034.jpg",
    "images/Selama KKN/IMG-20260901-WA0035.jpg",
    "images/Selama KKN/IMG-20260902-WA0000.jpg",
    "images/Selama KKN/IMG-20260902-WA0004(1).jpg",
    "images/Selama KKN/motion_photo_1692731666805752768.jpg",
    "images/Selama KKN/motion_photo_2770973910391987883.jpg"
  ];

  const bgContainer = document.getElementById('bg-slideshow');
  if (bgContainer && landscapePhotos.length) {
    const layerA = bgContainer.querySelector('.layer-a');
    const layerB = bgContainer.querySelector('.layer-b');

    let currentBgIndex = 0;
    let activeLayer = layerA;
    let nextLayer = layerB;

    if (activeLayer) {
      activeLayer.style.backgroundImage = `url("${landscapePhotos[0]}")`;
      activeLayer.classList.add('active');
    }

    function rotateBgPhoto() {
      currentBgIndex = (currentBgIndex + 1) % landscapePhotos.length;
      const nextPhotoUrl = landscapePhotos[currentBgIndex];

      if (!activeLayer || !nextLayer) return;

      nextLayer.style.backgroundImage = `url("${nextPhotoUrl}")`;

      // Soft crossfade effect
      nextLayer.classList.add('active');
      activeLayer.classList.remove('active');

      // Swap layer references
      const temp = activeLayer;
      activeLayer = nextLayer;
      nextLayer = temp;
    }

    // Auto rotate background every 7 seconds
    setInterval(rotateBgPhoto, 7000);
  }

  /* --- 10. Video Aftermovie Handler --- */
  const btnPlayVideo = document.getElementById('btn-play-video');
  if (btnPlayVideo) {
    btnPlayVideo.addEventListener('click', () => {
      // Pause background music when opening YouTube video link
      const bgAudio = document.getElementById('bg-audio');
      const btnAudio = document.getElementById('btn-audio');
      if (bgAudio && !bgAudio.paused) {
        bgAudio.pause();
        if (btnAudio) btnAudio.classList.remove('playing');
      }
    });
  }

  /* --- 11. Interactive 3D Tilt Parallax & 3D Flip Card System --- */
  const teamCards = document.querySelectorAll('.team-card');

  const divisionDetails = {
    'kordes': {
      icon: 'fa-user-tie',
      desc: 'Mengoordinasikan seluruh program kerja pengabdian, memimpin rapat evaluasi harian posko, dan merangkai silaturahmi dengan warga Desa Pamulihan.',
      badge: 'Pemimpin & Koordinator'
    },
    'sekre': {
      icon: 'fa-file-signature',
      desc: 'Menyusun proposal kegiatan, mencatat setiap notulensi rapat posko, serta mengarsipkan dokumen & laporan akhir KKN.',
      badge: 'Arsip & Administrasi'
    },
    'bendahara': {
      icon: 'fa-coins',
      desc: 'Mengelola alokasi anggaran proker, pencatatan transaksi belanja harian posko, dan pertanggungjawaban keuangan.',
      badge: 'Manajemen Keuangan'
    },
    'acara': {
      icon: 'fa-calendar-check',
      desc: 'Merancang konsep event & proker desa, malam keakraban posko, serta memandu jalannya setiap acara KKN.',
      badge: 'Kreator Event'
    },
    'humas': {
      icon: 'fa-comments',
      desc: 'Menjalin hubungan silaturahmi hangat dengan perangkat desa, tokoh masyarakat, serta mengantarkan undangan proker.',
      badge: 'Jembatan Silaturahmi'
    },
    'konsumsi': {
      icon: 'fa-utensils',
      desc: 'Menyiapkan masakan bergizi harian posko, belanja bahan dapur pagi hari, dan menjaga stamina seluruh anggota.',
      badge: 'Penyelamat Posko'
    },
    'pdd': {
      icon: 'fa-camera-retro',
      desc: 'Mengabadikan foto/video dokumentasi, mendesain baliho & media visual proker, serta merangkai kenangan KKN.',
      badge: 'Visual & Dokumentasi'
    },
    'perkap': {
      icon: 'fa-truck-ramp-box',
      desc: 'Menyiapkan perlengkapan teknis, sound system & panggung acara, kendaraan posko, serta logistik kegiatan.',
      badge: 'Logistik & Teknis'
    }
  };

  function getDivisionKey(roleText) {
    const text = roleText.toLowerCase();
    if (text.includes('kordes') || text.includes('koordinator desa')) return 'kordes';
    if (text.includes('sekretaris')) return 'sekre';
    if (text.includes('bendahara')) return 'bendahara';
    if (text.includes('acara')) return 'acara';
    if (text.includes('humas')) return 'humas';
    if (text.includes('konsumsi')) return 'konsumsi';
    if (text.includes('pdd') || text.includes('dekorasi')) return 'pdd';
    if (text.includes('perkap') || text.includes('perlengkapan') || text.includes('logistik')) return 'perkap';
    return 'kordes';
  }

  teamCards.forEach(card => {
    // Structural enhancement for 3D flip if inner not wrapped yet
    if (!card.querySelector('.team-card-inner')) {
      const originalContent = card.innerHTML;
      const roleElem = card.querySelector('.team-role');
      const nameElem = card.querySelector('.team-name');
      const roleText = roleElem ? roleElem.innerText : '';
      const nameText = nameElem ? nameElem.innerText : '';

      const divKey = getDivisionKey(roleText);
      const detail = divisionDetails[divKey] || divisionDetails['kordes'];

      card.innerHTML = `
        <div class="team-card-inner">
          <div class="team-card-front">
            ${originalContent}
          </div>
          <div class="team-card-back">
            <div class="back-icon-wrap">
              <i class="fa-solid ${detail.icon} text-gold"></i>
            </div>
            <span class="team-role">${roleText}</span>
            <h3 class="team-name" style="margin-top:0.25rem;">${nameText}</h3>
            <p class="back-desc">"${detail.desc}"</p>
            <span class="back-badge"><i class="fa-solid fa-star text-gold"></i> ${detail.badge}</span>
            <button class="btn-flip-back" type="button">
              <i class="fa-solid fa-rotate-left"></i> Kembali ke Foto
            </button>
          </div>
        </div>
        <div class="team-card-shine"></div>
      `;
    }

    // 3D Tilt Parallax Mousemove Event
    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('is-flipped')) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

      const shine = card.querySelector('.team-card-shine');
      if (shine) {
        const moveX = (x / rect.width) * 100;
        const moveY = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${moveX}% ${moveY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 75%)`;
      }
    });

    // Reset 3D Tilt on Mouseleave
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('is-flipped')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
      const shine = card.querySelector('.team-card-shine');
      if (shine) shine.style.background = 'none';
    });

    // 3D Card Flip Action on Click
    card.addEventListener('click', (e) => {
      card.classList.toggle('is-flipped');
      if (!card.classList.contains('is-flipped')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    });
  });

  /* --- 12. Golden Firefly Ambient Canvas Particles --- */
  const pCanvas = document.getElementById('bg-particles');
  if (pCanvas) {
    const ctx = pCanvas.getContext('2d');
    let width = pCanvas.width = window.innerWidth;
    let height = pCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = pCanvas.width = window.innerWidth;
      height = pCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;
    const colors = ['rgba(212, 175, 55, ', 'rgba(255, 215, 0, ', 'rgba(255, 236, 179, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        speedY: Math.random() * 0.5 + 0.15,
        speedX: Math.random() * 0.3 - 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let timeStep = 0;
    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      timeStep += 0.015;

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += Math.sin(timeStep + p.pulseOffset) * 0.4 + p.speedX;

        // Reset particle if it drifts off screen
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const dynamicAlpha = p.alpha * (0.5 + 0.5 * Math.sin(timeStep * 2 + p.pulseOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.colorPrefix + dynamicAlpha + ')';
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* --- 13. Interactive Glowing Stardust Cursor Trail --- */
  if (matchMedia('(pointer: fine)').matches) {
    let lastX = 0, lastY = 0;
    window.addEventListener('mousemove', (e) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < 12) return;
      lastX = e.clientX;
      lastY = e.clientY;

      const star = document.createElement('div');
      star.className = 'cursor-star-particle';
      star.style.left = e.clientX + 'px';
      star.style.top = e.clientY + 'px';
      const size = Math.random() * 5 + 3;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      document.body.appendChild(star);

      setTimeout(() => {
        star.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${Math.random() * 20 + 10}px) scale(0)`;
        star.style.opacity = '0';
      }, 20);

      setTimeout(() => {
        star.remove();
      }, 600);
    });
  }

  /* --- 14. Fullscreen Cinema Mode Presentation Handler --- */
  const btnCinemaMode = document.getElementById('btn-cinema-mode');
  const cinemaModal = document.getElementById('cinema-modal');
  const cinemaImg = document.getElementById('cinema-img');
  const cinemaCounter = document.getElementById('cinema-counter');
  const cinemaClose = document.getElementById('cinema-close');
  const cinemaPrev = document.getElementById('cinema-prev');
  const cinemaNext = document.getElementById('cinema-next');
  const cinemaPlayPause = document.getElementById('cinema-play-pause');
  const cinemaProgressFill = document.getElementById('cinema-progress-fill');

  if (btnCinemaMode && cinemaModal && cinemaImg) {
    let cinemaIndex = 0;
    let cinemaTimer = null;
    let isPlaying = true;

    // Collect all 75 gallery photo URLs
    const galleryImgs = Array.from(document.querySelectorAll('.gallery-slide-card img')).map(img => img.src);

    function updateCinemaView(index) {
      if (galleryImgs.length === 0) return;
      cinemaIndex = (index + galleryImgs.length) % galleryImgs.length;
      cinemaImg.style.opacity = '0';
      cinemaImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        cinemaImg.src = galleryImgs[cinemaIndex];
        cinemaImg.style.opacity = '1';
        cinemaImg.style.transform = 'scale(1)';
        if (cinemaCounter) {
          cinemaCounter.innerText = `Foto ${cinemaIndex + 1} dari ${galleryImgs.length}`;
        }
        resetCinemaProgress();
      }, 200);
    }

    function resetCinemaProgress() {
      if (cinemaProgressFill) {
        cinemaProgressFill.style.transition = 'none';
        cinemaProgressFill.style.width = '0%';
        setTimeout(() => {
          if (isPlaying) {
            cinemaProgressFill.style.transition = 'width 3.5s linear';
            cinemaProgressFill.style.width = '100%';
          }
        }, 30);
      }
    }

    function startCinemaAutoPlay() {
      stopCinemaAutoPlay();
      isPlaying = true;
      if (cinemaPlayPause) {
        cinemaPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
      }
      resetCinemaProgress();
      cinemaTimer = setInterval(() => {
        updateCinemaView(cinemaIndex + 1);
      }, 3500);
    }

    function stopCinemaAutoPlay() {
      isPlaying = false;
      if (cinemaTimer) clearInterval(cinemaTimer);
      if (cinemaPlayPause) {
        cinemaPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
      if (cinemaProgressFill) {
        cinemaProgressFill.style.transition = 'none';
        cinemaProgressFill.style.width = '0%';
      }
    }

    btnCinemaMode.addEventListener('click', () => {
      cinemaIndex = typeof currentGalleryIndex !== 'undefined' ? currentGalleryIndex : 0;
      cinemaModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateCinemaView(cinemaIndex);
      startCinemaAutoPlay();
    });

    function closeCinemaModal() {
      cinemaModal.classList.remove('active');
      document.body.style.overflow = '';
      stopCinemaAutoPlay();
    }

    if (cinemaClose) cinemaClose.addEventListener('click', closeCinemaModal);
    if (cinemaPrev) cinemaPrev.addEventListener('click', () => { updateCinemaView(cinemaIndex - 1); });
    if (cinemaNext) cinemaNext.addEventListener('click', () => { updateCinemaView(cinemaIndex + 1); });

    if (cinemaPlayPause) {
      cinemaPlayPause.addEventListener('click', () => {
        if (isPlaying) {
          stopCinemaAutoPlay();
        } else {
          startCinemaAutoPlay();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!cinemaModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeCinemaModal();
      if (e.key === 'ArrowRight') updateCinemaView(cinemaIndex + 1);
      if (e.key === 'ArrowLeft') updateCinemaView(cinemaIndex - 1);
      if (e.key === ' ') {
        e.preventDefault();
        isPlaying ? stopCinemaAutoPlay() : startCinemaAutoPlay();
      }
    });
  }

});
